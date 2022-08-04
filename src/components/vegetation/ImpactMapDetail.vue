<template>
  <div id="impact-map-detail"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";

const sources = inject("sources")
const detailMap = inject("ImpactMapDetail")
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
      id: "impact",
      type: "fill",
      source: "vegetation",
      paint: {
        "fill-color": [
          "step",
          ["get", "影响性"],
          "#fdef00", 2.1,
          "#88cc65", 2.8,
          "#ef9b9e"
        ],
        "fill-outline-color": '#000000',
      },
      filter: ["in", "OBJECTID", ""]
    },
    {
      id: "prevent",
      type: "fill",
      source: "prevent",
      paint: {
        "fill-color": "#019fe7"
      },
      filter: ["in", "OBJECTID", ""]
    },
    {
      id: "label",
      type: "symbol",
      source: "vegetation",
      layout: {
        "text-field": '{林类}',
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
    container: 'impact-map-detail',
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