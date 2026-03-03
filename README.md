# Mailto to Gmail for Safari

Eine schlanke Safari Extension für alle, die in Safari auf `mailto:` klicken und sofort in Gmail landen wollen.  
Statt Apple Mail zu öffnen, startet direkt der Gmail-Compose-Dialog im Browser, inklusive vorausgefüllter Felder aus dem Link.

## Features

- Fängt `mailto:`-Links in Safari ab
- Öffnet Gmail Compose direkt im Browser
- Übernimmt `to`, `cc`, `bcc`, `subject`, `body`
- Kein Vendor-Lock: basiert auf Safari Web Extension + nativer Host-App

## Beispiel

Aus:

```html
mailto:max@example.com?subject=Hallo&body=Test
```

wird:

```html
https://mail.google.com/mail/u/0/?view=cm&fs=1&to=max@example.com&su=Hallo&body=Test
```

## Projektstruktur

- `extension/manifest.json`: Extension-Metadaten
- `extension/content.js`: erkennt Klicks auf `mailto:`
- `extension/background.js`: parst `mailto:` und baut Gmail-URL
- `scripts/create_safari_project.sh`: erzeugt Xcode-Projekt via Apple Converter

## Setup (komplett)

### 1) Xcode installieren

`safari-web-extension-converter` ist Teil von Xcode und kein separates Paket.

1. Xcode aus dem App Store installieren
2. Xcode einmal starten und initiales Setup abschließen
3. Developer-Ordner setzen:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

4. Lizenz + First-Launch-Komponenten bestätigen:

```bash
sudo xcodebuild -runFirstLaunch
```

5. Prüfen, ob der Converter verfügbar ist:

```bash
xcrun --find safari-web-extension-converter
```

### 2) Safari-Projekt erzeugen

Im Projektverzeichnis ausführen:

```bash
./scripts/create_safari_project.sh
```

Das erzeugt ein Xcode-Projekt unter `MailtoToGmail/`.

## Xcode + Safari: Klick-für-Klick

### 1) Projekt öffnen

`MailtoToGmail/MailtoToGmail.xcodeproj` in Xcode öffnen.

### 2) Signing konfigurieren

1. Links das blaue Projekt `MailtoToGmail` auswählen
2. Unter `TARGETS` zuerst `MailtoToGmail` öffnen
3. `Signing & Capabilities`:
   - `Automatically manage signing`: aktiv
   - `Team`: dein Team (z. B. Personal Team)
4. Unter `TARGETS` `MailtoToGmail Extension` öffnen
5. `Signing & Capabilities`:
   - `Automatically manage signing`: aktiv
   - `Team`: exakt dasselbe Team wie oben

### 3) Build und Start

1. Oben als Scheme `MailtoToGmail` auswählen (nicht nur `MailtoToGmail Extension`)
2. `Product > Clean Build Folder`
3. `Run` drücken
4. In der gestarteten App auf `Quit and Open Safari Extensions Preferences...` klicken

### 4) Safari aktivieren

1. Safari öffnen
2. `Safari > Einstellungen > Erweiterungen`
3. `MailtoToGmail` aktivieren
4. Für die Extension unter Website-Zugriff auf **Alle Websites** stellen  
   (ohne diese Berechtigung können `mailto:`-Klicks nicht zuverlässig abgefangen werden)

## Troubleshooting

- `safari-web-extension-converter not found`:
  - Xcode nicht installiert oder nicht aktiv (`xcode-select --switch ...` fehlt)
- `Embedded binary's bundle identifier is not prefixed...`:
  - App- und Extension-Bundle-ID müssen denselben Prefix nutzen
- Extension erscheint nicht in Safari:
  - Scheme prüfen (`MailtoToGmail`)
  - Signing in beiden Targets mit demselben Team
  - Safari und Xcode neu starten
  - In Safari Website-Zugriff auf `Alle Websites` setzen
