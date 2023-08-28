// vite.config.js
import { defineConfig } from "file:///C:/Users/jefer/OneDrive/%C3%81rea%20de%20Trabalho/Mayse/Projeto%20LojaMayse/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/jefer/OneDrive/%C3%81rea%20de%20Trabalho/Mayse/Projeto%20LojaMayse/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/jefer/OneDrive/%C3%81rea%20de%20Trabalho/Mayse/Projeto%20LojaMayse/frontend/node_modules/vite-plugin-svgr/dist/index.js";
import replace from "file:///C:/Users/jefer/OneDrive/%C3%81rea%20de%20Trabalho/Mayse/Projeto%20LojaMayse/frontend/node_modules/@rollup/plugin-replace/dist/es/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    svgr(),
    replace({
      "process.env.VITE_APP_IMAGES_PATH": JSON.stringify(
        process.env.VITE_APP_IMAGES_PATH
      ),
      "process.env.VITE_APP_IMAGE_URL": JSON.stringify(
        process.env.VITE_APP_IMAGE_URL
      )
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqZWZlclxcXFxPbmVEcml2ZVxcXFxcdTAwQzFyZWEgZGUgVHJhYmFsaG9cXFxcTWF5c2VcXFxcUHJvamV0byBMb2phTWF5c2VcXFxcZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGplZmVyXFxcXE9uZURyaXZlXFxcXFx1MDBDMXJlYSBkZSBUcmFiYWxob1xcXFxNYXlzZVxcXFxQcm9qZXRvIExvamFNYXlzZVxcXFxmcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvamVmZXIvT25lRHJpdmUvJUMzJTgxcmVhJTIwZGUlMjBUcmFiYWxoby9NYXlzZS9Qcm9qZXRvJTIwTG9qYU1heXNlL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICdAcm9sbHVwL3BsdWdpbi1yZXBsYWNlJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHN2Z3IoKSxcbiAgICByZXBsYWNlKHtcbiAgICAgICdwcm9jZXNzLmVudi5WSVRFX0FQUF9JTUFHRVNfUEFUSCc6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICBwcm9jZXNzLmVudi5WSVRFX0FQUF9JTUFHRVNfUEFUSCxcbiAgICAgICksXG4gICAgICAncHJvY2Vzcy5lbnYuVklURV9BUFBfSU1BR0VfVVJMJzogSlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIHByb2Nlc3MuZW52LlZJVEVfQVBQX0lNQUdFX1VSTCxcbiAgICAgICksXG4gICAgfSksXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd2EsU0FBUyxvQkFBb0I7QUFDcmMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGFBQWE7QUFHcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sb0NBQW9DLEtBQUs7QUFBQSxRQUN2QyxRQUFRLElBQUk7QUFBQSxNQUNkO0FBQUEsTUFDQSxrQ0FBa0MsS0FBSztBQUFBLFFBQ3JDLFFBQVEsSUFBSTtBQUFBLE1BQ2Q7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K