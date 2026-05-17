#!/usr/bin/env bash
set -euo pipefail

if [ ! -f "src/pages/404.astro" ]; then
  echo "ERROR: src/pages/404.astro not found. No 404 link changes made." >&2
  exit 1
fi

perl -0pi -e 's#/what-we-do#/services#g' src/pages/404.astro

echo "Updated src/pages/404.astro: replaced /what-we-do with /services."

echo "Remaining /what-we-do hits in src/public:"
grep -R "/what-we-do" -n src public 2>/dev/null || true

echo "RSS replacement is included at src/pages/rss.xml.js."
