import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: 'react', // Consider mapping this explicitly
      'react-dom': 'react-dom', // If you're using it
      '@/': '/src/',
    },
  },
});
