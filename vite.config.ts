import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon_io/favicon.ico',
        'favicon_io/apple-touch-icon.png',
        'favicon_io/favicon-16x16.png',
        'favicon_io/favicon-32x32.png'
      ],
      manifest: {
        name: 'Exercise Tracker',
        short_name: 'Exercise',
        description: 'A minimal local-only exercise tracker.',
        theme_color: '#0b1020',
        background_color: '#0b1020',
        display: 'standalone',
        start_url: '.',
        icons: [
          {
            src: 'favicon_io/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'favicon_io/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: { enabled: true },
      workbox: {
        mode: 'development',
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}']
      }
    })
  ]
})
