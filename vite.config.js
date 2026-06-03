import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url' // Add this for modern path resolution
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/Finanical-Literacy/',
  logLevel: 'error',
  resolve: {
    alias: {
      // Safely maps '@' to the 'src' directory without needing __dirname
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    svgr()
  ],
})