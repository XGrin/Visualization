import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {resolve} from 'node:path'
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        }),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
            filter: (file) => {
                let suffix = file.split(".").pop().toLowerCase()
                return ["geojson"].includes(suffix);
            }
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        }
    }
})
