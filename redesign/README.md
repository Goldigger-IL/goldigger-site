# האתר החדש של גולדיגר (טיוטה)

לא באוויר. GitHub Pages מגיש רק את main, והענף הזה לא נכנס לשם עד שמחליטים להחליף.

- `src.html`: הדף. `<!--SHUKI-->` מוחלף בציור מ-`shuki.svg.html` (העתק של components/Shuki.tsx מהאפליקציה, עם ידיים ופנים נפרדים לאנימציה).
- `style.css`, `app.js`: עיצוב ותנועה, בלי ספריות.
- `python3 build.py` בונה שתי גרסאות ל-`out/`:
  - `out/shops`: עם קישור להורדה דרך TestFlight (הגרסה שנבחרה, 31.10.2026).
  - `out/store`: "בקרוב באפ סטור", בלי קישור.
- שוקי בדף משתמש באותם כללים כמו באפליקציה (balloon.ts ו-verdict.ts): ±5% זה הוגן, ומעל הממוצע נמדד בשקלים (100 ו-1,000).
- תצוגות: https://claude.ai/artifact/YRmWhbBBcBmV3e4mvD7kqA (TestFlight), https://claude.ai/artifact/V4QDU58V3R5DEtawobu4Wc (בלי).
