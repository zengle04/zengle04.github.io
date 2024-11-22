//vite config file
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'old/Depreciated/page1.html'),
        nested: resolve(__dirname, 'chrpage.html'),
        nested: resolve(___dirname, 'old/Depreciated/chrpage.html'),
      },
    },
  },
})
