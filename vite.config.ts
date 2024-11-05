import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletImportResolver } from "@varlet/import-resolver";
import { visualizer } from "rollup-plugin-visualizer";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

export default defineConfig({
    plugins: [
        vue(),
        components({
            resolvers: [
                VarletImportResolver(),
                IconsResolver({
                    prefix: "i",
                }),
            ],
        }),
        autoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/, // .md
            ],
            imports: ["vue", "vue-router"],
            resolvers: [VarletImportResolver({ autoImport: true })],
        }),
        visualizer(),
        VueI18nPlugin({
            include: "./src/i18n/locales/**.{json}",
            compositionOnly: true,
        }),
        Icons(),
    ],
    server: {
        host: "0.0.0.0",
        port: 9000,
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
