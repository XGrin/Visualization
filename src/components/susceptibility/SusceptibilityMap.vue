<template>
  <div id="susceptibility-map"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import {LegendControl} from "@/js/Widget";

const sources = inject("sources")
const style = {
  version: 8,
  glyphs: "/glyphs/{fontstack}/{range}.pbf",
  sources,
  layers: [
    {
      id: "susceptibility",
      type: "raster",
      source: "susceptibility"
    },
    {
      id: "river",
      type: "line",
      source: "river",
      paint: {
        "line-color": "#00b7ef",
        "line-width": 2
      }
    },
    {
      id: "boundary",
      type: "line",
      source: "boundary",
      paint: {
        "line-color": "#000000",
        "line-width": 3
      }
    },
    {
      id: "disaster_point",
      type: "circle",
      source: "disaster_point",
      paint: {
        "circle-color": "#fdfd00"
      }
    }
  ]
}

const initMap = function () {
  const map = new mapboxgl.Map({
    container: 'susceptibility-map',
    center: [120.65, 28.33],
    zoom: 9.7,
    style: style,
  })
  map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 200,
    unit: "metric"
  }))
  map.addControl(new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: false,
    visualizePitch: true
  }))
  map.addControl(new LegendControl({
    title: "图例",
    content: [
      {
        img: "/image/yellow_point.png",
        text: "滑坡隐患点"
      },
      {
        color: "#fdfdd6",
        text: "无易发"
      },
      {
        color: "#fdca98",
        text: "低易发"
      },
      {
        color: "#fd9833",
        text: "中易发"
      },
      {
        color: "#ca3300",
        text: "高易发"
      },
      {
        color: "#980000",
        text: "极高易发"
      },
    ]
  }), "bottom-right")
}

onMounted(() => {
  initMap()
})

</script>

<style scoped>

</style>