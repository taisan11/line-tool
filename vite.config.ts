import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
    build: {
      outDir: 'dist',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
            token: resolve(__dirname, 'token/index.html'),
            geo: resolve(__dirname, 'geo/index.html'),
          },
        },
      },
});