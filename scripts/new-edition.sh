#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <eod|sunday|dossier> [slug]"
  exit 1
fi

KIND="$1"
SLUG="${2:-}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TPL_DIR="$ROOT_DIR/docs/templates"
OUT_DIR="$ROOT_DIR/drafts"
DATE="$(date +%F)"
TS="$(date +%H%M)"

mkdir -p "$OUT_DIR"

case "$KIND" in
  eod)
    TEMPLATE="$TPL_DIR/dispatch-eod-template.md"
    BASE="${DATE}-dispatch-eod"
    ;;
  sunday)
    TEMPLATE="$TPL_DIR/sunday-signal-template.md"
    BASE="${DATE}-sunday-signal"
    ;;
  dossier)
    TEMPLATE="$TPL_DIR/shadow-dossier-template.md"
    BASE="${DATE}-shadow-dossier"
    ;;
  *)
    echo "Unknown kind: $KIND"
    echo "Use one of: eod, sunday, dossier"
    exit 1
    ;;
esac

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Missing template: $TEMPLATE"
  exit 1
fi

if [[ -n "$SLUG" ]]; then
  SAFE_SLUG="$(echo "$SLUG" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"
  FILE="$OUT_DIR/${BASE}-${SAFE_SLUG}.md"
else
  FILE="$OUT_DIR/${BASE}-${TS}.md"
fi

cp "$TEMPLATE" "$FILE"
echo "Created: $FILE"
