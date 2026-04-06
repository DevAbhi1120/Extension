# AuraTab (Manifest V3 React New Tab)

A production-ready foundation for a **modern, highly customizable, lightweight Chrome New Tab extension** with Material You-inspired theming, multitasking workspace panels, and premium monetization support.

## Full Project Structure

```text
.
├── backend/
│   └── api.php
├── public/
│   └── icons/
├── src/
│   ├── components/
│   │   ├── ClockCard.tsx
│   │   └── GlassPanel.tsx
│   ├── features/
│   │   ├── ads/AdCard.tsx
│   │   ├── command-palette/CommandPalette.tsx
│   │   ├── multitasking/WorkspacePanels.tsx
│   │   ├── onboarding/OnboardingModal.tsx
│   │   ├── premium/
│   │   │   ├── premiumApi.ts
│   │   │   └── PremiumButton.tsx
│   │   ├── quick-links/QuickLinks.tsx
│   │   ├── search/SearchBar.tsx
│   │   ├── settings/SettingsDrawer.tsx
│   │   ├── wallpaper/WallpaperLayer.tsx
│   │   └── weather/WeatherWidget.tsx
│   ├── hooks/
│   │   ├── useClock.ts
│   │   ├── useDebouncedValue.ts
│   │   ├── useIdleAdVisibility.ts
│   │   └── useSettings.ts
│   ├── pages/NewTabPage.tsx
│   ├── styles/globals.css
│   ├── types.ts
│   └── utils/
│       ├── security.ts
│       ├── storage.ts
│       └── theme.ts
├── background.js
├── manifest.json
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Tailwind Setup

- Tailwind configured with glassmorphism utilities, surface/accent CSS variables, and dark mode selectors.
- Entry stylesheet in `src/styles/globals.css` with `@tailwind base/components/utilities`.

## Razorpay + PHP Integration Sample

1. Frontend triggers Razorpay checkout with amount `4900` paise (`₹49`).
2. Razorpay handler posts payment payload to backend `/verify-payment`.
3. PHP backend validates HMAC signature with Razorpay secret and persists premium state.
4. Frontend calls `/check-premium` on startup for server-validated premium status.

## Ads Logic Implementation

- Background service worker samples ad eligibility every minute using Chrome Idle API.
- Ads only shown when user is idle for random 60–120 sec threshold.
- Frontend ad card uses fade animations and auto-hides on user interaction.
- Premium users do not see ads.

## Example UI Layout

- Left settings rail + right dashboard content.
- Widgets: clock/date/greeting, weather, search, quick links.
- Workspace area supports draggable/resizable embedded panels.
- Onboarding modal and command palette included.

## Performance Optimization Strategies

- Route-level and feature-level lazy loading via `React.lazy` + `Suspense`.
- Manual chunking in Vite for heavy deps (Framer Motion, dnd-kit).
- Debounced hooks available for expensive state flows.
- Uses `chrome.storage.sync` for lightweight settings and `chrome.storage.local` for volatile ad state.
- Suggested: move uploaded wallpapers/fonts to IndexedDB when scaling assets.

## Deployment Steps

1. `npm install`
2. `npm run build`
3. Open `chrome://extensions`
4. Enable Developer Mode
5. Load unpacked extension from `dist/` plus `manifest.json` and `background.js` copied to build output.
6. Host `backend/api.php` on HTTPS server and update backend base URL + Razorpay keys.

## Security Notes

- URL sanitization and iframe host allowlist are implemented.
- Custom font file validation enforces extension and max size.
- CSP in `manifest.json` restricts scripts and framed origins.
