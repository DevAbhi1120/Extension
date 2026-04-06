# AuraTab (Manifest V3 React New Tab)

A production-ready foundation for a modern, customizable, lightweight Chrome New Tab extension with Material You-inspired theming, multitasking panels, ads controls, and premium unlock.

## Why you got: `Manifest file is missing or unreadable`

Chrome only loads unpacked extensions when `manifest.json` exists at the selected root folder.
If you load `dist/` and it only contains `index.html` + bundled assets, Chrome will fail.

This project now fixes that automatically by copying extension runtime files into `dist/` after build:

- `manifest.json`
- `background.js`
- `index.html` (fallback from `index.html` if needed)
- `icons/*`

## Build (fixed)

```bash
npm install
npm run build
```

The `build` script now runs:

```bash
vite build && node scripts/postbuild-extension.mjs
```

After build, **load `dist/` directly** in `chrome://extensions`.

## Required dist structure

```text
dist/
├── manifest.json
├── background.js
├── index.html
├── assets/
└── icons/
```

## Full Project Structure

```text
.
├── backend/
│   └── api.php
├── public/
│   └── icons/
├── scripts/
│   └── postbuild-extension.mjs
├── src/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── types.ts
│   └── utils/
├── background.js
├── manifest.json
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Razorpay + PHP Integration Sample

- Frontend: `src/features/premium/PremiumButton.tsx` and `premiumApi.ts`
- Backend: `backend/api.php` with `/verify-payment` and `/check-premium`

## Security Notes

- URL sanitization + iframe allowlist in `src/utils/security.ts`.
- CSP configured in `manifest.json`.
- Font extension/size checks included.
