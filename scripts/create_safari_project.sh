#!/usr/bin/env bash
set -euo pipefail

EXT_DIR="${1:-extension}"
APP_NAME="${2:-MailtoToGmail}"
BUNDLE_ID="${3:-com.philippkanter.mailtotogmail}"

if ! command -v xcrun >/dev/null 2>&1; then
  echo "xcrun wurde nicht gefunden. Installiere Xcode + Command Line Tools." >&2
  exit 1
fi

if ! xcrun --find safari-web-extension-converter >/dev/null 2>&1; then
  echo "safari-web-extension-converter wurde nicht gefunden. Stelle sicher, dass Xcode installiert ist." >&2
  exit 1
fi

xcrun safari-web-extension-converter "$EXT_DIR" \
  --project-location . \
  --app-name "$APP_NAME" \
  --bundle-identifier "$BUNDLE_ID" \
  --macos-only

echo "\nFertig. Öffne das erzeugte Xcode-Projekt, wähle das macOS-Target und starte es einmal (Run)."
