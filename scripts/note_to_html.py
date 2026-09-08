#!/usr/bin/env python3
"""Turn one sketchbook note into a paper-and-ink HTML leaf.

Prototype of the datazines.com zine. Drawings stay live SVG (never bitmaps).
Math stays LaTeX; MathJax renders it in the browser.

    python3 scripts/note_to_html.py "supervised learning/regression/01 linear regression.md"
    python3 scripts/note_to_html.py --all

Writes html/<same folders as the note>.html. Images climb to vault assets/.
Wikilinks become hrefs to other leaves. Writer maps (PATH, AGENTS, HANDOFF)
stay unlinked spans. --all also writes html/index.html (folder nav; zine in a
borderless frame so file:// works — no server).
"""

from __future__ import annotations

import argparse
import html as html_lib
import os
import re
import sys
from functools import lru_cache
from pathlib import Path
from urllib.parse import quote

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
a.wiki {
  color: var(--blue);
  border-bottom: 1px dotted var(--blue);
  text-decoration: none;
}
a.wiki:hover { border-bottom-style: solid; }
span.wiki { color: var(--blue); border-bottom: 1px dotted var(--blue); }
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


SKIP_STEMS = {
    "AGENTS",
    "PATH",
    "HANDOFF",
    "README",
    "Copilot Feedback",
}

HTML_ROOT = ROOT / "html"


def strip_yaml(text: str) -> str:
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            return text[end + 4 :].lstrip("\n")
    return text


def _aliases(raw: str) -> list[str]:
    if not raw.startswith("---"):
        return []
    end = raw.find("\n---", 3)
    if end == -1:
        return []
    block = raw[3:end]
    names: list[str] = []
    in_aliases = False
    for line in block.splitlines():
        if re.match(r"^aliases:\s*$", line):
            in_aliases = True
            continue
        if in_aliases:
            m = re.match(r"^\s+-\s+(.+)$", line)
            if m:
                names.append(m.group(1).strip().strip("'\""))
                continue
            in_aliases = False
    return names


def is_sketchbook(path: Path) -> bool:
    if path.suffix != ".md":
        return False
    if any(part.startswith(".") for part in path.parts):
        return False
    if "html" in path.parts:
        return False
    if path.stem in SKIP_STEMS:
        return False
    return True


def html_dest_for(note: Path) -> Path:
    return (HTML_ROOT / note.relative_to(ROOT)).with_suffix(".html")


def assets_href(dest: Path) -> str:
    depth = len(dest.relative_to(HTML_ROOT).parts)
    return "../" * depth + "assets/"


@lru_cache(maxsize=1)
def wiki_catalog() -> dict[str, Path]:
    """Obsidian name / alias / stem → path under html/."""
    cat: dict[str, Path] = {}
    for path in ROOT.rglob("*.md"):
        if not is_sketchbook(path):
            continue
        rel = html_dest_for(path).relative_to(HTML_ROOT)
        keys = {path.stem, path.name}
        keys.update(_aliases(path.read_text(encoding="utf-8")))
        for k in keys:
            cat[k] = rel
            cat[k.lower()] = rel
    return cat


def wiki_href(target: str, dest: Path) -> str | None:
    t = target.strip()
    if t.endswith(".md"):
        t = t[:-3]
    cat = wiki_catalog()
    rel = cat.get(t) or cat.get(t.lower())
    if not rel:
        return None
    from_dir = dest.relative_to(HTML_ROOT).parent
    href = Path(os.path.relpath(rel, from_dir if str(from_dir) != "." else "."))
    return quote(href.as_posix(), safe="/.")


def inline_md(s: str) -> str:
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"\*(.+?)\*", r"<em>\1</em>", s)
    return s.replace("\n", "<br>\n")


