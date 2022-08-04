<template>
  <div id="town-prevent-map"></div>
</template>

<script setup>
import {inject, onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import * as L from "leaflet";
import {LegendControl} from "@/js/Widget";

const sources = inject("sources")
const bigMap = inject("TownPreventMap")
const style = {
  version: 8,
  glyphs: "/glyphs/{fontstack}/{range}.pbf",
  sources,
  layers: [
    {
      id: "surrounding_line",
      type: "line",
      source: "surrounding",
      paint: {
        "line-color": "#868787",
        "line-width": 3
      }
    },
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
    },
    {
      id: "boundary",
      type: "line",
      source: "boundary",
      paint: {
        "line-color": "#d07d20",
        "line-width": 3
      },
    },
    {
      id: "highlight",
      type: "line",
      source: "townPrevent",
      paint: {
        "line-color": "#00fdc4",
        "line-width": 3
      },
      filter: ["in", "name", ""]
    },
    {
      id: "town_label",
      type: "symbol",
      source: "town",
      layout: {
        "text-field": '{name}',
        "text-size": 12,
        'text-font': ['NotoCJK']
      },
      paint: {
        "text-color": "#000000"
      },
    },
    {
      id: "surrounding_label",
      type: "symbol",
      source: "surrounding",
      layout: {
        "text-field": '{县}',
        "text-size": 12,
        'text-font': ['NotoCJK']
      },
      paint: {
        "text-color": "#000000"
      },
      filter: ["!=", "县", "永嘉县"]
    }
  ]
}

const initMap = function () {
  const map = new mapboxgl.Map({
    container: 'town-prevent-map',
    center: [120.65, 28.33],
    zoom: 9.7,
    style: style,
  })
  map.on("click", function (e) {
    let features = map.queryRenderedFeatures(e.point, {layers: ["townPrevent"]})
    if (features.length > 0) {
      bigMap.town = features[0].properties
      let fit = new L.polygon(features[0].geometry.coordinates)
      bigMap.southWest = new mapboxgl.LngLat(fit['_bounds']['_southWest']['lat'], fit['_bounds']['_southWest']['lng'])
      bigMap.northEast = new mapboxgl.LngLat(fit['_bounds']['_northEast']['lat'], fit['_bounds']['_northEast']['lng'])
      map.setFilter("highlight", ["in", "name", bigMap.town.name])
    }
  })
  map.addControl(new mapboxgl.NavigationControl({
    showCompass: true,
    showZoom: false,
    visualizePitch: true
  }))
  map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 200,
    unit: "metric"
  }))
  map.addControl(new LegendControl({
    title: "图例",
    content: [
      {
        text: "一般防范",
        color: "#fcecdd"
      },
      {
        text: "次重点防范",
        color: "#f48139"
      },
      {
        text: "重点防范",
        color: "#d94700"
      }
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