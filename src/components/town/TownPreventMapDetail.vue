<template>
  <div id="town-prevent-map-detail"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";

const detailMap = inject("TownPreventMapDetail")
const sources = inject("sources")
const style = {
  version: 8,
  glyphs: "/glyphs/{fontstack}/{range}.pbf",
  sources,
  layers: [
    {
      id: "townPrevent",
      type: "fill",
      source: "townPrevent",
      paint: {
        'fill-color': [
          "case",
          ['boolean', ['==', ["get", "等级"], "重点防范"]], "#d94700",
          ['boolean', ['==', ["get", "等级"], "次重点防范"]], "#f48139",
          ['boolean', ['==', ["get", "等级"], "一般防范"]], "#fcecdd",
          '#fdfdfd'
        ],
        'fill-outline-color': '#000000',
      },
      filter: ["in", "name", ""]
    },
    {
      id: "town_label",
      type: "symbol",
      source: "townPrevent",
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
    container: 'town-prevent-map-detail',
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