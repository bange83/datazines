#!/usr/bin/env python3
"""Quartz nested notes emit ../.././../assets/. Flatten to ../../assets/."""
from pathlib import Path

root = Path(__file__).resolve().parent / "public"
n = 0
for p in root.rglob("*.html"):
    t = p.read_text(encoding="utf-8")
    nt = t.replace("../.././../assets/", "../../assets/").replace(".././../assets/", "../assets/")
    if nt != t:
        p.write_text(nt, encoding="utf-8")
        n += 1
print(f"fixed asset paths in {n} html files")

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
