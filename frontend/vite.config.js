import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = (env.VITE_PROXY_TARGET || 'http://localhost:3000').trim();
  const port = Number(env.VITE_PORT) || 3001;
  const host = (env.VITE_HOST || '').trim() || true;

  return {
    server: {
      host,
      port,
      proxy: {
        '/api': proxyTarget,
      },
    },
    build: {
      outDir: 'dist',
    },
  };
});
