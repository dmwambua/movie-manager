# React + Vite

This is an app that suggests top movies
Uses React, Appwrite for backend, tailwind

Technologies
-React
-tailwind for css
-Appwrite for backend as a service (abstract the complexities of backend infrastructure, allowing developers to focus on building applications rather than managing servers)


Resources
Youtube Tutorial link https://www.youtube.com/watch?v=dCLhUialKPQ
TMDB API KEY website https://www.themoviedb.org/settings/api
Spinner source https://flowbite.com/docs/components/spinner/
Server: http://localhost:5173/

Notes
Installed Simple React Snippets - run by typing rafce
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


github pages package.json

{
  "name": "movie-manager",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build", 
    "deploy": "gh-pages -d dist"  
  },
  "homepage": "https://dmwambua.github.io/movie-manager/",
  "dependencies": {
    "@tailwindcss/vite": "^4.0.14",
    "appwrite": "^17.0.1",
    "debounce": "^2.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-use": "^17.6.0",
    "tailwindcss": "^4.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^9.21.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.21.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "gh-pages": "^6.3.0", 
    "globals": "^15.15.0",
    "vite": "^6.2.0"
  }
}




github pates vite.config.js
/*
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/movie-manager/',
  plugins: [react(), tailwindcss()],
});
*/