def preprocess(md: str, dest: Path) -> str:
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

    def wiki(m: re.Match) -> str:
        inner = m.group(1)
        target, _, label = inner.partition("|")
        target = target.split("#")[0].strip()
        if not re.search(r"[A-Za-z]", target):
            return m.group(0)
        display = (label or target).strip()
        href = wiki_href(target, dest)
        text = html_lib.escape(display)
        if href:
            return f'<a class="wiki" href="{href}">{text}</a>'
        return f'<span class="wiki">{text}</span>'

    md = re.sub(r"!?\[\[([^\]]+)\]\]", wiki, md)

    prefix = assets_href(dest)

    def img(m: re.Match) -> str:
        alt, src = m.group(1), m.group(2)
        name = Path(src).name
        return (
            f'\n<figure class="drawing">'
            f'<img src="{prefix}{html_lib.escape(name)}" alt="{html_lib.escape(alt)}">'
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
    md = preprocess(raw, dest)
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


def sketchbooks() -> list[Path]:
    return sorted(p for p in ROOT.rglob("*.md") if is_sketchbook(p))


SHELF_ORDER = [
    "",
    "supervised learning/regression",
    "supervised learning/classification",
    "supervised learning/ensembles",
    "fundamentals",
    "optimization",
    "probability",
    "neural nets",
    "inference",
    "causal",
    "time series",
    "unsupervised",
    "bayes",
    "rl",
]


INDEX_CSS = r"""
:root {
  --paper: #f4efe4;
  --desk: #d9d0c0;
  --ink: #241c14;
  --rust: #b44a28;
  --blue: #3d5f86;
  --muted: #7a6e5e;
  --grain: #efe8d8;
}
* { box-sizing: border-box; }
html, body { margin: 0; height: 100%; background: var(--desk); color: var(--ink); }
body {
  font-family: Georgia, "Times New Roman", serif;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.mast {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  padding: 10px 22px 6px;
}
.mast .mark {
  height: 52px;
  width: auto;
  display: block;
}
.desk {
  flex: 1;
  min-height: 0;
  display: flex;
  overflow: hidden;
}
nav {
  width: 248px;
  flex: 0 0 248px;
  margin: 6px 0 18px 18px;
  padding: 14px 16px 28px;
  background: var(--paper);
  border-radius: 18px;
  box-shadow: 0 1px 0 rgba(36,28,20,.06), 0 10px 28px rgba(36,28,20,.08);
  border: 1px solid rgba(36,28,20,.06);
  overflow-y: auto;
}
nav h2 {
  font-family: "Bradley Hand", "Apple Chancery", "Segoe Script", "Comic Sans MS", cursive;
  font-size: 15px;
  font-weight: normal;
  color: var(--rust);
  margin: 16px 0 4px;
}
nav h3 {
  font-size: 12px;
  color: var(--muted);
  font-weight: normal;
  margin: 8px 0 2px 4px;
}
nav a {
  display: block;
  color: var(--blue);
  text-decoration: none;
  padding: 4px 8px;
  margin: 0 0 1px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.3;
}
nav a:hover { background: var(--grain); }
nav a.on { background: var(--grain); color: var(--rust); }
.stage {
  flex: 1;
  min-width: 0;
  margin: 18px 18px 18px 14px;
  background: var(--desk);
  border-radius: 18px;
  overflow: hidden;
}
iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: var(--desk);
}
@media (max-width: 720px) {
  .desk { flex-direction: column; overflow: auto; }
  nav { width: auto; flex: 0 0 auto; margin: 0 12px; max-height: 32vh; }
  .stage { margin: 12px; min-height: 50vh; }
}
"""


def write_index(notes: list[Path]) -> Path:
    """Folder nav + borderless frame. file:// works. No server."""
    by_shelf: dict[str, list[Path]] = {}
    for note in notes:
        rel = html_dest_for(note).relative_to(HTML_ROOT)
        shelf = str(rel.parent) if rel.parent != Path(".") else ""
        by_shelf.setdefault(shelf, []).append(note)

    extra = sorted(s for s in by_shelf if s not in SHELF_ORDER)
    order = [s for s in SHELF_ORDER if s in by_shelf] + extra

    chunks: list[str] = []
    last_wing = None
    for shelf in order:
        if shelf == "":
            chunks.append("<h2>front door</h2>")
        else:
            parts = Path(shelf).parts
            wing = parts[0]
            if wing != last_wing:
                chunks.append(f"<h2>{html_lib.escape(wing)}</h2>")
                last_wing = wing
            if len(parts) > 1:
                chunks.append(f"<h3>{html_lib.escape(parts[-1])}</h3>")
        for note in by_shelf[shelf]:
            rel = html_dest_for(note).relative_to(HTML_ROOT).as_posix()
            href = quote(rel, safe="/")
            label = note.stem
            if label.startswith("00 "):
                label = label[3:]
            chunks.append(
                f'<a href="{href}" data-src="{href}">{html_lib.escape(label)}</a>'
            )

    nav = "\n".join(chunks)
    door = quote("00 how to read this.html", safe="/")
    dest = HTML_ROOT / "index.html"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(
        f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>datazines</title>
<style>{INDEX_CSS}</style>
</head>
<body>
<header class="mast"><img class="mark" src="../assets/in-06-mark.svg" alt="datazines"></header>
<div class="desk">
<nav>{nav}</nav>
<div class="stage">
<iframe id="leaf" title="zine" src="{door}"></iframe>
</div>
</div>
<script>
const frame = document.getElementById("leaf");
const links = [...document.querySelectorAll("nav a[data-src]")];
const root = new URL(".", location.href);
function mark(src) {{
  const want = decodeURIComponent(src.replace(/^\\.\\//, ""));
  links.forEach(a => {{
    a.classList.toggle("on", decodeURIComponent(a.dataset.src) === want);
  }});
}}
function openLeaf(src, push) {{
  frame.src = src;
  mark(src);
  if (push) history.replaceState(null, "", "#" + encodeURIComponent(src));
}}
links.forEach(a => {{
  a.addEventListener("click", e => {{
    e.preventDefault();
    openLeaf(a.dataset.src, true);
  }});
}});
frame.addEventListener("load", () => {{
  try {{
    let rel = decodeURIComponent(frame.contentWindow.location.pathname.replace(root.pathname, ""));
    if (rel.startsWith("/")) rel = rel.slice(1);
    if (rel) {{
      mark(rel);
      history.replaceState(null, "", "#" + encodeURIComponent(rel));
    }}
  }} catch (err) {{}}
}});
const start = location.hash ? decodeURIComponent(location.hash.slice(1)) : "{door}";
openLeaf(start, false);
</script>
</body>
</html>
""",
        encoding="utf-8",
    )
    return dest


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("note", nargs="?", help="vault-relative path to a sketchbook .md")
    p.add_argument("--all", action="store_true", help="convert every sketchbook")
    p.add_argument(
        "--spine",
        default="datazines · a sketchbook",
        help="tiny line above the hero leaf",
    )
    args = p.parse_args()
    if args.all:
        notes = sketchbooks()
    elif args.note:
        notes = [(ROOT / args.note).resolve()]
        if not notes[0].is_file():
            sys.exit(f"missing note: {notes[0]}")
    else:
        sys.exit("pass a note path, or --all")
    for note in notes:
        dest = html_dest_for(note)
        convert(note, dest, args.spine)
        print(f"wrote {dest.relative_to(ROOT)}")
    if args.all:
        idx = write_index(notes)
        print(f"wrote {idx.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
