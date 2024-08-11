import { defineConfig } from '@farmfe/core';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  vitePlugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:35271',
      }
    }
  }
});
