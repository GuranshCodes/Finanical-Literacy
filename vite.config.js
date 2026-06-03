import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { resolve } from 'path'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '/Finanical-Literacy/',
  logLevel: 'error',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    svgr()
  ],
})