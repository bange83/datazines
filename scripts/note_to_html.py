#!/usr/bin/env python3
"""Turn one sketchbook note into a paper-and-ink HTML leaf.

Prototype of the datazines.com zine. Drawings stay live SVG (never bitmaps).
Math stays LaTeX; MathJax renders it in the browser.

    python3 scripts/note_to_html.py "supervised learning/regression/01 linear regression.md"

Writes html/<stem>.html. Images are ../assets/<file>.svg relative to that file.
"""

from __future__ import annotations

import argparse
import html as html_lib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

try:
    import markdown
except ImportError:
    sys.exit("pip install markdown")


CSS = r"""
:root {
  --paper: #f4efe4;
  --ink: #241c14;
  --rust: #b44a28;
  --blue: #3d5f86;
  --sage: #4f6d55;
  --gold: #c4a35a;
  --muted: #7a6e5e;
  --grain: #efe8d8;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #d9d0c0; color: var(--ink); }
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  line-height: 1.45;
}
.book {
  max-width: 820px;
  margin: 32px auto 64px;
  padding: 0 16px;
}
.leaf {
  background: var(--paper);
  border-radius: 18px;
  padding: 36px 44px 40px;
  margin: 0 0 22px;
  box-shadow: 0 1px 0 rgba(36,28,20,.06), 0 10px 28px rgba(36,28,20,.08);
  border: 1px solid rgba(36,28,20,.06);
}
.hero-leaf { padding-top: 28px; }
h1 {
  font-family: "Bradley Hand", "Apple Chancery", "Segoe Script", "Comic Sans MS", cursive;
  font-size: 34px;
  font-weight: normal;
  color: var(--rust);
  margin: 0 0 12px;
  line-height: 1.15;
}
h2 {
  font-family: "Bradley Hand", "Apple Chancery", "Segoe Script", "Comic Sans MS", cursive;
  font-size: 24px;
  font-weight: normal;
  color: var(--rust);
  margin: 0 0 14px;
}
h3 {
  font-size: 18px;
  color: var(--blue);
  margin: 18px 0 8px;
}
p { margin: 0 0 12px; }
blockquote {
  margin: 12px 0 16px;
  padding: 4px 0 4px 16px;
  border-left: 3px solid var(--rust);
  color: var(--muted);
  font-style: italic;
}
.callout {
  background: var(--grain);
  border-radius: 12px;
  padding: 14px 18px;
  margin: 12px 0 18px;
}
.callout-abstract { border-left: 4px solid var(--rust); }
.callout-tip { border-left: 4px solid var(--gold); }
.callout-note { border-left: 4px solid var(--blue); }
.callout strong { color: var(--rust); }
.drawing { margin: 16px 0 18px; text-align: center; }
.drawing img {
  width: 100%;
  max-width: 720px;
  height: auto;
  display: inline-block;
}
table {
  border-collapse: collapse;
  margin: 12px 0 18px;
  width: 100%;
  font-size: 16px;
}
th, td {
  border: 1px solid #c4b8a4;
  padding: 6px 10px;
  vertical-align: top;
  text-align: left;
}
th { background: var(--grain); color: var(--rust); }
ul, ol { margin: 6px 0 14px 22px; }
li { margin: 0 0 4px; }
code {
  font-family: Menlo, "Courier New", monospace;
  font-size: 0.86em;
  color: var(--sage);
}
pre {
  font-family: Menlo, "Courier New", monospace;
  font-size: 13.5px;
  line-height: 1.35;
  background: var(--grain);
  border-radius: 10px;
  padding: 14px 16px;
  overflow-x: auto;
  margin: 10px 0 16px;
}
pre code { color: var(--ink); }
.wiki { color: var(--blue); border-bottom: 1px dotted var(--blue); }
.spine {
  font-family: "Bradley Hand", "Apple Chancery", "Segoe Script", "Comic Sans MS", cursive;
  color: var(--muted);
  text-align: center;
  margin: 0 0 18px;
  font-size: 16px;
}
.colophon {
  text-align: center;
  color: var(--muted);
  font-style: italic;
  padding: 8px 0 24px;
  font-size: 15px;
}
@media print {
  body { background: white; }
  .book { max-width: none; margin: 0; padding: 0; }
  .leaf { box-shadow: none; break-after: page; margin: 0; border-radius: 0; border: none; }
}
"""


