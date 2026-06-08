import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  // IMPORTANT: must match your GitHub repo name exactly
  base: '/Finanical-Literacy/',

  logLevel: 'error',

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  plugins: [
    react(),
    svgr()
  ]
})