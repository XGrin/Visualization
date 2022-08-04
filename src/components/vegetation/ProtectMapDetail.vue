<template>
  <div id="protect-map-detail"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";

const sources = inject("sources")
const detailMap = inject("ProtectMapDetail")
const style = {
  version: 8,
  glyphs: "/glyphs/{fontstack}/{range}.pbf",
  sources,
  layers: [
    {
      id: "shadow",
      type: "raster",
      source: "shadow",
    },
    {
      id: "protect",
      type: "fill",
      source: "vegetation",
      paint: {
        "fill-color": [
          "step",
          ["get", "易损性"],
          "#f9d3b4", 12,
          "#b8e4fb", 24,
          "#d1fdbc"
        ],
        "fill-outline-color": '#000000',
      },
      filter: ["in", "OBJECTID", ""]
    },
    {
      id: "protect_area",
      type: "fill",
      source: "protect",
      paint: {
        "fill-color": "#f90000"
      },
      filter: ["in", "OBJECTID", ""]
    },
    {
      id: "label",
      type: "symbol",
      source: "vegetation",
      layout: {
        "text-field": '{树种}',
        "text-size": 12,
        'text-font': ['NotoCJK']
      },
      paint: {
        "text-color": "#000000"
      },
      filter: ["in", "OBJECTID", ""]
    },
  ]
}

const initMap = function () {
  detailMap.map = new mapboxgl.Map({
    container: 'protect-map-detail',
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