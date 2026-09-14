#!/usr/bin/env python3
"""Quartz nested notes emit ../.././../assets/. Flatten to ../../assets/."""
from pathlib import Path
import shutil

root = Path(__file__).resolve().parent / "public"
n = 0
for p in root.rglob("*.html"):
    t = p.read_text(encoding="utf-8")
    nt = t.replace("../.././../assets/", "../../assets/").replace(".././../assets/", "../assets/")
    if nt != t:
        p.write_text(nt, encoding="utf-8")
        n += 1
print(f"fixed asset paths in {n} html files")

# GitHub Pages serves extensionless links only when the matching directory
# contains an index.html. Quartz emits leaf pages as `name.html`, so keep the
# original file and add the clean route beside it.
routes = 0
for page in root.rglob("*.html"):
    if page.name == "index.html" or page.name == "404.html":
        continue
    route = page.parent / page.stem / "index.html"
    route.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(page, route)
    routes += 1
print(f"added {routes} clean page routes")

fonts = root / "static" / "fonts" / "quartz-fonts.css"
if fonts.exists():
    t = fonts.read_text(encoding="utf-8")
    nt = t.replace("https://datazines.com/static/fonts/", "./")
    if nt != t:
        fonts.write_text(nt, encoding="utf-8")
        print("rewrote font urls to relative paths")

door = root / "00-how-to-read-this.html"
idx = root / "index.html"
if door.exists():
    idx.write_text(door.read_text(encoding="utf-8"), encoding="utf-8")
    print("copied 00-how-to-read-this.html → index.html")
