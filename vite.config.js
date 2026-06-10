import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  // IMPORTANT: must match your GitHub repo name exactly
  base: '/',

  logLevel: 'error',

  resolve: {
    alias: {
      // Uses a more standard path resolution
      '@': path.resolve(__dirname, './src'),
    },
  },

  plugins: [
    react(),
    svgr()
  ]
})
