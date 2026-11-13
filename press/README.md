# Press overlays

Quartz lives beside the vault (`/Volumes/Samsung990/git/quartz-press` on this machine). These files are the **datazines look** copied onto a stock Quartz 5 clone at build time.

Do not commit generated HTML. GitHub Actions clones Quartz, copies this folder over, points `content/` at the vault, builds, then `fix-asset-paths.py` flattens nested SVG paths and copies `00-how-to-read-this.html` → `index.html`.
