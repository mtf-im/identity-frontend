import { defineConfig } from "@farmfe/core";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletImportResolver } from "@varlet/import-resolver";
import postcss from "@farmfe/js-plugin-postcss";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import visualizer from "@farmfe/js-plugin-visualizer";

export default defineConfig({
  vitePlugins: [
    vue(),
    components({
      resolvers: [VarletImportResolver()],
    }),
    autoImport({
      resolvers: [VarletImportResolver({ autoImport: true })],
    }),
    VueI18nPlugin({
      include: "./src/i18n/locales/**.{json}",
      compositionOnly: true,
    }),
  ],
  plugins: [postcss(), visualizer()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:35271",
      },
      "/.well-known": {
        target: "http://127.0.0.1:35271",
      },
    },
  },
});
