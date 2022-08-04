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
    },
    "prevent_point": {
        type: "geojson",
        data: "/geojson/植被防范灾害点.geojson"
    },
    "protect_point": {
        type: "geojson",
        data: "/geojson/植被保护灾害点.geojson"
    },
    "surrounding": {
        type: "geojson",
        data: "/geojson/周边县.geojson"
    },
    "townPrevent": {
        type: "geojson",
        data: "/geojson/乡镇植被防范等级.geojson"
    },
    "townProtect": {
        type: "geojson",
        data: "/geojson/乡镇植被保护等级.geojson"
    },
    "boundary": {
        type: "geojson",
        data: "/geojson/永嘉县.geojson"
    },
    "town": {
        type: "geojson",
        data: "/geojson/永嘉乡镇行政区划.geojson"
    },
    "susceptibility": {
        type: "raster",
        tiles: [
            "/susceptibility/{z}/{x}/{y}.png"
        ],
        bounds: [120.3231, 28.0180, 120.9884, 28.6192],
        tileSize: 256,
        minzoom: 0,
        maxzoom: 13
    },
    "river": {
        type: "geojson",
        data: "/geojson/河流.geojson"
    },
    "disaster_point": {
        type: "geojson",
        data: "/geojson/永嘉滑坡灾害点.geojson"
    },
    "prevent": {
        type: "geojson",
        data: "/geojson/植被防范区.geojson"
    },
    "protect": {
        type: "geojson",
        data: "/geojson/植被保护区.geojson"
    }
}

app.provide("sources", sources)
app.mount('#app')
