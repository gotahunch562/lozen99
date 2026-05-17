#!/usr/bin/env bash
set -euo pipefail

# Run from the repository root.
if [ ! -d "src" ] || [ ! -d "public" ]; then
  echo "ERROR: Run this script from the lozen99 repository root."
  exit 1
fi

echo "== Lozen Advisory download-link fix =="

# Keep the canonical public download folder singular: public/download
mkdir -p public/download

# If an old plural folder exists, move its contents safely into public/download.
if [ -d "public/downloads" ]; then
  echo "Found public/downloads. Moving files into public/download..."
  shopt -s nullglob
  for f in public/downloads/*; do
    base="$(basename "$f")"
    if [ -e "public/download/$base" ]; then
      echo "Keeping existing public/download/$base; removing duplicate public/downloads/$base"
      git rm -f "$f" >/dev/null 2>&1 || rm -f "$f"
    else
      git mv "$f" "public/download/$base" 2>/dev/null || mv "$f" "public/download/$base"
    fi
  done
  rmdir public/downloads 2>/dev/null || true
fi

# Replace known broken link patterns in source files.
FILES=$(grep -RIlE '/downloads/|performance-protection-conference-handout\.pdf' src public 2>/dev/null || true)
if [ -n "$FILES" ]; then
  echo "Updating broken download references..."
  printf '%s\n' "$FILES" | xargs perl -pi -e 's#/downloads/#/download/#g; s#performance-protection-conference-handout\.pdf#performance-protection-handout.pdf#g'
else
  echo "No broken /downloads/ or conference-handout references found."
fi

# Expected public download assets.
EXPECTED=(
  "public/download/Lozen_PowerUserTrap_Brief.pdf"
  "public/download/Lozen_Tacere_Brief.pdf"
  "public/download/performance-protection-handout.pdf"
  "public/download/symptom-literacy-checklist.pdf"
)

missing=0
echo "Checking expected download files..."
for path in "${EXPECTED[@]}"; do
  if [ -f "$path" ]; then
    echo "OK: $path"
  else
    echo "MISSING: $path"
    missing=1
  fi
done

echo "Checking for remaining old references..."
if grep -RInE '/downloads/|performance-protection-conference-handout\.pdf' src public 2>/dev/null; then
  echo "ERROR: Old references still exist. Review the grep output above."
  exit 1
else
  echo "OK: No old /downloads/ or conference-handout references remain."
fi

echo "Current download references:"
grep -RInE '/download/[^"\047 )>]+' src public 2>/dev/null || echo "No /download/ references found in src/public."

if [ "$missing" -ne 0 ]; then
  echo "WARNING: One or more expected PDF files are missing from public/download. Add the missing files before launch."
  exit 2
fi

echo "Download-link fix complete."
