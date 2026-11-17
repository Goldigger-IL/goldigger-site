// Cloudflare Pages Function: מכניסה את מחיר הזהב העדכני לתוך ה-HTML של /gold-value/ לפני שהוא יוצא.
// למה: גוגל, תצוגות מקדימות ומי שבלי JavaScript רואים את הטבלה כמו שהיא כתובה בקובץ. בלי זה הם רואים מחיר ותאריך ישנים.
// הדף עצמו נשאר קובץ סטטי. אם משהו כאן נכשל (השרת לא עונה, נתון חשוד), הדף יוצא בדיוק כמו בקובץ.
// הבקשה לשרת נשמרת במטמון של Cloudflare לחצי שעה. המחיר בשרת מתעדכן פעמיים ביום (9:00 ו-21:00).
const API = 'https://fmfrhmfulnianzjhdkey.supabase.co/rest/v1/gold_ticks?select=at,gram24_ils&order=at.desc&limit=1';
const KEY = 'sb_publishable_Gn6Euzy5rG6opj1CQOuwrw_Z3P_3VFp'; // המפתח הציבורי, כמו ב-gold-value.js. RLS מגן על הנתונים.

const whole = new Intl.NumberFormat('he-IL', { maximumFractionDigits: 0 });
const day = new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'Asia/Jerusalem' });
const hour = new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jerusalem' });

export async function onRequestGet(ctx) {
  const res = await ctx.next();
  try {
    if (!res.ok || !(res.headers.get('content-type') || '').includes('text/html')) return res;
    const r = await fetch(API, { headers: { apikey: KEY }, cf: { cacheTtl: 1800, cacheEverything: true } });
    if (!r.ok) return res;
    const row = (await r.json())[0];
    const g = row ? Number(row.gram24_ils) : NaN;
    if (!(g > 50 && g < 5000) || !row.at || isNaN(Date.parse(row.at))) return res;
    const d = new Date(row.at);
    const when = day.format(d) + ', ' + hour.format(d);
    return new HTMLRewriter()
      .on('#t-body', { element(el) { el.setAttribute('data-gram24', String(g)); el.setAttribute('data-at', row.at); } })
      .on('td[data-pg]', {
        element(el) {
          const f = Number(el.getAttribute('data-pg')) / 1000;
          if (f > 0) el.setInnerContent(whole.format(Math.round(g * f)) + ' ₪');
        },
      })
      .on('#t-cap', { element(el) { el.setInnerContent('שווי הזהב בגרם אחד של תכשיט, לפי מחיר הזהב מ-' + when + '. בלי עבודה, עיצוב ומע״מ.'); } })
      .transform(res);
  } catch {
    return res;
  }
}
