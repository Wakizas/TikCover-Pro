import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Active les fonctionnalités PWA en mode développement pour faciliter les tests
      },
      manifest: {
        name: 'TikCover Pro',
        short_name: 'TikCover',
        description: 'Générez des couvertures TikTok IA professionnelles en quelques secondes.',
        theme_color: '#010101',
        background_color: '#010101',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      // Le plugin utilisera automatiquement public/logo.svg pour générer les icônes ci-dessus.
    })
  ],
})
