import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server:{
    open: true,
    proxy: {
      '/contacts': {
        target: 'https://contact-server-zs3l.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
