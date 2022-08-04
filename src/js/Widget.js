import {createApp} from "vue";
import Legend from "@/components/control/Legend";


class LegendControl {
    constructor(options) {
        /**
         * {
         *     title:'',
         *     content: [
         *         {
         *             color: '',
         *             text: '',
         *         },
         *
         *     ]
         * }
         */
        const app = createApp(Legend)
        app.provide("options", options)
        this.container = document.createElement("div")
        app.mount(this.container)

    }

    onAdd(map) {
        this._map = map
        this._container = this.container
        this._container.className = 'mapboxgl-ctrl'
        return this._container
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}


export {LegendControl}