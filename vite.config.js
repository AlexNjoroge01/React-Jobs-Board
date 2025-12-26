import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,

    // Proxy for local JSON Server development (optional)
    // On Vercel, /api routes automatically use serverless functions
    // For local dev with Vercel functions: run 'vercel dev' instead
    // To use JSON Server locally: run 'npm run server' and keep this proxy
    proxy: {
      '/api':{
        target:'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')

        },
      },
    },
  })
