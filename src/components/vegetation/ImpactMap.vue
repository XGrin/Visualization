<template>
  <div id="impact-map"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import * as L from "leaflet";
import 'mapbox-gl/dist/mapbox-gl.css'
import {LegendControl} from "@/js/Widget";

const sources = inject("sources")
const bigMap = inject("ImpactMap")
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
      }
    },
    {
      id: "prevent",
      type: "fill",
      source: "prevent",
      paint: {
        "fill-color": "#019fe7"
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
      id: "prevent_point",
      type: "circle",
      source: "prevent_point",
      paint: {
        "circle-color": "#ff0000"
      }
    }
  ]
}

const initMap = function () {
  const map = new mapboxgl.Map({
    container: 'impact-map',
    center: [120.65, 28.33],
    zoom: 9.7,
    style: style,
  })
  map.on("click", (e) => {
    let features = map.queryRenderedFeatures(e.point, {layers: ["impact"]})
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
        img: "/image/red_point.png",
        text: "植被防范点"
      },
      {
        color: "#019fe7",
        text: "植被防范区"
      },
      {
        color: "#fdef00",
        text: "轻微影响"
      },
      {
        color: "#88cc65",
        text: "一般影响"
      },
      {
        color: "#ef9b9e",
        text: "严重影响"
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