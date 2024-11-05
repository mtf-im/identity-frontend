import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import {VarletImportResolver} from "@varlet/import-resolver";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        vue(),
        components({
            resolvers: [VarletImportResolver()]
        }),
        autoImport({
            resolvers: [VarletImportResolver({autoImport: true})]
        }),
        visualizer(), 
    ],
    server: {
        host: '0.0.0.0', 
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
