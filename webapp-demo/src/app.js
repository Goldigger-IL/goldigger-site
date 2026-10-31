(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var GOLD = 399, AVG = { 14: 410, 18: 520, 22: 610, 24: 690 }, PUR = { 14: 0.585, 18: 0.75, 22: 0.916, 24: 1 };
var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var fmt = function (n) { return Math.round(n).toLocaleString('en-US'); };
var money = function (n) { return '<span class="num">' + fmt(n) + ' ₪</span>'; };
var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

/* ---------- icons ---------- */
var IC = {
  feed: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  chat: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5z"/>',
  shop: '<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5a2.75 2.75 0 0 0 5.3 0 2.75 2.75 0 0 0 5.4 0 2.75 2.75 0 0 0 5.3 0M5.5 12.5V20h13v-7.5M10 20v-4.5h4V20"/>',
  bell: '<path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 10.2c0-1 1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.5-2.5 1.8-2.5.8-2.5 1.8 1 1.7 2.5 1.7 2.5-.7 2.5-1.7"/>',
  chart: '<path d="M4 20V4M4 20h16M8 15l3.5-4 3 2.5L19 8"/>',
  list: '<path d="M8 6.5h12M8 12h12M8 17.5h12M4 6.5h.01M4 12h.01M4 17.5h.01"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  send: '<path d="M20 12H5M11 5.5 4.5 12l6.5 6.5" transform="scale(-1 1) translate(-24 0)"/>',
  back: '<path d="m9 5.5 6.5 6.5L9 18.5" transform="scale(-1 1) translate(-24 0)"/>',
  chev: '<path d="m15 5.5-6.5 6.5 6.5 6.5"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5V6z"/><path d="m9 12 2.2 2.2L15 10.5"/>',
  up: '<path d="m6 14 6-6 6 6"/>', down: '<path d="m6 10 6 6 6-6"/>', sort: '<path d="m8 9 4-4 4 4M8 15l4 4 4-4"/>',
  chevR: '<path d="m9 5.5 6.5 6.5L9 18.5"/>',
  out: '<path d="M14 4h4.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H14M10 8l-4 4 4 4M6 12h10"/>',
  user: '<circle cx="12" cy="8.5" r="3.7"/><path d="M5 20c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4"/>'
};
var ic = function (n, cls) { return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + IC[n] + '</svg>'; };

/* ---------- line art stand-ins for photos ---------- */
var ART = {
  chain: '<path d="M16 26Q60 118 104 26" stroke-width="5" stroke-dasharray="9 3.5"/><circle cx="60" cy="78" r="5"/>',
  ring: '<circle cx="60" cy="76" r="26" stroke-width="5"/><path d="M60 24 74 38 60 54 46 38z"/><path d="M46 38h28M53 31l3 7 4 16M67 31l-3 7-4 16" stroke-width="2"/>',
  bracelet: '<ellipse cx="60" cy="62" rx="46" ry="24" stroke-width="5" stroke-dasharray="10 3.5"/><path d="M20 70c8 15 24 22 40 22s32-7 40-22" stroke-width="3"/>',
  earrings: '<g><circle cx="36" cy="22" r="5"/><path d="M36 27v12"/><path d="M36 39c-11 14-12 28 0 40 12-12 11-26 0-40z"/><path d="M36 54c-4 7-4 14 0 20" stroke-width="2"/></g><g><circle cx="84" cy="22" r="5"/><path d="M84 27v12"/><path d="M84 39c-11 14-12 28 0 40 12-12 11-26 0-40z"/><path d="M84 54c-4 7-4 14 0 20" stroke-width="2"/></g>',
  pendant: '<path d="M18 20Q60 86 102 20" stroke-width="5" stroke-dasharray="9 3.5"/><circle cx="60" cy="56" r="3.5"/><path d="M60 60v6M60 66l14 24H46zM60 102 46 78h28z" stroke-width="3"/>'
};
var art = function (k) { return '<svg class="art" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' + ART[k] + '</svg>'; };
var KIND_HE = { chain: 'שרשראות', ring: 'טבעות', bracelet: 'צמידים', earrings: 'עגילים', pendant: 'תליונים' };

/* ---------- Shuki rules ---------- */
var LV = { great: ['מחיר טוב', 'great'], fair: ['מחיר הוגן', 'fair'], high1: ['קצת מעל הממוצע', 'high'], high2: ['יקר מהממוצע', 'high'], high3: ['יקר בהרבה', 'high'] };
function verdict(price, g, k) {
  var avg = AVG[k], diff = price / g / avg - 1, o;
  if (diff < -0.05) { var x = Math.round(Math.abs(diff) * 100); o = { level: 'great', html: x + '% מתחת לממוצע', text: x + '% מתחת לממוצע' }; }
  else if (diff <= 0.05) o = { level: 'fair', html: 'בממוצע השבוע', text: 'בממוצע השבוע' };
  else {
    var extra = Math.max(10, Math.round((price - avg * g) / 10) * 10);
    o = { level: extra < 100 ? 'high1' : extra < 1000 ? 'high2' : 'high3', html: money(extra) + ' מעל הממוצע', text: fmt(extra) + ' ₪ מעל הממוצע' };
  }
  o.title = LV[o.level][0]; o.tone = LV[o.level][1]; o.diff = diff;
  return o;
}
var faceTag = function (v, cls) { return '<span class="' + cls + ' tone-' + v.tone + '"><img src="img/' + v.level + '.png" alt="" width="26" height="26">' + v.title + '</span>'; };

/* ---------- data (demo) ---------- */
var S = {
  yaakov: { name: 'תכשיטי יעקב', kind: 'shop', city: 'רמת גן', rating: '4.9', deals: 27 },
  zahav: { name: 'זהב ואבן', kind: 'shop', city: 'תל אביב', rating: '4.8', deals: 112 },
  noa: { name: 'נועה לוי', kind: 'private', city: 'חולון', rating: '4.7', deals: 6 },
  yossi: { name: 'יוסי כהן', kind: 'private', city: 'פתח תקווה', rating: '4.8', deals: 4 },
  michal: { name: 'מיכל רוזן', kind: 'private', city: 'נתניה', rating: '5.0', deals: 3 },
  ofer: { name: 'אופיר אברהם', kind: 'private', city: 'ראשון לציון', rating: '4.6', deals: 9 },
  shine: { name: 'פנינה ויהלום', kind: 'shop', city: 'חיפה', rating: '4.7', deals: 58 }
};
var ITEMS = [
  { id: 1, kind: 'chain', title: 'שרשרת פיגארו, סוגר לובסטר', k: 14, g: 10.2, price: 3950, len: '45 ס״מ', cond: 'כמו חדש', s: 'yaakov', city: 'רמת גן', new: 3 },
  { id: 2, kind: 'ring', title: 'טבעת סוליטר עם אבן', k: 14, g: 3.4, price: 1475, len: 'מידה 54', cond: 'כמו חדש', s: 'noa', city: 'חולון', new: 5 },
  { id: 3, kind: 'bracelet', title: 'צמיד טניס אלגנטי', k: 18, g: 14.5, price: 7200, len: '18 ס״מ', cond: 'כמו חדש', s: 'zahav', city: 'תל אביב', new: 2 },
  { id: 4, kind: 'earrings', title: 'עגילי חישוק קלאסיים', k: 14, g: 2.8, price: 1050, len: '2 ס״מ', cond: 'משומש', s: 'michal', city: 'נתניה', new: 7 },
  { id: 5, kind: 'pendant', title: 'תליון מגן דוד קטן', k: 14, g: 2.1, price: 880, len: '1.5 ס״מ', cond: 'חדש', s: 'yossi', city: 'פתח תקווה', new: 1 },
  { id: 6, kind: 'chain', title: 'שרשרת חבל עבה', k: 22, g: 18, price: 10400, len: '50 ס״מ', cond: 'משומש', s: 'shine', city: 'חיפה', new: 9 },
  { id: 7, kind: 'bracelet', title: 'צמיד קשיח חלק', k: 18, g: 22, price: 13900, len: '17 ס״מ', cond: 'חדש', s: 'zahav', city: 'תל אביב', new: 4 },
  { id: 8, kind: 'ring', title: 'טבעת נישואין קלאסית', k: 14, g: 4.1, price: 1680, len: 'מידה 56', cond: 'חדש', s: 'yaakov', city: 'רמת גן', new: 6 },
  { id: 9, kind: 'earrings', title: 'עגילי טיפה עדינים', k: 18, g: 3.2, price: 1500, len: '3 ס״מ', cond: 'כמו חדש', s: 'ofer', city: 'ראשון לציון', new: 8 },
  { id: 10, kind: 'pendant', title: 'תליון חי עם שרשרת', k: 22, g: 3, price: 1900, len: '2 ס״מ', cond: 'משומש', s: 'noa', city: 'חולון', new: 10 },
  { id: 11, kind: 'chain', title: 'שרשרת עבה לגבר', k: 14, g: 16, price: 7600, len: '55 ס״מ', cond: 'משומש', s: 'ofer', city: 'ראשון לציון', new: 11 },
  { id: 12, kind: 'bracelet', title: 'צמיד שרשרת עם סוגר', k: 14, g: 8.5, price: 3900, len: '19 ס״מ', cond: 'כמו חדש', s: 'shine', city: 'חיפה', new: 12 }
];
ITEMS.forEach(function (it) { it.v = verdict(it.price, it.g, it.k); it.gold = it.g * PUR[it.k] * GOLD; it.pg = it.price / it.g; });
var MINE = [
  { id: 101, kind: 'chain', title: 'שרשרת פיגארו', k: 14, g: 10.2, price: 3950, views: 312, st: 'active' },
  { id: 102, kind: 'ring', title: 'טבעת סוליטר', k: 14, g: 3.4, price: 1475, views: 188, st: 'active' },
  { id: 103, kind: 'bracelet', title: 'צמיד טניס', k: 18, g: 14.5, price: 7200, views: 241, st: 'active' },
  { id: 104, kind: 'earrings', title: 'עגילי חישוק', k: 14, g: 2.8, price: 1050, views: 97, st: 'active' },
  { id: 105, kind: 'pendant', title: 'תליון חי', k: 22, g: 3, price: 1900, views: 64, st: 'paused' },
  { id: 106, kind: 'bracelet', title: 'צמיד קשיח', k: 18, g: 22, price: 13900, views: 150, st: 'active' },
  { id: 107, kind: 'ring', title: 'טבעת נישואין', k: 14, g: 4.1, price: 1680, views: 120, st: 'sold' },
  { id: 108, kind: 'earrings', title: 'עגילי טיפה', k: 18, g: 3.2, price: 1500, views: 203, st: 'sold' },
  { id: 109, kind: 'chain', title: 'שרשרת חבל', k: 22, g: 18, price: 10400, views: 76, st: 'active' },
  { id: 110, kind: 'pendant', title: 'תליון מגן דוד', k: 14, g: 2.1, price: 880, views: 55, st: 'active' }
];
MINE.forEach(function (m) { m.v = verdict(m.price, m.g, m.k); m.pg = m.price / m.g; });
var VIEWS14 = [142, 158, 131, 176, 189, 164, 121, 152, 170, 196, 208, 181, 215, 243];
var WANTED = [
  { t: 'שרשרת 14K, 45 עד 50 ס״מ', b: 'עד 4,000 ₪', c: 'חולון', n: 'דני' },
  { t: 'טבעת סוליטר 14K', b: 'עד 2,000 ₪', c: 'רמת גן', n: 'שירה' },
  { t: 'צמיד 18K, עד 15 גרם', b: 'עד 8,000 ₪', c: 'תל אביב', n: 'אורי' },
  { t: 'עגילי חישוק 14K', b: 'עד 1,200 ₪', c: 'בת ים', n: 'ליאור' }
];
var CHATS = {
  buyer: [
    { id: 'b1', name: 'יוסי כהן', role: 'מוכר פרטי · 4.8 · 4 עסקאות', item: 1, time: '14:20', unread: 1, msgs: [
      { f: 'me', t: 'היי! השרשרת עדיין זמינה? אפשר לבוא לראות השבוע?', h: '14:02' },
      { f: 'them', t: 'מעולה, אשמח שתבוא ביום חמישי', h: '14:11' },
      { f: 'me', t: 'מעולה. מתי נוח לך?', h: '14:20' }] },
    { id: 'b2', name: 'זהב ואבן', role: 'חנות · 4.8 · 112 עסקאות', item: 3, time: 'אתמול', unread: 0, msgs: [
      { f: 'me', t: 'שלום, יש אפשרות להוריד קצת במחיר אם מגיעים לחנות?', h: '19:40' },
      { f: 'them', t: 'שלום! אפשר לדבר על זה מול הפריט. נשמח לראות אותך.', h: '20:05' }] },
    { id: 'b3', name: 'מיכל רוזן', role: 'מוכרת פרטית · 5.0 · 3 עסקאות', item: 4, time: 'יום ג׳', unread: 0, msgs: [
      { f: 'me', t: 'היי מיכל, העגילים עם חותמת 585?', h: '09:12' },
      { f: 'them', t: 'כן, יש חותמת ואפשר לשקול אצל צורף.', h: '09:30' }] }
  ],
  seller: [
    { id: 's1', name: 'דני מחולון', role: 'קונה · 3 עסקאות', item: 101, time: '11:05', unread: 2, msgs: [
      { f: 'them', t: 'שלום, השרשרת עדיין למכירה?', h: '10:58' },
      { f: 'me', t: 'שלום דני, כן. אפשר לבוא לחנות בכל יום עד 18:00.', h: '11:02' },
      { f: 'them', t: 'אגיע מחר בצהריים, תשאירו לי אותה בבקשה', h: '11:05' }] },
    { id: 's2', name: 'שירה ל.', role: 'קונה · עסקה ראשונה', item: 102, time: 'אתמול', unread: 0, msgs: [
      { f: 'them', t: 'האבן בטבעת מאושרת בתעודה?', h: '16:20' },
      { f: 'me', t: 'כן, יש תעודה ואפשר לראות בחנות.', h: '16:41' }] },
    { id: 's3', name: 'אורי ב.', role: 'קונה · 2 עסקאות', item: 103, time: 'יום ב׳', unread: 0, msgs: [
      { f: 'them', t: 'אפשר מחיר סופי לצמיד?', h: '13:10' }] }
  ]
};
var allItem = function (id) { return ITEMS.filter(function (x) { return x.id === id; })[0] || MINE.filter(function (x) { return x.id === id; })[0]; };

/* ---------- state ---------- */
var NAV = {
  buyer: [['feed', 'פיד', 'feed'], ['chats', 'צ׳אטים', 'chat'], ['shops', 'חנויות', 'shop'], ['alerts', 'התראות', 'bell'], ['profile', 'פרופיל', 'user'], ['gold', 'מחיר הזהב', 'coin', true], ['liked', 'אהבתי', 'heart', true, 'profile'], ['requests', 'הבקשות שלי', 'list', true, 'profile']],
  seller: [['overview', 'סקירה', 'chart'], ['items', 'הפריטים שלי', 'list'], ['chats', 'צ׳אטים', 'chat'], ['wanted', 'מחפשים', 'search'], ['shop', 'החנות שלי', 'shop']]
};
var TITLES = { feed: 'פיד', chats: 'צ׳אטים', shops: 'חנויות', alerts: 'התראות', gold: 'מחיר הזהב', overview: 'סקירה', items: 'הפריטים שלי', wanted: 'מחפשים', shop: 'החנות שלי', profile: 'פרופיל', liked: 'אהבתי', requests: 'הבקשות שלי' };
var st = { mode: 'buyer', view: 'feed', cat: 'all', good: false, sort: 'def', q: '', hearts: {}, hidden: {}, wanted: {}, chat: { buyer: 'b1', seller: 's1' }, chatList: false, tipOff: false, introOff: false, sortCol: null, sortDir: 1, sel: {}, first: { chart: true, kpi: true }, lastKey: '' };
var main = $('#main');

function parseHash() {
  var h = location.hash.replace('#', '').split('/');
  var m = h[0] === 'seller' ? 'seller' : 'buyer';
  var v = NAV[m].some(function (n) { return n[0] === h[1]; }) ? h[1] : NAV[m][0][0];
  st.mode = m; st.view = v;
}

/* ---------- chrome ---------- */
function renderChrome() {
  $$('[data-mode-switch]').forEach(function (el) {
    el.innerHTML = '<button type="button" data-m="buyer" aria-pressed="' + (st.mode === 'buyer') + '">קונה</button><button type="button" data-m="seller" aria-pressed="' + (st.mode === 'seller') + '">סוחר</button>';
  });
  var cur = NAV[st.mode].filter(function (n) { return n[0] === st.view; })[0], act = cur[4] || cur[0];
  $('#nav').innerHTML = NAV[st.mode].filter(function (n) { return !n[3]; }).map(function (n) {
    var badge = n[0] === 'chats' ? '<span class="badge" aria-label="הודעות שלא נקראו">' + (st.mode === 'buyer' ? 1 : 2) + '</span>' : '';
    return '<a href="#' + st.mode + '/' + n[0] + '"' + (n[0] === act ? ' aria-current="page"' : '') + '>' + ic(n[2]) + '<span class="t">' + n[1] + '</span>' + badge + '</a>';
  }).join('');
  var isB = st.mode === 'buyer', u = $('#user');
  u.href = isB ? '#buyer/profile' : '#seller/shop';
  u.setAttribute('aria-label', isB ? 'הפרופיל שלי, דנה כהן' : 'החנות שלי, תכשיטי יעקב');
  if (u.getAttribute('aria-current')) u.removeAttribute('aria-current');
  if ((isB && st.view === 'profile') || (!isB && st.view === 'shop')) u.setAttribute('aria-current', 'page');
  u.innerHTML = isB
    ? '<span class="avatar" aria-hidden="true">ד</span><div><b>דנה כהן</b><span>קונה · תל אביב</span></div>' + ic('chev', 'user__chev')
    : '<span class="avatar" aria-hidden="true">י</span><div><b>תכשיטי יעקב</b><span>חנות · רמת גן</span></div>' + ic('chev', 'user__chev');
  var g = $('#goldChip');
  if (isB) g.setAttribute('href', '#buyer/gold'); else { g.removeAttribute('href'); }
  document.body.dataset.view = st.mode + '-' + st.view;
  $('#title').textContent = TITLES[st.view];
  $('#searchIcon').innerHTML = ic('search');
  $('#q').placeholder = st.mode === 'buyer' ? 'חיפוש תכשיט, עיר או מוכר' : 'חיפוש בפריטים שלי';
  themeBtn();
  document.title = TITLES[st.view] + ' · גולדיגר דמו';
}
function themeBtn() {
  var dark = document.documentElement.dataset.theme === 'dark';
  var b = $('#themeBtn');
  b.innerHTML = ic(dark ? 'sun' : 'moon');
  b.setAttribute('aria-label', dark ? 'מעבר לערכת נושא בהירה' : 'מעבר לערכת נושא כהה');
}
document.addEventListener('click', function (e) {
  var mb = e.target.closest('[data-m]');
  if (mb) { location.hash = '#' + mb.dataset.m + '/' + NAV[mb.dataset.m][0][0]; return; }
  if (e.target.closest('#themeBtn')) { document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; themeBtn(); }
});

/* ---------- toast ---------- */
var tt;
function toast(msg) {
  var t = $('#toast'); t.textContent = msg; t.classList.add('is-on');
  clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('is-on'); }, 3200);
}

