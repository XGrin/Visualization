<template>
  <div id="town-protect-map-detail"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";

const detailMap = inject("TownProtectMapDetail")
const sources = inject("sources")
const style = {
  version: 8,
  glyphs: "/glyphs/{fontstack}/{range}.pbf",
  sources,
  layers: [
    {
      id: "townProtect",
      type: "fill",
      source: "townProtect",
      paint: {
        'fill-color': [
          "case",
          ['boolean', ['==', ["get", "等级"], "重点保护"]], "#02c49b",
          ['boolean', ['==', ["get", "等级"], "次重点保护"]], "#42ecad",
          ['boolean', ['==', ["get", "等级"], "一般保护"]], "#dcf5e6",
          '#fdfdfd'
        ],
        'fill-outline-color': '#000000',
      },
      filter: ["in", "name", ""]
    },
    {
      id: "town_label",
      type: "symbol",
      source: "townProtect",
      layout: {
        "text-field": '{name}',
        "text-size": 12,
        'text-font': ['NotoCJK']
      },
      paint: {
        "text-color": "#000000"
      },
      filter: ["in", "name", ""]
    },
  ]
}
const initMap = function () {
  detailMap.map = new mapboxgl.Map({
    container: 'town-protect-map-detail',
    center: [120, 28],
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