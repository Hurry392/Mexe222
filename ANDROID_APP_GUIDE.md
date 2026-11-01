# Building the Android App (.apk) — Step by Step

Your site is now a fully TWA-ready PWA. This guide turns it into a real
installable Android app file (`.apk`) using **PWABuilder** — a free website,
no Android tools to install, works fine on low-resource Linux.

There are two phases:
1. **Deploy the site** (you've done this before — normal redeploy).
2. **Generate the .apk, then paste one value back into Vercel** so the app
   launches with NO browser address bar.

---

## Phase 1 — Deploy the updated site

From the extracted project folder:

```
npm install
npx vercel --prod
```

Confirm two URLs work in a browser after deploy:
- `https://mexe-trade-main-1.vercel.app/manifest.webmanifest` → shows JSON
- `https://mexe-trade-main-1.vercel.app/.well-known/assetlinks.json` → shows
  JSON (the `sha256_cert_fingerprints` list will be **empty** for now —
  that's expected, we fill it in Phase 2).

---

## Phase 2 — Generate the .apk with PWABuilder

1. Go to **https://www.pwabuilder.com**
2. Paste your URL: `https://mexe-trade-main-1.vercel.app` → click **Start**.
3. It analyzes the site and shows a score. Click **Package For Stores**.
4. Choose **Android** → **Generate Package**.
5. In the options dialog, note/keep these (defaults are fine):
   - **Package ID**: something like `app.vercel.mexe_trade_main_1.twa`
     — WRITE THIS DOWN, it must match what the site expects (see note below).
   - Leave "Signing key" as **Create new** (PWABuilder makes one for you).
6. Click **Download**. You get a ZIP containing:
   - `app-release-signed.apk`  ← the file you install / send to your client
   - `assetlinks.json`         ← contains your app's fingerprint
   - `signing.keystore` + a passwords file ← **BACK THESE UP, never lose them**
     (you need the same keystore to ship any future update).

---

## Phase 3 — Remove the address bar (the important bit)

Right now the app works but shows a URL bar at the top. To remove it:

1. Open the `assetlinks.json` from the PWABuilder ZIP. Find the value under
   `sha256_cert_fingerprints` — a long colon-separated hex string like
   `AB:CD:12:...:EF`.
2. In **Vercel → your project → Settings → Environment Variables**, add:
   - Name: `ANDROID_CERT_FINGERPRINT`
   - Value: paste that fingerprint string.
   - (If PWABuilder's file lists more than one, paste them comma-separated.)
3. If the Package ID you chose in step 5 was NOT
   `app.vercel.mexe_trade_main_1.twa`, also add:
   - Name: `ANDROID_PACKAGE_NAME`
   - Value: the exact Package ID you used.
4. **Redeploy** (`npx vercel --prod` again, or click "Redeploy" in Vercel).
5. Verify: open `https://mexe-trade-main-1.vercel.app/.well-known/assetlinks.json`
   — the fingerprint should now appear in the JSON.

Reinstall the `.apk` on a phone. The address bar should be gone and it now
launches like a normal app. (First launch after fixing asset links can take
a few seconds to verify — give it a moment, or reboot the phone once.)

---

## Installing the .apk on a phone (for you / your client)

- Transfer `app-release-signed.apk` to the Android phone (USB, email, link).
- Tap it. Android will warn about "install from unknown sources" — allow it
  for the app doing the install (Files/Chrome). This is normal for any app
  not from the Play Store.
- It installs with your logo icon and launches fullscreen.

---

## Important notes

- **Keep the keystore safe.** The `signing.keystore` + password from
  PWABuilder is the ONLY way to publish updates that install over the
  existing app. Lose it and users must uninstall/reinstall. Back it up
  somewhere permanent.
- **Updates are automatic for content.** Because this is a TWA, it loads
  your live site — so any change you deploy to the website appears in the
  app instantly, no new `.apk` needed. You only rebuild the `.apk` if you
  change the icon, name, or package ID.
- **Internet required.** A TWA is a thin wrapper around your live site, so
  the app needs a connection to work (same as opening the website).
- **If PWABuilder ever fails**, the alternative is Bubblewrap CLI, which
  needs Java (JDK 17) + Android SDK installed locally — heavier on a
  low-resource machine, so try PWABuilder first.

---

## Showing the "Download Android App" button on your home page

The home page has an install section with three paths:
- **iPhone** → tap-through instructions for Safari's "Add to Home Screen".
- **Web App Install** (Android/desktop) → fires the browser's native PWA
  install prompt, or shows manual steps if the browser doesn't offer one.
- **Download Android App** (the direct .apk) → this button is HIDDEN until
  you host the .apk and set its URL.

To turn on the direct-APK button:
1. After generating `app-release-signed.apk` (Phase 2 above), upload it
   somewhere public — e.g. drop it in this project's `public/` folder as
   `public/app.apk` (then it's served at `https://your-domain/app.apk`),
   or use any file host / your own storage.
2. In **Vercel → Settings → Environment Variables**, add:
   - Name: `NEXT_PUBLIC_APK_URL`
   - Value: the full URL to the .apk (e.g.
     `https://mexe-trade-main-1.vercel.app/app.apk`)
3. Redeploy. The "Download Android App" button now appears on Android.

Note: tapping it DOWNLOADS the .apk; the user then opens the file and
approves "install from unknown sources" (Android security requires this —
no website can install an app silently). This is normal and expected.
