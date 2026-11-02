(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---- גלילה: פס הניווט מתחבא למטה ומופיע למעלה, והטלפון בפתיחה עולה עם הגלילה
  const nav = $('#nav'), stage = $('#stage');
  let lastY = scrollY, ticking = false;
  function onScroll() {
    const y = scrollY;
    nav.classList.toggle('is-hidden', y > 300 && y > lastY && !$('.bloom').classList.contains('is-open') && !nav.matches(':focus-within'));
    lastY = y;
    if (!still.matches) {
      const p = Math.min(1, 0.2 + Math.max(0, y) / (innerHeight * 0.7) * 0.8);
      stage.style.setProperty('--p', p.toFixed(3));
    }
    ticking = false;
  }
  nav.addEventListener('focusin', () => nav.classList.remove('is-hidden'));
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // ---- תוכן שעולה כשמגיעים אליו
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('.rv, .rv-scale').forEach((el) => io.observe(el));

  // ---- שוקי: אותם כללים כמו באפליקציה (balloon.ts + verdict.ts)
  const AVG = 410, GRAMS = 10.2;
  const ils = (n) => Math.round(n).toLocaleString('en-US') + ' ₪';
  const shuki = $('.shuki'), range = $('#range'), verdict = $('#verdict');
  function judge(p) {
    const diff = p / GRAMS / AVG - 1, pct = Math.round(Math.abs(diff) * 100);
    if (diff < -0.05) return { level: 'great', tone: 'great', title: 'מחיר טוב', detail: pct + '% מתחת לממוצע' };
    if (diff <= 0.05) return { level: 'fair', tone: 'fair', title: 'מחיר הוגן', detail: 'בממוצע השבוע' };
    const extra = Math.max(10, Math.round((p - AVG * GRAMS) / 10) * 10), more = ils(extra) + ' מעל הממוצע';
    if (extra < 100) return { level: 'high1', tone: 'high', title: 'קצת מעל הממוצע', detail: more };
    if (extra < 1000) return { level: 'high2', tone: 'high', title: 'יקר מהממוצע', detail: more };
    return { level: 'high3', tone: 'high', title: 'יקר בהרבה', detail: more };
  }
  let level = null, rt;
  function react() {
    shuki.classList.remove('react'); void shuki.getBBox(); shuki.classList.add('react');
    clearTimeout(rt); rt = setTimeout(() => shuki.classList.remove('react'), 1600);
    verdict.classList.add('pop'); setTimeout(() => verdict.classList.remove('pop'), 220);
  }
  function show(p) {
    const v = judge(p);
    $('#price').textContent = ils(p); $('#per').textContent = ils(p / GRAMS);
    if ($('#v-title').textContent !== v.title) $('#v-title').textContent = v.title;
    if ($('#v-detail').textContent !== v.detail) $('#v-detail').textContent = v.detail;
    range.setAttribute('aria-valuetext', ils(p) + ', ' + v.title);
    if (v.level !== level) { level = v.level; shuki.dataset.level = level; verdict.dataset.tone = v.tone; shuki.setAttribute('aria-label', 'שוקי: ' + v.title); react(); }
  }
  let demo = true;
  range.addEventListener('input', () => show(+range.value));
  ['pointerdown', 'keydown', 'touchstart', 'focus'].forEach((t) => range.addEventListener(t, () => { demo = false; }, { passive: true }));
  show(+range.value);

  // כשמגיעים לשוקי בפעם הראשונה: הוא מדגים לבד את כל התגובות, עד שנוגעים במחוון
  function glide(to, ms) {
    return new Promise((res) => {
      const from = +range.value, t0 = performance.now();
      const step = (t) => {
        if (!demo) return res();
        const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3);
        range.value = Math.round((from + (to - from) * e) / 10) * 10; show(+range.value);
        k < 1 ? requestAnimationFrame(step) : res();
      };
      requestAnimationFrame(step);
    });
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function play() {
    for (const p of [4260, 4560, 5350, 3950]) { if (!demo) return; await glide(p, 450); await wait(700); }
    demo = false;
  }
  if (!still.matches) {
    const jo = new IntersectionObserver((es) => { if (es[0].isIntersecting) { jo.disconnect(); setTimeout(play, 900); } }, { threshold: 0.55 });
    jo.observe($('.judge__grid'));
  } else demo = false;

  // ---- הסיפור: הטלפון נשאר במקום והמסך מתחלף לפי השלב
  const shots = $$('#pin-screen img'), steps = $$('.step'), heads = steps.map((s) => s.querySelector('h3'));
  let cur = -1, sTick = false;
  function syncStory() {
    sTick = false;
    // השלב הפעיל = זה שהכותרת שלו הכי קרובה לאמצע המסך, בדיוק איפה שהטלפון עומד
    const mid = innerHeight / 2; let best = 0, bestD = Infinity;
    heads.forEach((h, i) => { const r = h.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mid); if (d < bestD) { bestD = d; best = i; } });
    if (best === cur) return; cur = best;
    steps.forEach((s, i) => s.classList.toggle('on', i === best));
    const shot = +steps[best].dataset.shot; shots.forEach((im, j) => im.classList.toggle('on', j === shot));
  }
  addEventListener('scroll', () => { if (!sTick) { sTick = true; requestAnimationFrame(syncStory); } }, { passive: true });
  addEventListener('resize', syncStory);
  syncStory();

  // (הספירה לאחור למבצע הוסרה 2.11.2026: לקונים זה חינם, תמיד)

  // ---- התפריט: הכפתור נפתח לפאנל, והפריטים נכנסים מהמרכז החוצה
  const bloom = $('[data-bloom]'), trig = $('.bloom__trigger', bloom), panel = $('.bloom__panel', bloom), closeBtn = $('.bloom__close', bloom);
  const links = $$('.bloom__grid a', panel), COLS = 3;
  let open = false, anim = null;
  const startClip = () => {
    const p = panel.getBoundingClientRect(), b = trig.getBoundingClientRect();
    return `inset(${b.top - p.top}px ${p.right - b.right}px ${p.bottom - b.bottom}px ${b.left - p.left}px round 22px)`;
  };
  function setOpen(next, focusBack = true) {
    if (next === open) return; open = next; trig.setAttribute('aria-expanded', open); anim && anim.cancel();
    if (open) {
      panel.hidden = false; bloom.classList.add('is-open');
      if (!still.matches) {
        anim = panel.animate([{ clipPath: startClip() }, { clipPath: 'inset(0px 0px 0px 0px round 26px)' }], { duration: 420, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' });
        const rows = Math.ceil(links.length / COLS), cx = (COLS - 1) / 2, cy = (rows - 1) / 2;
        links.forEach((a, i) => {
          const d = Math.hypot((i % COLS) - cx, Math.floor(i / COLS) - cy);
          a.animate([{ opacity: 0, transform: 'scale(0.85)' }, { opacity: 1, transform: 'none' }], { duration: 320, delay: 100 + d * 60, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)', fill: 'backwards' });
        });
      }
      requestAnimationFrame(() => links[0].focus({ preventScroll: true }));
    } else {
      const done = () => { panel.hidden = true; bloom.classList.remove('is-open'); if (focusBack) trig.focus({ preventScroll: true }); };
      if (still.matches) done();
      else { anim = panel.animate([{ clipPath: 'inset(0px 0px 0px 0px round 26px)' }, { clipPath: startClip() }], { duration: 220, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' }); anim.onfinish = done; }
    }
  }
  trig.addEventListener('click', () => setOpen(true));
  closeBtn.addEventListener('click', () => setOpen(false));
  const focusables = () => [closeBtn, ...links];
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const f = focusables(), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  links.forEach((a, i) => {
    a.addEventListener('click', () => { setOpen(false, false); const t = document.querySelector(a.getAttribute('href')); if (t) setTimeout(() => t.focus({ preventScroll: true }), 50); });
    a.addEventListener('keydown', (e) => {
      const step = { ArrowLeft: 1, ArrowRight: -1, ArrowDown: COLS, ArrowUp: -COLS }[e.key];
      const j = step !== undefined ? i + step : e.key === 'Home' ? 0 : e.key === 'End' ? links.length - 1 : null;
      if (j === null) return; e.preventDefault(); links[Math.max(0, Math.min(links.length - 1, j))].focus();
    });
  });
  document.addEventListener('keydown', (e) => { if (open && e.key === 'Escape') setOpen(false); });
  document.addEventListener('pointerdown', (e) => { if (open && !panel.contains(e.target)) setOpen(false, false); });
})();
