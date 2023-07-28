import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    replace({
      'process.env.VITE_APP_IMAGES_PATH': JSON.stringify(
        process.env.VITE_APP_IMAGES_PATH,
      ),
      'process.env.VITE_APP_IMAGE_URL': JSON.stringify(
        process.env.VITE_APP_IMAGE_URL,
      ),
    }),
  ],
});
