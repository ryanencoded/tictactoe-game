import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@assets': '/src/assets',
      '@features': '/src/features',
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@services': '/src/services',
    },
  },
})
