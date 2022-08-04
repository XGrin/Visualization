<template>
  <box>
    <template #map>
      <protect-map style="width: 100%;height: 87vh"></protect-map>
    </template>
    <template #mapDetail>
      <protect-map-detail style="height: 30vh"></protect-map-detail>
    </template>
    <template #mapInfo>
      <el-descriptions title="详细信息" :border="true" :column="1" v-loading="bigMap.unit===''"
                       element-loading-text="点击地图查看详细信息">
        <el-descriptions-item label="经度">{{ parseFloat(bigMap.unit["经度"]).toFixed(3) }}</el-descriptions-item>
        <el-descriptions-item label="纬度">{{ parseFloat(bigMap.unit["纬度"]).toFixed(3) }}</el-descriptions-item>
        <el-descriptions-item label="所属乡镇">{{ bigMap.unit["XIANGNAME"] }}</el-descriptions-item>
        <el-descriptions-item label="林种">{{ bigMap.unit["林种"] }}</el-descriptions-item>
        <el-descriptions-item label="林类">{{ bigMap.unit["林类"] }}</el-descriptions-item>
        <el-descriptions-item label="林分">{{ bigMap.unit["林分"] }}</el-descriptions-item>
        <el-descriptions-item label="风速">{{ parseFloat(bigMap.unit["风速"]).toFixed(3) }}</el-descriptions-item>
        <el-descriptions-item label="易损指数">{{ bigMap.unit["易损性"] }}</el-descriptions-item>
        <el-descriptions-item label="易损程度">
          <el-tag :type="getTagType(bigMap.unit['易损性'])">{{
              (function (value) {
                value = parseFloat(value)
                if (value <= 12)
                  return "轻微易损"
                else if (value <= 24)
                  return "一般易损"
                else
                  return "严重易损"
              }(bigMap.unit["易损性"]))
            }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </box>
</template>

<script setup>
import Box from "@/components/Box";
import {provide, reactive, watch} from "vue";
import mapboxgl from "mapbox-gl";
import ProtectMapDetail from "@/components/vegetation/ProtectMapDetail";
import ProtectMap from "@/components/vegetation/ProtectMap";

const bigMap = reactive({
  map: "",
  unit: "",
  southWest: "",
  northEast: ""
})
provide("ProtectMap", bigMap)
const detailMap = reactive({
  map: ""
})
provide("ProtectMapDetail", detailMap)

watch(() => bigMap.unit["OBJECTID"], (newValue, oldValue) => {
  detailMap.map.setFilter("protect", ["in", "OBJECTID", newValue])
  detailMap.map.setFilter("label", ["in", "OBJECTID", newValue])
  detailMap.map.setFilter("protect_area", ["in", "OBJECTID", newValue])
  detailMap.map.fitBounds(new mapboxgl.LngLatBounds(bigMap["southWest"], bigMap["northEast"]))
})

const getTagType = function (num) {
  num = parseFloat(num)
  if (num <= 12) {
    return "success"
  } else if (num < 24) {
    return "warning"
  } else {
    return "danger"
  }
}

</script>

<style scoped>

</style>