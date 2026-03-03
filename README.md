# Mailto to Gmail for Safari

Languages: [English](./README.md) | [Deutsch](./README.de.md)

A lightweight Safari extension for anyone who clicks a `mailto:` link in Safari and wants Gmail to open instantly.  
Instead of launching Apple Mail, it opens the Gmail compose dialog in your browser with all fields prefilled from the link.

## Features

- Intercepts `mailto:` links in Safari
- Opens Gmail compose directly in the browser
- Preserves `to`, `cc`, `bcc`, `subject`, and `body`
- Supports English and German (extension metadata and host app UI)
- No vendor lock-in: built with a Safari Web Extension + native host app

## Example

From:

```text
mailto:max@example.com?subject=Hello&body=Test
```

To:

```text
https://mail.google.com/mail/u/0/?view=cm&fs=1&to=max@example.com&su=Hello&body=Test
```

## Project Structure

- `extension/manifest.json`: extension metadata
- `extension/content.js`: detects clicks on `mailto:` links
- `extension/background.js`: parses `mailto:` and builds the Gmail URL
- `scripts/create_safari_project.sh`: generates the Xcode project via Apple's converter

## Full Setup

### 1) Install Xcode

`safari-web-extension-converter` is part of Xcode (not a separate package).

1. Install Xcode from the App Store
2. Launch Xcode once and complete the initial setup
3. Select the developer directory:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

4. Accept license and install first-launch components:

```bash
sudo xcodebuild -runFirstLaunch
```

5. Verify the converter is available:

```bash
xcrun --find safari-web-extension-converter
```

### 2) Generate the Safari project

Run this from the project root:

```bash
./scripts/create_safari_project.sh
```

This creates an Xcode project inside `MailtoToGmail/`.

## Xcode + Safari: Click-by-Click

### 1) Open the project

Open `MailtoToGmail/MailtoToGmail.xcodeproj` in Xcode.

### 2) Configure signing

1. In the left sidebar, click the blue `MailtoToGmail` project
2. Under `TARGETS`, select `MailtoToGmail`
3. Open `Signing & Capabilities`:
   - `Automatically manage signing`: enabled
   - `Team`: your team (for example, Personal Team)
4. Under `TARGETS`, select `MailtoToGmail Extension`
5. Open `Signing & Capabilities`:
   - `Automatically manage signing`: enabled
   - `Team`: exactly the same team as above

### 3) Build and run

1. Select the `MailtoToGmail` scheme at the top (not only `MailtoToGmail Extension`)
2. Click `Product > Clean Build Folder`
3. Click `Run`
4. In the launched app, click `Quit and Open Safari Extensions Preferences...`

### 4) Enable in Safari

1. Open Safari
2. Go to `Safari > Settings > Extensions`
3. Enable `MailtoToGmail`
4. Set website access for the extension to **All Websites**  
   (without this permission, `mailto:` clicks may not be intercepted reliably)

## Troubleshooting

- `safari-web-extension-converter not found`:
  - Xcode is not installed or not selected (`xcode-select --switch ...` missing)
- `Embedded binary's bundle identifier is not prefixed...`:
  - app and extension bundle IDs must share the same prefix
- Extension does not appear in Safari:
  - verify scheme is `MailtoToGmail`
  - ensure both targets use the same signing team
  - restart Safari and Xcode
  - set Safari website access to `All Websites`
