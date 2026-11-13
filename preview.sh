#!/usr/bin/env bash
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
QUARTZ_DIR="$REPO_ROOT/.quartz"
PORT="${1:-8085}"

if [ ! -d "$QUARTZ_DIR/node_modules" ]; then
  echo "📦 Installing Quartz dependencies first..."
  cd "$QUARTZ_DIR" && npm ci
fi

echo "🎨 Copying press files into Quartz..."
rm -rf "$QUARTZ_DIR/quartz/.quartz-cache" \
       "$QUARTZ_DIR/public"

rm -f "$QUARTZ_DIR/quartz.config.yaml" \
      "$QUARTZ_DIR/quartz/styles/custom.scss" \
      "$QUARTZ_DIR/quartz/styles/variables.scss" \
      "$QUARTZ_DIR/quartz/components/Head.tsx" \
      "$QUARTZ_DIR/quartz/plugins/emitters/componentResources.ts" \
      "$QUARTZ_DIR/fix-asset-paths.py"

cp "$REPO_ROOT/press/quartz.config.yaml" "$QUARTZ_DIR/quartz.config.yaml"
cp "$REPO_ROOT/press/quartz/styles/custom.scss" "$QUARTZ_DIR/quartz/styles/custom.scss"
cp "$REPO_ROOT/press/quartz/styles/variables.scss" "$QUARTZ_DIR/quartz/styles/variables.scss"
cp "$REPO_ROOT/press/quartz/components/Head.tsx" "$QUARTZ_DIR/quartz/components/Head.tsx"
cp "$REPO_ROOT/press/quartz/plugins/emitters/componentResources.ts" "$QUARTZ_DIR/quartz/plugins/emitters/componentResources.ts"
cp "$REPO_ROOT/press/fix-asset-paths.py" "$QUARTZ_DIR/fix-asset-paths.py"

rm -rf "$QUARTZ_DIR/content"
mkdir -p "$QUARTZ_DIR/content"

for item in "$REPO_ROOT"/*; do
  name="$(basename "$item")"
  case "$name" in
    .*|press|scripts|html|quartz-press|AGENTS.md|PATH.md|PUBLISH.md|README.md|preview.sh)
      ;;
    *)
      ln -s "$item" "$QUARTZ_DIR/content/$name"
      ;;
  esac
done

# Ensure root route / serves 00 how to read this
ln -sf "$REPO_ROOT/00 how to read this.md" "$QUARTZ_DIR/content/index.md"

echo "🚀 Starting Quartz preview server on port $PORT..."
echo "👉 Open http://localhost:$PORT in your browser"
echo "   (Press Ctrl+C to stop)"
cd "$QUARTZ_DIR"
npx quartz build --serve --port "$PORT"
