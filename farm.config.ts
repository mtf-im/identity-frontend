import {defineConfig} from '@farmfe/core';
import vue from '@vitejs/plugin-vue';
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import {VarletImportResolver} from "@varlet/import-resolver";
import postcss from "@farmfe/js-plugin-postcss"

export default defineConfig({
    vitePlugins: [
        vue(),
        components({
            resolvers: [VarletImportResolver()]
        }),
        autoImport({
            resolvers: [VarletImportResolver({autoImport: true})]
        }),
    ],
    plugins: [
        postcss(),
    ],
    server: {
        proxy: {
            "/api": {
                target: 'http://127.0.0.1:35271',
            },
            "/.well-known": {
                target: 'http://127.0.0.1:35271',
            }
        }
    }
});