/* ---------- views ---------- */
function render() {
  parseHash(); renderChrome();
  var key = st.mode + '/' + st.view, fresh = key !== st.lastKey; st.lastKey = key;
  var v = st.mode === 'buyer' ? ({ feed: viewFeed, chats: viewChat, profile: viewProfile, liked: viewLiked, requests: viewRequests }[st.view]) : ({ overview: viewOverview, items: viewItems, chats: viewChat, shop: viewShop }[st.view]);
  main.innerHTML = '<div class="view">' + (v ? v() : viewPlaceholder()) + '</div>';
  if (!fresh) main.firstChild.style.animation = 'none';
  bind();
}
function viewPlaceholder() {
  var n = NAV[st.mode].filter(function (x) { return x[0] === st.view; })[0];
  var msg = { shops: 'כאן יופיעו חנויות ומוכרים מאומתים לפי עיר.', alerts: 'כאן יופיעו התראות על מחירים ופריטים חדשים שמתאימים לכם.', gold: 'כאן יופיע גרף מחיר הזהב לפי קראט.', wanted: 'כאן יופיעו כל הבקשות של קונים לפי עיר וקראט.', shop: '' }[st.view];
  return '<div class="ph">' + ic(n[2]) + '<h2>' + n[1] + '</h2><p>' + msg + ' המסך הזה מחוץ לדמו הנוכחי.</p><a class="btn btn--gold" href="#' + st.mode + '/' + NAV[st.mode][0][0] + '">חזרה ל' + NAV[st.mode][0][1] + '</a></div>';
}

