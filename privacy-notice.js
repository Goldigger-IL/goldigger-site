/* הודעת פרטיות בדף השער. הודעת יידוע בלבד: האתר הזה לא שומר כלום בדפדפן מלבד סימון "ראיתי" אחד, ואין בו מעקב.
   !!! כל משפט כאן הוא התחייבות. אם מוסיפים לאתר אנליטיקס, פיקסל או כל סקריפט צד שלישי — להחליף לבאנר הסכמה לפני כן.
   המפתח והגרסה זהים לאלה שבאפליקציה בדפדפן, כך שמי שסגר את ההודעה לא יראה אותה שוב כשהאפליקציה תעלה לאותה כתובת. */
(function () {
  'use strict';
  var KEY = 'goldigger.privacy.notice';
  var VERSION = '1';
  var TXT = {
    label: 'הודעת פרטיות',
    title: 'הפרטיות שלך חשובה לנו',
    body: 'האתר שומר אצלך רק מה שנחוץ כדי להתחבר ולהגן עליך מבוטים. אין עוגיות פרסום ואין מעקב אחריך.',
    ok: 'הבנתי',
    settings: 'הגדרות פרטיות',
    policy: 'מדיניות פרטיות',
    close: 'סגירה',
    panelTitle: 'הגדרות פרטיות',
    intro: 'האתר הזה לא שומר בדפדפן שלך דבר מלבד סימון אחד: שסגרת את ההודעה על הפרטיות. אין עוגיות, אין אנליטיקס, אין פיקסלים ואין שירותי מעקב של צד שלישי.',
    items: [
      ['סימון קריאה', 'נשמר בדפדפן שלך כדי שלא נציג את ההודעה שוב בכל ביקור. הוא לא נשלח אלינו.'],
      ['קישורים החוצה', 'כפתורי ההורדה פותחים את TestFlight של אפל. מרגע שנפתח אתר של אפל, חלה עליו מדיניות הפרטיות שלה.']
    ],
    withdraw: 'אפשר למחוק את הסימון בכל רגע דרך הגדרות הדפדפן, והאתר ימשיך לעבוד כרגיל.',
    link: 'הגדרות פרטיות'
  };

  function read() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write() {
    try { window.localStorage.setItem(KEY, VERSION); } catch (e) { /* אחסון חסום: פשוט לא זוכרים */ }
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  function btn(text, cls, fn) {
    var b = el('button', 'gpn-btn' + (cls ? ' ' + cls : ''), text);
    b.type = 'button';
    b.addEventListener('click', fn);
    return b;
  }

  var policyUrl = '/privacy/';
  var css = el('link');
  css.rel = 'stylesheet';
  css.href = '/privacy-notice.css';
  document.head.appendChild(css);

  var bar = null;
  var dlg = el('dialog', 'gpn-dlg');
  dlg.setAttribute('aria-label', TXT.panelTitle);
  var pt = el('h2', 'gpn-h', TXT.panelTitle);
  dlg.appendChild(pt);
  dlg.appendChild(el('p', 'gpn-p', TXT.intro));
  TXT.items.forEach(function (it) {
    var d = el('div', 'gpn-item');
    d.appendChild(el('strong', null, it[0]));
    d.appendChild(el('span', null, it[1]));
    dlg.appendChild(d);
  });
  dlg.appendChild(el('p', 'gpn-p', TXT.withdraw));
  var row = el('div', 'gpn-row');
  row.appendChild(btn(TXT.close, 'gpn-main', function () { dlg.close(); }));
  var pol = el('a', 'gpn-link', TXT.policy);
  pol.href = policyUrl;
  row.appendChild(pol);
  dlg.appendChild(row);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  function openPanel() {
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }
  function dismiss() {
    write();
    if (bar && bar.parentNode) bar.parentNode.removeChild(bar);
    bar = null;
  }

  function build() {
    document.body.appendChild(dlg);

    // קישור קבוע בתחתית האתר
    var nav = document.querySelector('.foot nav');
    if (nav) {
      var fl = el('button', 'gpn-foot', TXT.link);
      fl.type = 'button';
      fl.addEventListener('click', openPanel);
      nav.appendChild(fl);
    }

    if (read() === VERSION) return;
    bar = el('section', 'gpn-bar');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', TXT.label);
    var x = btn('×', 'gpn-x', dismiss);
    x.setAttribute('aria-label', TXT.close);
    bar.appendChild(x);
    bar.appendChild(el('h2', 'gpn-t', TXT.title));
    bar.appendChild(el('p', 'gpn-p', TXT.body));
    var r = el('div', 'gpn-row');
    r.appendChild(btn(TXT.ok, 'gpn-main', dismiss));
    r.appendChild(btn(TXT.settings, '', openPanel));
    var a = el('a', 'gpn-link', TXT.policy);
    a.href = policyUrl;
    r.appendChild(a);
    bar.appendChild(r);
    document.body.appendChild(bar);

    // Esc סוגר את הסרגל (החלון הפתוח סוגר את עצמו קודם). סגירה נחשבת "ראיתי".
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && bar && !dlg.open) dismiss();
    });
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
