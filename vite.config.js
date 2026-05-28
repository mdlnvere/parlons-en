import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://www.dev.nuanci.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/blog/wp-json/wp/v2'),
      },
    }
  }
})
