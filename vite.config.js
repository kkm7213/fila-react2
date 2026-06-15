import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { fileURLToPath } from 'url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/fila-dist/',
  resolve: {
    alias: {
      "@": path.resolve(fileURLToPath(new URL('./src', import.meta.url))),
    },
  },
})
