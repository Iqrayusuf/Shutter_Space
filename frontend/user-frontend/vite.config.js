import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy uploads requests to your Spring Boot backend
      '/uploads': {
        target: 'http://localhost:8080', // Your Spring Boot server
        changeOrigin: true,
      },
      // Proxy API requests
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    },
  },
});