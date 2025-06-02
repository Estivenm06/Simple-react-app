import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  build: {
    outDir: './client/dist',
    cssMinify: 'lightningcss',
    minify: 'terser',
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  preview: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
  plugins: [react(), tailwindcss()],
});
