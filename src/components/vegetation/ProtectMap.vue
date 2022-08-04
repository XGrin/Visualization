<template>
  <div id="protect-map"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import * as L from "leaflet";
import {LegendControl} from "@/js/Widget";

const sources = inject("sources")
const bigMap = inject("ProtectMap")
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
      }
    },
    {
      id: "protect_area",
      type: "fill",
      source: "protect",
      paint: {
        "fill-color": "#fc0005"
      }
    },
    {
      id: "highlight",
      type: "line",
      source: "vegetation",
      paint: {
        "line-color": "#00fdc4",
        "line-width": 3
      },
      filter: ["in", "OBJECTID", ""]
    },
    {
      id: "protect_point",
      type: "circle",
      source: "protect_point",
      paint: {
        "circle-color": "#005d14"
      }
    }
  ]
}

const initMap = function () {
  const map = new mapboxgl.Map({
    container: 'protect-map',
    center: [120.65, 28.33],
    zoom: 9.7,
    style: style,
  })
  map.on("click", (e) => {
    let features = map.queryRenderedFeatures(e.point, {layers: ["protect"]})
    if (features.length > 0) {
      bigMap.unit = features[0].properties
      let fit = new L.polygon(features[0].geometry.coordinates)
      bigMap.southWest = new mapboxgl.LngLat(fit['_bounds']['_southWest']['lat'], fit['_bounds']['_southWest']['lng'])
      bigMap.northEast = new mapboxgl.LngLat(fit['_bounds']['_northEast']['lat'], fit['_bounds']['_northEast']['lng'])
      map.setFilter("highlight", ["in", "OBJECTID", bigMap.unit["OBJECTID"]])
    }
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
        img: "/image/green_point.png",
        text: "植被保护点"
      },
      {
        color: "#f70000",
        text: "植被保护区"
      },
      {
        color: "#f9d3b4",
        text: "轻微易损"
      },
      {
        color: "#b8e4fb",
        text: "一般易损"
      },
      {
        color: "#d1fdbc",
        text: "严重易损"
      },
    ]
  }), "bottom-right")

  bigMap.map = map
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>

</style>