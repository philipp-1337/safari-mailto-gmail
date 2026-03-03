# Mailto zu Gmail für Safari

Sprachen: [English](./README.md) | [Deutsch](./README.de.md)

Eine schlanke Safari-Erweiterung für alle, die in Safari auf einen `mailto:`-Link klicken und direkt in Gmail landen möchten.  
Statt Apple Mail zu öffnen, startet direkt der Gmail-Compose-Dialog im Browser, inklusive vorausgefüllter Felder aus dem Link.

## Features

- Fängt `mailto:`-Links in Safari ab
- Öffnet Gmail Compose direkt im Browser
- Übernimmt `to`, `cc`, `bcc`, `subject` und `body`
- Kein Vendor-Lock-in: basiert auf Safari Web Extension + nativer Host-App

## Beispiel

Von:

```text
mailto:max@example.com?subject=Hallo&body=Test
```

Zu:

```text
https://mail.google.com/mail/u/0/?view=cm&fs=1&to=max@example.com&su=Hallo&body=Test
```

## Projektstruktur

- `extension/manifest.json`: Extension-Metadaten
- `extension/content.js`: erkennt Klicks auf `mailto:`-Links
- `extension/background.js`: parst `mailto:` und baut die Gmail-URL
- `scripts/create_safari_project.sh`: erzeugt das Xcode-Projekt über den Apple-Converter

## Vollständiges Setup

### 1) Xcode installieren

`safari-web-extension-converter` ist Teil von Xcode (kein separates Paket).

1. Xcode aus dem App Store installieren
2. Xcode einmal starten und das Initial-Setup abschließen
3. Developer-Verzeichnis auswählen:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

4. Lizenz akzeptieren und First-Launch-Komponenten installieren:

```bash
sudo xcodebuild -runFirstLaunch
```

5. Prüfen, ob der Converter verfügbar ist:

```bash
xcrun --find safari-web-extension-converter
```

### 2) Safari-Projekt erzeugen

Im Projekt-Root ausführen:

```bash
./scripts/create_safari_project.sh
```

Dadurch wird ein Xcode-Projekt im Ordner `MailtoToGmail/` erstellt.

## Xcode + Safari: Klick-für-Klick

### 1) Projekt öffnen

`MailtoToGmail/MailtoToGmail.xcodeproj` in Xcode öffnen.

### 2) Signing konfigurieren

1. In der linken Seitenleiste auf das blaue Projekt `MailtoToGmail` klicken
2. Unter `TARGETS` `MailtoToGmail` auswählen
3. `Signing & Capabilities` öffnen:
   - `Automatically manage signing`: aktiv
   - `Team`: dein Team (z. B. Personal Team)
4. Unter `TARGETS` `MailtoToGmail Extension` auswählen
5. `Signing & Capabilities` öffnen:
   - `Automatically manage signing`: aktiv
   - `Team`: exakt dasselbe Team wie oben

### 3) Build und Start

1. Oben das Scheme `MailtoToGmail` auswählen (nicht nur `MailtoToGmail Extension`)
2. `Product > Clean Build Folder`
3. `Run` klicken
4. In der gestarteten App auf `Quit and Open Safari Extensions Preferences...` klicken

### 4) In Safari aktivieren

1. Safari öffnen
2. Zu `Safari > Einstellungen > Erweiterungen` gehen
3. `MailtoToGmail` aktivieren
4. Website-Zugriff der Erweiterung auf **Alle Websites** setzen  
   (ohne diese Berechtigung können `mailto:`-Klicks nicht zuverlässig abgefangen werden)

## Troubleshooting

- `safari-web-extension-converter not found`:
  - Xcode ist nicht installiert oder nicht ausgewählt (`xcode-select --switch ...` fehlt)
- `Embedded binary's bundle identifier is not prefixed...`:
  - App- und Extension-Bundle-ID müssen denselben Prefix verwenden
- Extension erscheint nicht in Safari:
  - prüfen, ob das Scheme `MailtoToGmail` ausgewählt ist
  - sicherstellen, dass beide Targets dasselbe Signing-Team nutzen
  - Safari und Xcode neu starten
  - in Safari den Website-Zugriff auf `Alle Websites` setzen