def strip_yaml(text: str) -> str:
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4 :].lstrip("\n")
    return text


def inline_md(s: str) -> str:
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\*(.+?)\*", r"<em>\1</em>", s)
    return s.replace("\n", "<br>\n")


def preprocess(md: str) -> str:
    fences: list[str] = []

    def stash(m: re.Match) -> str:
        fences.append(m.group(0))
        return f"\n§FENCE{len(fences) - 1}§\n"

    md = re.sub(r"```[\s\S]*?```", stash, md)

    def callout(m: re.Match) -> str:
        kind = m.group(1)
        body = re.sub(r"^>\s?", "", m.group(2), flags=re.M).strip()
        label = {"abstract": "In one sentence", "tip": "Margin", "note": "Note"}.get(
            kind, kind
        )
        return (
            f'<aside class="callout callout-{kind}">'
            f"<strong>{label}.</strong> {inline_md(body)}</aside>\n\n"
        )

    md = re.sub(
        r"^>\s*\[!(\w+)\][^\n]*\n((?:>.*\n?)*)",
        callout,
        md,
        flags=re.M,
    )

    # Wikilinks with a letter. Skip [[3]] inside later-unprotected text.
    md = re.sub(
        r"!?\[\[([^\]|#]*[A-Za-z][^\]|#]*)(?:\|[^\]]+)?\]\]",
        r'<span class="wiki">\1</span>',
        md,
    )

    def img(m: re.Match) -> str:
        alt, src = m.group(1), m.group(2)
        name = Path(src).name
        return (
            f'\n<figure class="drawing">'
            f'<img src="../assets/{name}" alt="{html_lib.escape(alt)}">'
            f"</figure>\n"
        )

    md = re.sub(r"!\[([^\]]*)\]\(([^)]+)\)", img, md)
    md = re.sub(r"\n---\n", "\n\n", md)

    for i, block in enumerate(fences):
        md = md.replace(f"§FENCE{i}§", block)
    return md


def to_leaves(inner: str) -> str:
    parts = re.split(r"(<h2>.*?</h2>)", inner, flags=re.S)
    out = [f'<section class="leaf hero-leaf">{parts[0]}</section>']
    for i in range(1, len(parts), 2):
        h = parts[i]
        body = parts[i + 1] if i + 1 < len(parts) else ""
        out.append(f'<section class="leaf">{h}{body}</section>')
    return "\n".join(out)


def convert(note: Path, dest: Path, spine: str) -> None:
    raw = strip_yaml(note.read_text(encoding="utf-8"))
    md = preprocess(raw)
    engine = markdown.Markdown(
        extensions=["tables", "fenced_code", "sane_lists", "nl2br"],
        output_format="html",
    )
    inner = engine.convert(md)
    title_m = re.search(r"<h1>(.*?)</h1>", inner, re.S)
    title = re.sub("<[^>]+>", "", title_m.group(1)).strip() if title_m else note.stem

    doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html_lib.escape(title)}</title>
<style>{CSS}</style>
<script>
window.MathJax = {{
  tex: {{
    inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
    displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']]
  }},
  options: {{ skipHtmlTags: ['script','noscript','style','textarea','pre','code'] }}
}};
</script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
</head>
<body>
<div class="book">
<p class="spine">{html_lib.escape(spine)}</p>
{to_leaves(inner)}
<p class="colophon">Flip it like a notebook. One page = one idea.</p>
</div>
</body>
</html>
"""
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(doc, encoding="utf-8")


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("note", help="vault-relative path to a sketchbook .md")
    p.add_argument(
        "--spine",
        default="datazines · a sketchbook",
        help="tiny line above the hero leaf",
    )
    args = p.parse_args()
    note = (ROOT / args.note).resolve()
    if not note.is_file():
        sys.exit(f"missing note: {note}")
    dest = ROOT / "html" / f"{note.stem}.html"
    convert(note, dest, args.spine)
    print(f"wrote {dest.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
