import os, shutil
TF='https://testflight.apple.com/join/HDmFeXHV'
src=open('src.html').read().replace('<!--SHUKI-->',open('shuki.svg.html').read())
def write(d,s):
    os.makedirs(d,exist_ok=True); open(f'{d}/index.html','w').write(s)
write('out/store',src)
t=src
rep=[
 ('<a class="btn btn--gold" href="#offer">שנה חינם</a>', f'<a class="btn btn--gold" href="{TF}">להורדה</a>'),
 ('<span class="tag rv"><b aria-hidden="true"></b>בקרוב באפ סטור, לאייפון</span>', f'<a class="tag tag--link rv" href="{TF}"><b aria-hidden="true"></b>גרסת הבטא פתוחה עכשיו, לאייפון</a>'),
 ('<a class="btn btn--gold" href="#offer">מצטרפים חינם לשנה</a>', f'<a class="btn btn--gold" href="{TF}">להורדה דרך TestFlight</a>'),
 ('<div><span class="btn btn--gold rv" style="--d:240ms">בקרוב באפ סטור</span></div>', f'<div><a class="btn btn--gold rv" style="--d:240ms" href="{TF}">להורדה דרך TestFlight</a></div>'),
 ('<p class="sub rv" style="--d:160ms">רשימה של מה שקונים חיפשו ולא מצאו, לפי סוג תכשיט. יש לכם? פונים אליהם בצ׳אט.</p>\n      <a class="btn btn--ink rv" style="--d:220ms" href="mailto:didishalman@gmail.com?subject=%D7%97%D7%A0%D7%95%D7%AA%20%D7%91%D7%92%D7%95%D7%9C%D7%93%D7%99%D7%92%D7%A8">דברו איתנו</a>',
  f'<p class="sub rv" style="--d:160ms">רשימה של מה שקונים חיפשו ולא מצאו, לפי סוג תכשיט. יש לכם? פונים אליהם בצ׳אט.</p>\n      <ol class="howto rv" style="--d:200ms"><li>מתקינים את TestFlight מהאפ סטור</li><li>לוחצים על הכפתור ומתקינים את גולדיגר</li><li>נרשמים כחנות ומעלים את התכשיטים</li></ol>\n      <a class="btn btn--ink rv" style="--d:240ms" href="{TF}">להורדה דרך TestFlight</a>'),
 ('<li><a href="#shops"><b>לחנויות</b><span>הצטרפות</span></a></li>', f'<li><a href="#shops"><b>לחנויות</b><span>איך מצטרפים</span></a></li>'),
]
for a,b in rep:
    assert a in t, a[:60]; t=t.replace(a,b)
write('out/shops',t)
for d in ['out/store','out/shops']:
    for f in ['style.css','app.js','favicon.png']: shutil.copy(f,d)
    for sub in ['fonts','img']:
        shutil.rmtree(f'{d}/{sub}',ignore_errors=True); shutil.copytree(sub,f'{d}/{sub}')
print('ok')
