import {createApp} from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'

const app = createApp(App)
const sources = {
    "shadow": {
        type: "raster",
        tiles: [
            "/shadow/{z}/{x}/{y}.png"
        ],
        tileSize: 256,
        bounds: [120.3122, 28.0038, 120.9944, 28.6262],
        minzoom: 0,
        maxzoom: 13
    },
    "vegetation": {
        type: "geojson",
        data: "/geojson/植被.geojson"
    }
}

app.provide("sources", sources)
app.mount('#app')
