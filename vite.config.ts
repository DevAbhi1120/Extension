import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        newtab: 'index.html'
      },
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          dnd: ['@dnd-kit/core', '@dnd-kit/sortable']
        }
      }
    },
    chunkSizeWarningLimit: 650
  }
});
