import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
    cors: true
  },
  preview: {
    port: 3000,
    host: true,
    allowedHosts: true,
    cors: true
  }
});