/* profile */
var hearted = function () { return ITEMS.filter(function (i) { return st.hearts[i.id]; }); };
var requested = function () { return ITEMS.filter(function (i) { return st.wanted[i.id]; }); };
function row(o) {
  var inner = (o.icon ? '<span class="setrow__ic">' + ic(o.icon) + '</span>' : '') + '<span class="setrow__t"><b>' + o.t + '</b>' + (o.sub ? '<small>' + o.sub + '</small>' : '') + '</span>' + (o.val ? '<span class="setrow__v num">' + o.val + '</span>' : '') + (o.ext ? '<span class="vh">נפתח בכרטיסייה חדשה</span>' : '') + (o.nochev ? '' : ic('chev', 'setrow__chev'));
  if (o.href) return '<a class="setrow' + (o.cls ? ' ' + o.cls : '') + '" href="' + o.href + '"' + (o.ext ? ' target="_blank" rel="noopener"' : '') + '>' + inner + '</a>';
  return '<button type="button" class="setrow' + (o.cls ? ' ' + o.cls : '') + '"' + (o.attr ? ' ' + o.attr : '') + '>' + inner + '</button>';
}
function group(title, rows) { return '<section class="setgroup"' + (title ? ' aria-label="' + title + '"' : '') + (title ? '><h2 class="setgroup__h">' + title + '</h2>' : '>') + '<div class="setlist">' + rows.join('') + '</div></section>'; }
function backLink(txt) { return '<a class="backlink" href="#buyer/profile">' + ic('chevR') + '<span>' + txt + '</span></a>'; }
function viewProfile() {
  return '<div class="prof"><header class="prof__head"><span class="avatar avatar--xl" aria-hidden="true">ד</span><div><h2>דנה כהן</h2><p class="prof__city">תל אביב</p>' +
    '<p class="prof__ok">' + ic('shield') + '<span>טלפון מאומת</span></p><p class="prof__since">חבר מאז אוקטובר 2026</p></div></header>' +
    group('הפעילות שלי', [
      row({ t: 'אהבתי', icon: 'heart', val: hearted().length, href: '#buyer/liked' }),
      row({ t: 'הבקשות שלי', icon: 'list', val: requested().length, href: '#buyer/requests' }),
      row({ t: 'ההתראות שלי', icon: 'bell', href: '#buyer/alerts' })]) +
    '<section class="setgroup" aria-label="המנוי"><h2 class="setgroup__h">המנוי</h2><div class="setlist"><div class="setrow setrow--static"><span class="setrow__ic">' + ic('coin') + '</span><span class="setrow__t"><b>שנה ראשונה חינם, עד <span class="num">12.12.2027</span></b><small>אחר כך <span class="num">4.90 ₪</span> לשנה, אפשר לבטל בכל עת</small></span></div></div></section>' +
    group('מצב סוחר', [row({ t: 'יש לך חנות? מעבר למצב סוחר', icon: 'shop', attr: 'data-m="seller"' })]) +
    group('מידע', [
      row({ t: 'נגישות', href: 'https://goldigger.co.il/accessibility/', ext: true }),
      row({ t: 'תנאי שימוש', href: 'https://goldigger.co.il/terms/', ext: true }),
      row({ t: 'מדיניות פרטיות', href: 'https://goldigger.co.il/privacy/', ext: true })]) +
    group('', [row({ t: 'התנתקות', icon: 'out', cls: 'setrow--danger', nochev: true, attr: 'data-logout' })]) +
    '</div><p class="demo-note">נתוני דוגמה</p>';
}
function viewLiked() {
  var l = hearted();
  return backLink('פרופיל') + '<h2 class="subh">אהבתי</h2>' + (l.length
    ? '<div class="grid" id="grid">' + l.map(cardHtml).join('') + '</div>'
    : '<div class="empty"><b>עוד לא אהבתם פריטים</b>לחצו על הלב בפיד כדי לשמור פריט כאן.</div>');
}
function viewRequests() {
  var l = requested();
  return backLink('פרופיל') + '<h2 class="subh">הבקשות שלי</h2>' + (l.length
    ? '<div class="setlist reqlist">' + l.map(function (it) {
      return '<button type="button" class="setrow reqrow" data-req="' + it.id + '"><span class="visual reqrow__v">' + art(it.kind) + '</span><span class="setrow__t"><b>' + esc(it.title) + '</b><small>' + S[it.s].name + ' · <span class="num">' + fmt(it.price) + ' ₪</span></small><em class="reqrow__st">מחכה לאישור המוכר</em></span>' + ic('chev', 'setrow__chev') + '</button>';
    }).join('') + '</div>'
    : '<div class="empty"><b>אין בקשות פתוחות</b>לחצו רוצה על פריט בפיד ותראו אותו כאן.</div>');
}
function viewShop() {
  return '<div class="prof"><header class="prof__head"><span class="avatar avatar--xl" aria-hidden="true">' + ic('shop') + '</span><div><h2>תכשיטי יעקב</h2><p class="prof__city">רמת גן</p><p class="prof__ok">' + ic('shield') + '<span>חנות מאומתת</span></p></div></header>' +
    group('מצב שימוש', [row({ t: 'מעבר למצב קונה', icon: 'user', attr: 'data-m="buyer"' })]) +
    group('', [row({ t: 'התנתקות', icon: 'out', cls: 'setrow--danger', nochev: true, attr: 'data-logout' })]) + '</div><p class="demo-note">נתוני דוגמה</p>';
}

