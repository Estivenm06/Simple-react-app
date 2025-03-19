import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8000',
    },
    allowedHosts: 'react-ts-app-158986608647.us-central1.run.app'
  },
  plugins: [react()]
});
