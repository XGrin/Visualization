<template>
  <box>
    <template #map>
      <town-protect-map style="width: 100%;height: 87vh"></town-protect-map>
    </template>
    <template #mapDetail>
      <town-protect-map-detail style="height: 30vh"></town-protect-map-detail>
    </template>
    <template #mapInfo>
      <el-descriptions title="乡镇详细信息" :border="true" :column="1" v-loading="bigMap.town===''"
                       element-loading-text="点击地图查看详细信息">
        <el-descriptions-item label="乡镇名">{{ bigMap.town["name"] }}</el-descriptions-item>
        <el-descriptions-item label="易损指数">{{ parseFloat(bigMap.town["Ave_易损"]).toFixed(2) }}
        </el-descriptions-item>
        <el-descriptions-item label="易损程度">
          <el-tag :type="getTagType(bigMap.town['等级'])">{{ bigMap.town['等级'] }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </box>
</template>

<script setup>
import Box from "@/components/Box";

import mapboxgl from "mapbox-gl";
import {provide, reactive, watch} from "vue";
import TownProtectMapDetail from "@/components/town/TownProtectMapDetail";
import TownProtectMap from "@/components/town/TownProtectMap";

const bigMap = reactive({
  map: "",
  town: "",
  southWest: "",
  northWest: ""
})
provide("TownProtectMap", bigMap)
const detailMap = reactive({
  map: ""
})
provide("TownProtectMapDetail", detailMap)

watch(() => bigMap.town["name"], (newValue, oldValue) => {
  detailMap.map.setFilter("townProtect", ["in", "name", newValue])
  detailMap.map.setFilter("town_label", ["in", "name", newValue])
  detailMap.map.fitBounds(new mapboxgl.LngLatBounds(bigMap["southWest"], bigMap["northEast"]))
})

const getTagType = function (str) {
  if (str === undefined) {
    return "success"
  }
  if (str.substring(0, 1) === "重") {
    return "danger"
  } else if (str.substring(0, 1) === "次") {
    return "warning"
  } else {
    return "success"
  }
}
</script>

<style scoped>

</style>