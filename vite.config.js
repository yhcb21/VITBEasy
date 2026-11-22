// vite.config.js – Vite configuration with React plugin and proxy to Express backend
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests and uploaded images to the existing Express server
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Express runs on PORT 5000 (or env PORT)
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Use a writable cache directory (avoid OneDrive protected .vite folder)
  cacheDir: 'node_modules/.vite_cache',
  // Disable the dependency optimizer (no .vite/deps_temp folder)
  optimizeDeps: {
    noDiscovery: true,
    entries: [],
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        // Preserve asset file names (e.g., images) so the backend can still serve them
        assetFileNames: '[name][extname]',
      },
    },
  },
});