/* feed */
var CATS = [['all', 'הכל'], ['chain', 'שרשראות'], ['ring', 'טבעות'], ['bracelet', 'צמידים'], ['earrings', 'עגילים'], ['pendant', 'תליונים']];
function viewFeed() {
  return '<div class="filters"><div class="chips" role="group" aria-label="סינון">' +
    '<button type="button" class="chip chip--good" id="goodBtn" aria-pressed="' + st.good + '"><img src="img/great.png" alt="" width="22" height="22">רק מחיר טוב</button>' +
    CATS.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c[0] + '" aria-pressed="' + (st.cat === c[0]) + '">' + c[1] + '</button>';
    }).join('') + '</div></div>' +
    (st.introOff ? '' : '<div class="intro" id="intro"><img src="img/great.png" alt="" width="32" height="32"><p>שוקי בודק כל מחיר מול תכשיטים דומים, ואומר אם הוא טוב, הוגן או יקר.</p><button type="button" id="introX" aria-label="סגירת ההסבר">' + ic('close') + '</button></div>') +
    '<div class="countrow"><p class="count" id="count" aria-live="polite"></p><label class="sortbox" for="sortSel">' + ic('sort') + '<span>מיון:</span><b id="sortLbl"></b>' +
    '<select class="select" id="sortSel"><option value="def">החדשים</option><option value="best">הכי משתלם</option><option value="pa">מחיר: מהנמוך לגבוה</option><option value="pd">מחיר: מהגבוה לנמוך</option></select></label></div>' +
    '<div class="grid" id="grid"></div><p class="demo-note">נתוני דוגמה</p>';
}
function cardHtml(it) {
  var s = S[it.s];
  return '<article class="card" data-id="' + it.id + '"><button type="button" class="card__main" data-open="' + it.id + '" aria-label="' + esc(it.title + ', ' + fmt(it.price) + ' ₪, ' + it.v.title) + '">' +
    '<span class="visual">' + art(it.kind) + faceTag(it.v, 'vtag') + '</span>' +
    '<span class="card__body"><span class="price">' + fmt(it.price) + ' ₪</span><span class="pergram">' + money(it.pg) + ' לגרם</span>' +
    '<span class="card__title">' + esc(it.title) + '</span>' +
    '<span class="meta"><span class="num">' + it.k + 'K</span><span>' + it.g + ' גרם</span></span>' +
    '<span class="row2"><span class="kind kind--' + s.kind + '">' + (s.kind === 'shop' ? 'חנות' : 'פרטי') + '</span><span class="city">' + it.city + '</span></span></span></button>' +
    '<button type="button" class="heart" data-heart="' + it.id + '" aria-pressed="' + !!st.hearts[it.id] + '" aria-label="שמירה למועדפים: ' + esc(it.title) + '"><span>' + ic('heart') + '</span></button></article>';
}
function sortLbl() { var s = $('#sortSel'); $('#sortLbl').textContent = s.options[s.selectedIndex].text; }
function updateGrid() {
  var q = st.q.trim();
  var list = ITEMS.filter(function (it) {
    if (st.hidden[it.id]) return false;
    if (st.cat !== 'all' && it.kind !== st.cat) return false;
    if (st.good && it.v.level !== 'great') return false;
    if (q && (it.title + ' ' + it.city + ' ' + S[it.s].name + ' ' + KIND_HE[it.kind]).indexOf(q) < 0) return false;
    return true;
  });
  var sorters = { best: function (a, b) { return a.v.diff - b.v.diff; }, pa: function (a, b) { return a.price - b.price; }, pd: function (a, b) { return b.price - a.price; }, def: function (a, b) { return a.new - b.new; } };
  list.sort(sorters[st.sort]);
  $('#grid').innerHTML = list.length ? list.map(cardHtml).join('') : '<div class="empty" style="grid-column:1/-1"><b>לא נמצאו פריטים</b>נסו לבטל מסנן או לחפש משהו אחר.</div>';
  $('#count').textContent = list.length + ' פריטים';
  $$('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.cat === st.cat)); });
  $('#goodBtn').setAttribute('aria-pressed', String(st.good));
}

/* chat */
function viewChat() {
  var list = CHATS[st.mode], cur = list.filter(function (c) { return c.id === st.chat[st.mode]; })[0] || list[0];
  var it = allItem(cur.item), isB = st.mode === 'buyer';
  var itMeta = '<span class="meta"><span>' + it.g + ' גרם</span><span>' + money(it.price) + '</span></span>';
  return '<div class="chat' + (st.chatList ? ' list' : '') + '" id="chat"><div class="convs" role="list" aria-label="שיחות">' + list.map(function (c) {
    var last = c.msgs[c.msgs.length - 1];
    return '<button type="button" role="listitem" class="conv" data-conv="' + c.id + '" aria-current="' + (c.id === cur.id) + '"><span class="avatar" aria-hidden="true">' + c.name.charAt(0) + '</span><span><b>' + c.name + (c.unread ? '<i class="unread" aria-label="הודעה חדשה"></i>' : '') + '</b><span class="last">' + esc(last.t) + '</span></span><small>' + c.time + '</small></button>';
  }).join('') + '</div><section class="thread" aria-label="שיחה עם ' + cur.name + '">' +
    '<div class="thread__head"><button type="button" class="iconbtn back" id="chatBack" aria-label="חזרה לרשימת השיחות">' + ic('back') + '</button><span class="avatar" aria-hidden="true">' + cur.name.charAt(0) + '</span><div><b>' + cur.name + '</b><span class="sub">' + cur.role + '</span></div></div>' +
    '<div class="pinned"><div class="visual">' + art(it.kind) + '</div><div><b>' + esc(it.title) + '</b>' + itMeta + '</div><span style="margin-inline-start:auto">' + ic('chev') + '</span></div>' +
    (st.tipOff ? '' : '<div class="tip" id="tip">' + ic('shield') + '<span>זכרו! בודקים חותמת ומשקל לפני שמשלמים. לא מעבירים כסף מראש.</span><button type="button" id="tipX" aria-label="סגירת הטיפ">' + ic('close') + '</button></div>') +
    '<div class="msgs" id="msgs" tabindex="0" aria-label="הודעות"><div class="sys">' + (isB ? 'פתחת שיחה עם ' + cur.name.split(' ')[0] + '. הטלפונים מוסתרים עד שתבחרו לשתף.' : 'קונה פנה אליך בנוגע לפריט. הטלפונים מוסתרים עד שתבחרו לשתף.') + '</div>' +
    cur.msgs.map(bubble).join('') + '</div>' +
    '<form class="composer" id="composer"><label class="vh" for="msgIn">הודעה</label><input id="msgIn" type="text" placeholder="כתבו הודעה" autocomplete="off"><button class="send" type="submit" aria-label="שליחה">' + ic('send') + '</button></form></section></div><p class="demo-note">נתוני דוגמה</p>';
}
function bubble(m, i, arr, isNew) { if (m.f === 'sys') return '<div class="sys">' + esc(m.t) + '</div>'; return '<div class="bub bub--' + m.f + (isNew ? ' new' : '') + '">' + esc(m.t) + '<small class="num">' + m.h + '</small></div>'; }

/* seller overview */
function viewOverview() {
  var act = MINE.filter(function (m) { return m.st === 'active'; }), sold = MINE.filter(function (m) { return m.st === 'sold'; }).length;
  var a = VIEWS14.slice(7).reduce(function (x, y) { return x + y; }, 0), b = VIEWS14.slice(0, 7).reduce(function (x, y) { return x + y; }, 0);
  var pct = Math.round((a / b - 1) * 100);
  var kp = [['צפיות השבוע', a, '', pct, '%', 'up'], ['בקשות קנייה', 37, '', 5, '', 'up'], ['נמכרו החודש', sold, '', 1, '', 'up'], ['פריטים פעילים', act.length, '', 1, '', 'down']];
  var cnt = { great: 0, fair: 0, high: 0 };
  act.forEach(function (m) { cnt[m.v.tone]++; });
  var tot = act.length, high = act.filter(function (m) { return m.v.tone === 'high'; }).sort(function (x, y) { return y.v.diff - x.v.diff; })[0];
  var W = 600, H = 210, mx = 260, mn = 90, step = W / 13;
  var pts = VIEWS14.map(function (v, i) { return [W - i * step, H - ((v - mn) / (mx - mn)) * (H - 24) - 8]; });
  var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
  var cls = st.first.chart && !REDUCED ? ' draw' : '';
  var dayLbl = ['18.10', '22.10', '26.10', '31.10'];
  var html = '<div class="kpis">' + kp.map(function (k, i) {
    return '<div class="card2"><div class="kpi__label">' + k[0] + '</div><div class="kpi__val num" data-count="' + k[1] + '">' + fmt(k[1]) + '</div><div class="delta"><b class="' + k[5] + '">' + ic(k[5]) + '<span class="vh">' + (k[5] === 'up' ? 'עלייה של ' : 'ירידה של ') + '</span><span class="num">' + k[3] + k[4] + '</span></b><span>משבוע שעבר</span></div></div>';
  }).join('') + '</div><div class="cols"><div class="stack">' +
    '<section class="card2" aria-labelledby="hViews"><div class="chart__head"><h2 id="hViews">צפיות ב־14 הימים האחרונים</h2><span class="sub">היום: <span class="num">' + VIEWS14[13] + '</span> צפיות</span></div>' +
    '<div class="chart' + cls + '" id="chart"><div class="chart__plot" role="img" aria-label="גרף צפיות יומי. עלייה מ־' + VIEWS14[0] + ' ל־' + VIEWS14[13] + ' צפיות ביום."><svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none"><defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8B84A" stop-opacity="0.38"/><stop offset="1" stop-color="#E8B84A" stop-opacity="0"/></linearGradient></defs>' +
    [0.25, 0.5, 0.75].map(function (f) { return '<line class="grid-l" x1="0" x2="' + W + '" y1="' + (H * f) + '" y2="' + (H * f) + '"/>'; }).join('') +
    '<path class="area" d="' + d + ' L0 ' + H + ' L' + W + ' ' + H + ' Z"/><path class="ln" pathLength="1" d="' + d + '"/></svg><span class="dot" style="left:0;top:' + (pts[0][1] / H * 100) + '%"></span></div>' +
    '<div class="chart__x" aria-hidden="true">' + dayLbl.map(function (x) { return '<span class="num">' + x + '</span>'; }).join('') + '</div></div></section>' +
    '<section class="card2" aria-labelledby="hWanted"><h2 id="hWanted">מחפשים</h2><p class="sub">קונים שמחפשים משהו שדומה למה שיש לך</p><ul class="wanted">' + WANTED.map(function (w, i) {
      return '<li><span class="avatar" aria-hidden="true">' + w.n.charAt(0) + '</span><div><b>' + w.t + ', ' + w.b + ', ' + w.c + '</b><span class="sub">' + w.n + '</span></div><button type="button" class="btn btn--line btn--sm" data-reach="' + i + '">פנייה</button></li>';
    }).join('') + '</ul></section></div>' +
    '<section class="card2" aria-labelledby="hShuki"><h2 id="hShuki">מה שוקי חושב על הפריטים שלך</h2><p class="sub">' + tot + ' פריטים פעילים</p>' +
    '<div class="vbar" role="img" aria-label="טוב ' + cnt.great + ', הוגן ' + cnt.fair + ', יקר ' + cnt.high + '">' +
    [['great', cnt.great], ['fair', cnt.fair], ['high', cnt.high]].filter(function (x) { return x[1]; }).map(function (x) { return '<i class="b-' + x[0] + '" style="flex:' + x[1] + '"></i>'; }).join('') + '</div>' +
    '<ul class="legend"><li><img src="img/great.png" alt="" width="30" height="30">טוב<b class="num">' + cnt.great + '</b></li><li><img src="img/fair.png" alt="" width="30" height="30">הוגן<b class="num">' + cnt.fair + '</b></li><li><img src="img/high2.png" alt="" width="30" height="30">יקר<b class="num">' + cnt.high + '</b></li></ul>' +
    (high ? '<p class="note-s"><b>' + esc(high.title) + '</b> מתומחר ' + (high.v.level === 'high3' ? 'יקר בהרבה' : high.v.level === 'high2' ? 'יקר מהממוצע' : 'מעט מעל הממוצע') + ': ' + high.v.html + '. הורדה קטנה במחיר יכולה להאיץ מכירה.</p>' : '') +
    '</section></div><p class="demo-note">נתוני דוגמה</p>';
  return html;
}

/* seller table */
var STL = { active: 'פעיל', paused: 'מושהה', sold: 'נמכר' };
function sortedMine() {
  var l = MINE.slice(), c = st.sortCol, dir = st.sortDir, q = st.q.trim();
  if (q) l = l.filter(function (m) { return m.title.indexOf(q) >= 0 || KIND_HE[m.kind].indexOf(q) >= 0; });
  if (c) l.sort(function (a, b) {
    var x, y;
    if (c === 'title') return a.title.localeCompare(b.title, 'he') * dir;
    if (c === 'status') { x = ['active', 'paused', 'sold'].indexOf(a.st); y = ['active', 'paused', 'sold'].indexOf(b.st); }
    else if (c === 'v') { x = a.v.diff; y = b.v.diff; } else { x = a[c]; y = b[c]; }
    return (x - y) * dir;
  });
  return l;
}
function viewItems() {
  var cols = [['title', 'פריט'], ['price', 'מחיר'], ['pg', 'לגרם'], ['v', 'שוקי'], ['views', 'צפיות'], ['status', 'סטטוס']];
  var cm = { title: '', price: 'c-hide-m', pg: 'c-hide-m', v: 'c-hide-m', views: 'c-hide-m', status: 'c-hide-m' };
  return '<p class="count" aria-live="polite" id="count"></p><div class="tablewrap"><table><caption class="vh">הפריטים שלי</caption><thead><tr><th scope="col" class="c-chk"><span class="chkhit"><input type="checkbox" id="selAll" aria-label="בחירת כל הפריטים"></span></th>' +
    cols.map(function (c) {
      var on = st.sortCol === c[0];
      return '<th scope="col" class="' + (c[0] === 'title' ? '' : '') + '"' + (on ? ' aria-sort="' + (st.sortDir > 0 ? 'ascending' : 'descending') + '"' : '') + '><button type="button" data-sort="' + c[0] + '">' + c[1] + ic(on ? (st.sortDir > 0 ? 'up' : 'down') : 'sort', 'arr') + '</button></th>';
    }).join('') + '<th scope="col" class="c-hide-m"><span class="vh">פעולות</span></th></tr></thead><tbody id="tb"></tbody></table></div><div id="selSlot"></div><p class="demo-note">נתוני דוגמה</p>';
}
function rowHtml(m) {
  var sel = !!st.sel[m.id];
  return '<tr class="' + (sel ? 'sel' : '') + '" data-row="' + m.id + '"><td class="c-chk"><label class="chkhit"><input type="checkbox" data-sel="' + m.id + '"' + (sel ? ' checked' : '') + ' aria-label="בחירה: ' + esc(m.title) + '"></label></td>' +
    '<td class="c-it"><div class="it"><span class="visual">' + art(m.kind) + '</span><div><b>' + esc(m.title) + '</b><span class="meta"><span class="num">' + m.k + 'K</span><span>' + m.g + ' גרם</span></span></div></div></td>' +
    '<td class="c-price"><span class="price">' + fmt(m.price) + ' ₪</span><span class="pergram only-m">'+money(m.pg)+' לגרם</span></td>' +
    '<td class="c-pg"><span class="pergram">' + money(m.pg) + '</span></td>' +
    '<td class="c-tag">' + faceTag(m.v, 'tag') + '</td>' +
    '<td class="c-views"><span class="num">' + m.views + '</span><span class="only-m"> צפיות</span></td>' +
    '<td class="c-status"><span class="status status--' + m.st + '">' + STL[m.st] + '</span></td>' +
    '<td class="c-acts"><div class="acts"><button type="button" class="btn btn--line" data-edit="' + m.id + '" aria-label="עריכה: ' + esc(m.title) + '">עריכה</button>' +
    (m.st !== 'sold' ? '<button type="button" class="btn btn--ghost" data-toggle="' + m.id + '" aria-label="' + (m.st === 'active' ? 'השהיה' : 'הפעלה') + ': ' + esc(m.title) + '">' + (m.st === 'active' ? 'השהה' : 'הפעל') + '</button>' : '') + '</div></td></tr>';
}
function updateTable() {
  var l = sortedMine();
  $('#tb').innerHTML = l.map(rowHtml).join('') || '<tr><td colspan="8"><div class="empty">לא נמצאו פריטים</div></td></tr>';
  $('#count').textContent = l.length + ' פריטים';
  var n = Object.keys(st.sel).length, all = $('#selAll');
  all.checked = n > 0 && n === MINE.length; all.indeterminate = n > 0 && n < MINE.length;
  $('#selSlot').innerHTML = n ? '<div class="selbar" role="region" aria-label="פעולות על הפריטים שנבחרו"><b>' + n + ' נבחרו</b><button type="button" class="btn btn--gold" data-bulk="sold">סמן כנמכר</button><button type="button" class="btn btn--ghost" data-bulk="paused">השהה</button><button type="button" class="btn btn--ghost" data-bulk="clear">ביטול</button></div>' : '';
}

/* ---------- bindings ---------- */
function bind() {
  if (st.mode === 'buyer' && st.view === 'feed') {
    updateGrid();
    $('#sortSel').value = st.sort; sortLbl();
  }
  if (st.mode === 'seller' && st.view === 'items') updateTable();
  if (st.view === 'chats') { var m = $('#msgs'); if (m) m.scrollTop = m.scrollHeight; }
  if (st.mode === 'seller' && st.view === 'overview' && st.first.kpi) {
    st.first.kpi = false;
    if (!REDUCED) $$('[data-count]').forEach(function (el) {
      var to = +el.dataset.count, t0 = performance.now();
      (function f(t) { var p = Math.min(1, (t - t0) / 900), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(to * e); if (p < 1) requestAnimationFrame(f); })(t0);
    });
  }
  if (st.mode === 'seller' && st.view === 'overview') st.first.chart = false;
}
main.addEventListener('click', function (e) {
  var t = e.target;
  var o = t.closest('[data-open]'); if (o) { openPanel(ITEMS.filter(function (x) { return x.id === +o.dataset.open; })[0], o); return; }
  var h = t.closest('[data-heart]'); if (h) { var id = h.dataset.heart; st.hearts[id] = !st.hearts[id]; h.setAttribute('aria-pressed', String(!!st.hearts[id])); return; }
  var c = t.closest('[data-cat]'); if (c) { st.cat = c.dataset.cat; updateGrid(); return; }
  if (t.closest('#introX')) { st.introOff = true; $('#intro').remove(); return; }
  if (t.closest('#goodBtn')) { st.good = !st.good; updateGrid(); return; }
  var cv = t.closest('[data-conv]'); if (cv) { st.chat[st.mode] = cv.dataset.conv; st.chatList = false; st.lastKey = ''; render(); return; }
  if (t.closest('#chatBack')) { st.chatList = true; render(); return; }
  if (t.closest('#tipX')) { st.tipOff = true; $('#tip').remove(); return; }
  if (t.closest('[data-logout]')) { toast('זה דמו, אין התנתקות אמיתית'); return; }
  var rq = t.closest('[data-req]'); if (rq) { openChat(ITEMS.filter(function (x) { return x.id === +rq.dataset.req; })[0]); return; }
  var r = t.closest('[data-reach]'); if (r) { toast('דמו: ההודעה תישלח לקונה'); return; }
  var s = t.closest('[data-sort]'); if (s) { var c2 = s.dataset.sort; if (st.sortCol === c2) st.sortDir = -st.sortDir; else { st.sortCol = c2; st.sortDir = 1; } var f = c2; render(); var nb = $('[data-sort="' + f + '"]'); if (nb) nb.focus(); return; }
  var ed = t.closest('[data-edit]'); if (ed) { toast('דמו: מסך העריכה מחוץ לדמו'); return; }
  var tg = t.closest('[data-toggle]'); if (tg) { var m = MINE.filter(function (x) { return x.id === +tg.dataset.toggle; })[0]; m.st = m.st === 'active' ? 'paused' : 'active'; updateTable(); var again = $('[data-toggle="' + m.id + '"]'); if (again) again.focus(); return; }
  var bk = t.closest('[data-bulk]'); if (bk) {
    var k = bk.dataset.bulk;
    if (k !== 'clear') { var n = 0; MINE.forEach(function (m) { if (st.sel[m.id]) { m.st = k; n++; } }); toast(k === 'sold' ? 'דמו: ' + n + ' פריטים סומנו כנמכרו' : 'דמו: ' + n + ' פריטים הושהו'); }
    st.sel = {}; updateTable(); return;
  }
});
main.addEventListener('change', function (e) {
  var t = e.target;
  if (t.id === 'sortSel') { st.sort = t.value; sortLbl(); updateGrid(); }
  if (t.id === 'selAll') { st.sel = {}; if (t.checked) MINE.forEach(function (m) { st.sel[m.id] = true; }); updateTable(); }
  if (t.dataset && t.dataset.sel) { if (t.checked) st.sel[t.dataset.sel] = true; else delete st.sel[t.dataset.sel]; updateTable(); var again = $('[data-sel="' + t.dataset.sel + '"]'); if (again) again.focus(); }
});
main.addEventListener('submit', function (e) {
  if (e.target.id !== 'composer') return;
  e.preventDefault();
  var inp = $('#msgIn'), v = inp.value.trim(); if (!v) return;
  var cur = CHATS[st.mode].filter(function (c) { return c.id === st.chat[st.mode]; })[0];
  var d = new Date(), h = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  var msg = { f: 'me', t: v, h: h }; cur.msgs.push(msg);
  $('#msgs').insertAdjacentHTML('beforeend', bubble(msg, 0, null, true));
  inp.value = ''; var box = $('#msgs'); box.scrollTop = box.scrollHeight;
  var last = $('[data-conv="' + cur.id + '"] .last'); if (last) last.textContent = v;
});
$('#q').addEventListener('input', function (e) {
  st.q = e.target.value;
  if (st.mode === 'buyer' && st.view === 'feed') updateGrid();
  if (st.mode === 'seller' && st.view === 'items') updateTable();
});

/* ---------- detail panel ---------- */
var panel = $('#panel'), backdrop = $('#backdrop'), curItem = null, opener = null;
$('#pClose').innerHTML = ic('close');
function openPanel(it, from) {
  curItem = it; opener = from; var s = S[it.s], v = it.v;
  $('#pVisual').innerHTML = art(it.kind); $('#pVisual').setAttribute('aria-label', 'איור סכמטי של ' + it.title + ', תחליף לתמונת המוכר');
  $('#pTitle').textContent = it.title;
  $('#pPrice').textContent = fmt(it.price) + ' ₪';
  $('#pPer').innerHTML = money(it.pg) + ' לגרם';
  $('#pSpecs').innerHTML = [['קראט', '<span class="num">' + it.k + 'K</span>'], ['משקל', it.g + ' גרם'], [it.kind === 'ring' ? 'מידה' : 'אורך', it.len.replace('מידה ', '')], ['מצב', it.cond]].map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + x[1] + '</dd></div>'; }).join('');
  $('#pVerdict').dataset.tone = v.tone; $('#pVTitle').textContent = v.title; $('#pVDetail').innerHTML = v.html;
  $('#pVImg').src = 'img/' + v.level + '.png';
  $('#pGold').textContent = fmt(it.gold) + ' ₪';
  $('#pGoldWhy').innerHTML = it.price > it.gold
    ? 'ההפרש, <span class="num">' + fmt(it.price - it.gold) + ' ₪</span>, הוא עבודה, עיצוב ורווח המוכר. שוקי בודק שהוא סביר לעומת תכשיטים דומים.'
    : 'המחיר נמוך משווי הזהב בתכשיט. כדאי לבדוק חותמת ומשקל לפני שקונים.';
  $('#pGoldNote').innerHTML = 'לפי <span class="num">' + GOLD + ' ₪</span> לגרם זהב 24K';
  $('#pSeller').innerHTML = '<span class="avatar" aria-hidden="true">' + s.name.charAt(0) + '</span><div><b>' + s.name + '</b><span class="sub">' + s.city + ' · ' + s.rating + ' ★ · ' + s.deals + ' עסקאות</span></div><span class="kind kind--' + s.kind + '">' + (s.kind === 'shop' ? 'חנות' : 'פרטי') + '</span>';
  var wb = $('#pWant'); wb.textContent = st.wanted[it.id] ? 'הבקשה נשלחה' : 'רוצה';
  hideSheet(true);
  $('.panel__scroll').scrollTop = 0;
  backdrop.hidden = false; panel.removeAttribute('inert');
  void backdrop.offsetWidth;
  backdrop.classList.add('is-open'); panel.classList.add('is-open');
  setTimeout(function () { $('#pClose').focus(); }, 30);
}
function closePanel() {
  if (!panel.classList.contains('is-open')) return;
  hideSheet(true);
  panel.classList.remove('is-open'); backdrop.classList.remove('is-open'); panel.setAttribute('inert', '');
  setTimeout(function () { if (!backdrop.classList.contains('is-open')) backdrop.hidden = true; }, 400);
  if (opener && document.contains(opener)) opener.focus();
}
backdrop.addEventListener('click', closePanel);
$('#pClose').addEventListener('click', closePanel);
$('#pSkip').addEventListener('click', function () { st.hidden[curItem.id] = true; closePanel(); toast('דמו: הפריט הוסתר מהפיד'); opener = null; if ($('#grid')) updateGrid(); });
var sheet = $('#wantSheet'), scrim = $('#wantScrim');
function showSheet() {
  var s = S[curItem.s];
  $('#wTitle').textContent = 'הבקשה נשלחה ל' + s.name;
  sheet.removeAttribute('inert'); sheet.classList.add('is-on'); scrim.classList.add('is-on');
  ['.panel__scroll', '.panel__foot', '.panel__bar'].forEach(function (q) { $(q, panel).setAttribute('inert', ''); });
  setTimeout(function () { $('#wTitle').focus(); }, 30);
}
function hideSheet(quiet) {
  if (!sheet.classList.contains('is-on')) return;
  sheet.classList.remove('is-on'); scrim.classList.remove('is-on'); sheet.setAttribute('inert', '');
  ['.panel__scroll', '.panel__foot', '.panel__bar'].forEach(function (q) { $(q, panel).removeAttribute('inert'); });
  if (!quiet) $('#pWant').focus();
}
$('#pWant').addEventListener('click', function () { st.wanted[curItem.id] = true; this.textContent = 'הבקשה נשלחה'; showSheet(); });
scrim.addEventListener('click', function () { hideSheet(); });
$('#wMore').addEventListener('click', function () { closePanel(); });
function openChat(it) {
  var s = S[it.s], id = 'w' + it.id;
  var c = CHATS.buyer.filter(function (x) { return x.id === id; })[0];
  if (!c) {
    c = { id: id, name: s.name, role: (s.kind === 'shop' ? 'חנות' : 'מוכר פרטי') + ' · ' + s.rating + ' · ' + s.deals + ' עסקאות', item: it.id, time: 'עכשיו', unread: 0, msgs: [{ f: 'sys', t: 'ביקשת לקנות. מחכים לאישור המוכר.', h: '' }] };
    CHATS.buyer.unshift(c);
  }
  st.chat.buyer = id; st.chatList = false; st.lastKey = '';
  opener = null; closePanel();
  if (location.hash === '#buyer/chats') render(); else location.hash = '#buyer/chats';
}
$('#wChat').addEventListener('click', function () { openChat(curItem); });
document.addEventListener('keydown', function (e) {
  if (!panel.classList.contains('is-open')) return;
  if (e.key === 'Escape') { if (sheet.classList.contains('is-on')) hideSheet(); else closePanel(); return; }
  if (e.key === 'Tab') {
    var f = $$('button, [href], input, select', sheet.classList.contains('is-on') ? sheet : panel).filter(function (x) { return !x.disabled && x.offsetParent !== null; });
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

window.addEventListener('hashchange', function () { closePanel(); st.chatList = false; st.q = ''; $('#q').value = ''; st.sel = {}; render(); window.scrollTo(0, 0); });
render();
})();
