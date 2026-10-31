#!/usr/bin/env python3
"""Builds out/light and out/dark from src/. Each folder is self-contained."""
import pathlib, shutil
ROOT = pathlib.Path(__file__).resolve().parent
SRC, OUT = ROOT / "src", ROOT / "out"
tpl = (SRC / "index.html").read_text(encoding="utf-8")
css = (SRC / "style.css").read_text(encoding="utf-8") + "\n" + (SRC / "shuki.css").read_text(encoding="utf-8")
js = (SRC / "app.js").read_text(encoding="utf-8")
shuki = (SRC / "shuki.svg.html").read_text(encoding="utf-8")
if OUT.exists():
    shutil.rmtree(OUT)
for theme in ("light", "dark"):
    d = OUT / theme
    d.mkdir(parents=True)
    html = (tpl.replace("{{THEME}}", theme).replace("{{CSS}}", css)
               .replace("{{JS}}", js).replace("{{SHUKI}}", shuki))
    (d / "index.html").write_text(html, encoding="utf-8")
    shutil.copytree(ROOT / "fonts", d / "fonts")
    shutil.copytree(ROOT / "img", d / "img")
    shutil.copy(ROOT / "favicon.png", d / "favicon.png")
    print(theme, sum(p.stat().st_size for p in d.rglob("*") if p.is_file()) // 1024, "KB")
