import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5330,
    proxy: { '/api': 'http://localhost:5331', '/uploads': 'http://localhost:5331', '/sitemap_index.xml': 'http://localhost:5331', '/sitemap.xml': 'http://localhost:5331', '/sitemap-pages.xml': 'http://localhost:5331', '/sitemap-images.xml': 'http://localhost:5331' },
  },
})
// trigger restart
