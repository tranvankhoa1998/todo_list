import { defineConfig } from 'vite';

const proxyTarget = process.env.VITE_PROXY_TARGET || 'http://localhost:3000';

export default defineConfig({
  server: {
    host: true,
    port: 3001,
    proxy: {
      '/api': proxyTarget,
    },
  },
  build: {
    outDir: 'dist',
  },
});
