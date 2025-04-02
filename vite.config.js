import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/movie-manager/', // Set the base to match your GitHub repository name
  plugins: [react(), tailwindcss()],
});

