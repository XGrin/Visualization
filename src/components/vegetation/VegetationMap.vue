<template>
  <div id="vegetation-map"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

const sources = inject("sources")
const style = {
  version: 8,
  sources,
  layers: [
    {
      id: "shadow",
      type: "raster",
      source: "shadow",
    },
    {
      id: "vegetation",
      type: "fill",
      source: "vegetation",
      paint: {
        "fill-color": "#7b2d2d",
        "fill-outline-color": '#000000',
      }
    }
  ]
}

const initMap = function () {
  const map = new mapboxgl.Map({
    container: 'vegetation-map',
    center: [120.65, 28.33],
    zoom: 9.7,
    style: style,
  })
}

onMounted(() => {
  initMap()
})

</script>

<style scoped>

</style>