import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'fiap_mf_home',
      filename: 'remoteEntry.js',
      exposes: {
        './Main': './src/App.tsx'
      },
      shared: [
        'react', 
        'react-dom', 
        '@mui/material',
        '@mui/icons-material',
        '@emotion/styled',
        '@emotion/react',
        'lodash',
      ]
    }),
  ],
  build: {
    target: 'esnext'
  }
})
