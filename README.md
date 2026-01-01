# React PWA (Vite)

Minimal React Progressive Web App scaffold using Vite + `vite-plugin-pwa`.

## Setup

```bash
npm install
npm run dev
```

## Build + preview

```bash
npm run build
npm run preview
```

## PWA notes

- Service worker is registered in `src/main.tsx`.
- PWA config lives in `vite.config.ts` (`VitePWA(...)`).
- Replace the SVG icons in `public/` with your real app icons (typically PNG 192×192 and 512×512) before shipping.

