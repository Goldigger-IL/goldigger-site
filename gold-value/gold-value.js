/* מחשבון "כמה שווה הזהב שלי".
   החישוב כולו בדפדפן. נשלחות לשרת רק שתי בקשות: מחיר הזהב האחרון (טבלה ציבורית לקריאה),
   וממוצע המחירים בגולדיגר לפי דרגה וסוג תכשיט (site_price_estimate: אחוז ממוצע מעל שווי הזהב, רק מ-10 פריטים ומעלה).
   מה שהמשתמש מקליד (משקל, מחיר) לא נשלח לשום מקום ולא נשמר. */
(function () {
  'use strict';

  var API = 'https://fmfrhmfulnianzjhdkey.supabase.co/rest/v1/gold_ticks?select=at,gram24_ils&order=at.desc&limit=1';
  var KEY = 'sb_publishable_Gn6Euzy5rG6opj1CQOuwrw_Z3P_3VFp'; // המפתח הציבורי, כמו באפליקציה. מה שמגן על הנתונים הוא RLS בשרת.
  // גיבוי כשאין חיבור לשרת. אותם מספרים כתובים בטבלה ב-HTML. לעדכן את שניהם מדי פעם.
  var FALLBACK = { gram24: 418.19, at: '2026-11-08T07:00:05Z' };
  var FINE = { '375': 0.375, '585': 0.585, '750': 0.75, '875': 0.875, '916': 0.916, '999': 0.999 };
  var MAX_GRAMS = 2000;
  var MKT_API = 'https://fmfrhmfulnianzjhdkey.supabase.co/rest/v1/rpc/site_price_estimate';
  var KARAT = { '375': 9, '585': 14, '750': 18, '875': 21, '916': 22, '999': 24 };
  var APP = 'https://app.goldigger.co.il/';

  var $ = function (id) { return document.getElementById(id); };
  var form = $('calc'), w = $('w'), wErr = $('w-err'), out = $('out'), big = $('big'), how = $('how'), src = $('src');
  var p = $('p'), pErr = $('p-err'), pLabel = $('p-label'), cmp = $('cmp'), cmpH = $('cmp-h'), cmpB = $('cmp-b');
  var guide = $('guide'), cta = $('cta'), ctaFine = $('cta-fine'), tBody = $('t-body'), tCap = $('t-cap');
  var cat = $('cat'), mkt = $('mkt'), mktLbl = $('mkt-lbl'), mktBig = $('mkt-big'), mktHow = $('mkt-how'), cmpM = $('cmp-m');
  var market = {}; // לפי "דרגה|סוג": undefined = טוען, null = שגיאה, אחרת התשובה מהשרת
  if (!form) return;

  var whole = new Intl.NumberFormat('he-IL', { maximumFractionDigits: 0 });
  var dec = new Intl.NumberFormat('he-IL', { maximumFractionDigits: 2 });
  var pct1 = new Intl.NumberFormat('he-IL', { maximumFractionDigits: 1 });
  var day = new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'Asia/Jerusalem' });
  var hour = new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem' });

  var price = { gram24: FALLBACK.gram24, at: FALLBACK.at, live: false };

  function money(n) { return whole.format(Math.round(n)) + ' ₪'; }
  function percent(r) { return whole.format(Math.round(r * 100)) + '%'; }
  function whenText(iso) { var d = new Date(iso); return day.format(d) + ', ' + hour.format(d); }

  // טקסט מעורב: מחרוזת = טקסט רגיל, {n: '...'} = מספר שנשאר משמאל לימין בתוך משפט בעברית
  function fill(el, parts) {
    el.textContent = '';
    parts.forEach(function (x) {
      if (typeof x === 'string') { el.appendChild(document.createTextNode(x)); return; }
      var s = document.createElement('span'); s.className = 'num'; s.textContent = x.n; el.appendChild(s);
    });
  }

  function parseGrams(raw) {
    var s = raw.replace(/\s/g, '').replace(',', '.');
    if (s === '') return {};
    if (!/^\d{0,4}(\.\d{0,3})?$/.test(s) || s === '.') return { error: 'כתבו רק מספר, למשל 7.5' };
    var v = parseFloat(s);
    if (!(v > 0)) return { error: 'המשקל צריך להיות גדול מאפס' };
    if (v > MAX_GRAMS) return { error: 'זה יותר מ-2 קילו. בדקו שכתבתם בגרמים' };
    return { value: v };
  }
  function parseShekels(raw) {
    var s = raw.replace(/[\s,₪]/g, '');
    if (s === '') return {};
    if (!/^\d{1,7}(\.\d{1,2})?$/.test(s)) return { error: 'כתבו סכום בשקלים, למשל 2500' };
    var v = parseFloat(s);
    if (!(v > 0)) return { error: 'הסכום צריך להיות גדול מאפס' };
    return { value: v };
  }
  function setErr(input, el, msg) {
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    el.textContent = msg || '';
    el.hidden = !msg;
  }
  function picked(name, fallback) {
    var r = form.querySelector('input[name="' + name + '"]:checked');
    return r ? r.value : fallback;
  }

  function mktKey() { return picked('fine', '585') + '|' + (cat ? cat.value : ''); }

  // מחיר ממוצע לגרם בגולדיגר, לפי מחיר הזהב של היום: {perGram, n, sold} או null כשאין מספיק נתונים
  function marketPerGram(fine) {
    var m = market[mktKey()];
    if (!m) return null;
    var x = m.sold || m.asking;
    if (!x || typeof x.premium !== 'number') return null;
    return { perGram: price.gram24 * fine * (1 + x.premium), n: x.n, sold: !!m.sold, min: m.min || 10 };
  }

  function showMarket(fine, grams) {
    if (!mkt) return;
    var key = mktKey(), m = market[key], est = marketPerGram(fine);
    if (m === undefined) { mkt.dataset.state = 'empty'; mktBig.textContent = '—'; mktHow.textContent = 'טוענים את המחירים בגולדיגר…'; return; }
    if (m === null) { mkt.dataset.state = 'error'; mktBig.textContent = '—'; mktHow.textContent = 'לא הצלחנו לטעון את המחירים בגולדיגר כרגע. שווי הזהב למעלה מעודכן.'; return; }
    if (!est) {
      mkt.dataset.state = 'none';
      mktLbl.textContent = 'כמה מקבלים על זה בגולדיגר';
      mktBig.textContent = '—';
      fill(mktHow, ['אין עדיין מספיק נתונים בגולדיגר על תכשיטים כאלה. אנחנו מציגים ממוצע רק כשיש לפחות ', { n: String(m.min || 10) }, ' פריטים, כדי שמוכר אחד לא ישפיע עליו.']);
      return;
    }
    mkt.dataset.state = 'ok';
    mktLbl.textContent = est.sold ? 'כמה מקבלים על זה בגולדיגר' : 'כמה מבקשים על זה בגולדיגר';
    mktBig.textContent = grams ? money(est.perGram * grams) : money(est.perGram) + ' לגרם';
    if (est.sold) fill(mktHow, ['תכשיטים דומים נמכרו בגולדיגר בממוצע ב-', { n: money(est.perGram) }, ' לגרם, לפי ', { n: String(est.n) }, ' עסקאות מחצי השנה האחרונה. זו הערכה, לא הצעת מחיר.']);
    else fill(mktHow, ['מוכרים בגולדיגר מבקשים על תכשיטים דומים בממוצע ', { n: money(est.perGram) }, ' לגרם, לפי ', { n: String(est.n) }, ' פריטים. זה מחיר מבוקש, לא מחיר שבו נמכרו.']);
  }

  function loadMarket() {
    var key = mktKey();
    if (key in market) { update(); return; }
    market[key] = undefined;
    if (typeof fetch !== 'function') { market[key] = null; update(); return; }
    var body = { p_karat: KARAT[picked('fine', '585')] };
    if (cat && cat.value) body.p_category = cat.value;
    fetch(MKT_API, { method: 'POST', headers: { apikey: KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (res) { if (!res.ok) throw new Error('http ' + res.status); return res.json(); })
      .then(function (d) { market[key] = d && typeof d === 'object' ? d : { sold: null, asking: null }; })
      .catch(function () { market[key] = null; })
      .then(update);
  }

  function update() {
    var fine = FINE[picked('fine', '585')], g = parseGrams(w.value), value = null;
    setErr(w, wErr, g.error);
    if (g.value) {
      value = g.value * fine * price.gram24;
      out.dataset.state = 'ok';
      big.textContent = money(value);
      fill(how, [{ n: dec.format(g.value) }, ' גרם, כפול ', { n: pct1.format(fine * 100) + '%' }, ' זהב, כפול ', { n: money(price.gram24) }, ' לגרם זהב טהור.']);
    } else {
      out.dataset.state = 'empty';
      big.textContent = '—';
      how.textContent = 'הכניסו משקל כדי לראות את השווי.';
    }
    showMarket(fine, g.value || 0);
    compare(value, g.value ? marketPerGram(fine) : null, g.value || 0);
  }

  function compare(value, est, grams) {
    var sell = picked('mode', 'sell') === 'sell', got = parseShekels(p.value);
    pLabel.textContent = sell ? 'כמה הציעו לכם? (בשקלים)' : 'כמה מבקשים מכם? (בשקלים)';
    guide.textContent = sell
      ? 'חנות שקונה זהב ישן מוכרת אותו לרוב להתכה ומרוויחה מההפרש, ולכן תציע פחות משווי הזהב. כמה פחות משתנה מחנות לחנות, אז כדאי לקבל 2-3 הצעות ולהשוות למספר כאן.'
      : 'בתכשיט חדש משלמים גם על עבודה, עיצוב, מע״מ ורווח של המוכר, ולכן המחיר תמיד מעל שווי הזהב. השאלה היא בכמה, וזה בדיוק מה ששוקי בודק בגולדיגר.';
    cta.textContent = sell ? 'לפרסם את התכשיט בגולדיגר' : 'לחפש תכשיטים עם שוקי';
    ctaFine.textContent = sell ? 'פריט אחד בחינם. קונים פונים אליכם בצ׳אט.' : 'לקונים גולדיגר חינם, תמיד.';
    cta.href = APP;
    setErr(p, pErr, got.error);
    cmpM.hidden = true;
    cmpM.textContent = '';

    if (value === null || !got.value) {
      cmp.dataset.tone = 'idle';
      cmpH.textContent = value === null ? 'קודם מכניסים משקל.' : sell ? 'הכניסו את ההצעה, ונראה כמה היא משווי הזהב.' : 'הכניסו את המחיר, ונראה בכמה הוא מעל שווי הזהב.';
      cmpB.textContent = '';
      return;
    }
    var r = got.value / value, diff = money(Math.abs(got.value - value));
    if (sell && r <= 1) {
      cmp.dataset.tone = 'info';
      fill(cmpH, ['ההצעה היא ', { n: percent(r) }, ' משווי הזהב.']);
      fill(cmpB, ['כלומר ', { n: diff }, ' פחות משווי הזהב בתכשיט.']);
    } else if (sell) {
      cmp.dataset.tone = 'good';
      fill(cmpH, ['ההצעה גבוהה משווי הזהב: ', { n: percent(r) }, '.']);
      cmpB.textContent = 'כנראה שמשלמים לכם גם על העיצוב או העבודה, ולא רק על הזהב.';
    } else if (r >= 1) {
      cmp.dataset.tone = 'info';
      fill(cmpH, ['המחיר גבוה ב-', { n: percent(r - 1) }, ' משווי הזהב.']);
      fill(cmpB, ['כלומר ', { n: diff }, ' מעל שווי הזהב בתכשיט.']);
    } else {
      cmp.dataset.tone = 'warn';
      fill(cmpH, ['המחיר נמוך משווי הזהב: ', { n: percent(r) }, '.']);
      cmpB.textContent = 'מחיר מתחת לשווי הזהב הוא סיבה לבדוק לפני שמשלמים: חותמת, משקל מולכם, ומי המוכר.';
    }
    // מול הממוצע בגולדיגר: 300 ₪ לגרם יכול להיות "יקר" מול שווי הזהב, ועדיין מחיר רגיל או טוב באתר
    if (est && grams) {
      var avg = est.perGram * grams, r2 = got.value / avg, word = est.sold ? 'הממוצע שבו נמכרים תכשיטים דומים בגולדיגר' : 'הממוצע שמבקשים בגולדיגר על תכשיטים דומים';
      cmpM.hidden = false;
      if (Math.abs(r2 - 1) < 0.05) fill(cmpM, ['זה בערך ', word, ' (', { n: money(avg) }, ').']);
      else if (r2 > 1) fill(cmpM, ['זה ', { n: percent(r2 - 1) }, ' מעל ', word, ' (', { n: money(avg) }, ').']);
      else fill(cmpM, ['זה ', { n: percent(1 - r2) }, ' מתחת ל', word, ' (', { n: money(avg) }, ').']);
    }
  }

  function showPrice() {
    if (price.live) fill(src, ['מחיר הזהב: ', { n: money(price.gram24) }, ' לגרם זהב טהור, עודכן ', { n: whenText(price.at) }, '. מחירי זהב: MetalCharts.']);
    else fill(src, ['לא הצלחנו לטעון את המחיר העדכני. החישוב לפי ', { n: money(price.gram24) }, ' לגרם, המחיר מ-', { n: day.format(new Date(price.at)) }, '.']);
    Array.prototype.forEach.call(tBody.rows, function (row) {
      var f = FINE[row.getAttribute('data-fine')];
      if (f) row.cells[row.cells.length - 1].textContent = money(price.gram24 * f);
    });
    tCap.textContent = 'שווי הזהב בגרם אחד של תכשיט, לפי מחיר הזהב מ-' + whenText(price.at) + '. בלי עבודה, עיצוב ומע״מ.';
  }

  function loadPrice() {
    var ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : 0;
    var done = function () { clearTimeout(timer); showPrice(); update(); };
    if (typeof fetch !== 'function') { done(); return; }
    fetch(API, { headers: { apikey: KEY }, signal: ctl ? ctl.signal : undefined })
      .then(function (res) { if (!res.ok) throw new Error('http ' + res.status); return res.json(); })
      .then(function (rows) {
        var row = rows && rows[0], g = row ? Number(row.gram24_ils) : NaN;
        if (!(g > 50 && g < 5000) || !row.at || isNaN(Date.parse(row.at))) throw new Error('bad row');
        price = { gram24: g, at: row.at, live: true };
      })
      .catch(function () { price.live = false; })
      .then(done);
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); });
  form.addEventListener('input', update);
  form.addEventListener('change', function (e) {
    if (e.target && (e.target.name === 'fine' || e.target === cat)) loadMarket(); else update();
  });
  update();
  loadPrice();
  loadMarket();
})();
