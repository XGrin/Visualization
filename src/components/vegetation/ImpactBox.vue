<template>
  <box>
    <template #map>
      <impact-map style="width: 100%;height: 87vh"></impact-map>
    </template>
    <template #mapDetail>
      <impact-map-detail style="height: 30vh"></impact-map-detail>
    </template>
    <template #mapInfo>
      <el-descriptions title="详细信息" :border="true" :column="1" v-loading="bigMap.unit===''"
                       element-loading-text="点击地图查看详细信息">
        <el-descriptions-item label="经度">{{ parseFloat(bigMap.unit["经度"]).toFixed(3) }}</el-descriptions-item>
        <el-descriptions-item label="纬度">{{ parseFloat(bigMap.unit["纬度"]).toFixed(3) }}</el-descriptions-item>
        <el-descriptions-item label="所属乡镇">{{ bigMap.unit["XIANGNAME"] }}</el-descriptions-item>
        <el-descriptions-item label="树种">{{ bigMap.unit["树种"] }}</el-descriptions-item>
        <el-descriptions-item label="林种">{{ bigMap.unit["林种"] }}</el-descriptions-item>
        <el-descriptions-item label="林类">{{ bigMap.unit["林类"] }}</el-descriptions-item>
        <el-descriptions-item label="林分">{{ bigMap.unit["林分"] }}</el-descriptions-item>
        <el-descriptions-item label="坡位">{{ bigMap.unit["坡位"] }}</el-descriptions-item>
        <el-descriptions-item label="影响指数">{{ bigMap.unit["影响性"] }}</el-descriptions-item>
        <el-descriptions-item label="影响程度">
          <el-tag :type="getTagType(bigMap.unit['影响性'])">{{
              (function (value) {
                value = parseFloat(value)
                if (value <= 2.1)
                  return "轻微影响"
                else if (value <= 2.8)
                  return "一般影响"
                else
                  return "严重影响"
              }(bigMap.unit["影响性"]))
            }}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </box>
</template>

<script setup>
import Box from "@/components/Box";
import ImpactMap from "@/components/vegetation/ImpactMap";
import ImpactMapDetail from "@/components/vegetation/ImpactMapDetail";
import {provide, reactive, watch} from "vue";
import mapboxgl from "mapbox-gl";

const bigMap = reactive({
  map: "",
  unit: "",
  southWest: "",
  northEast: ""
})
provide("ImpactMap", bigMap)
const detailMap = reactive({
  map: ""
})
provide("ImpactMapDetail", detailMap)

watch(() => bigMap.unit["OBJECTID"], (newValue, oldValue) => {
  detailMap.map.setFilter("impact", ["in", "OBJECTID", newValue])
  detailMap.map.setFilter("label", ["in", "OBJECTID", newValue])
  detailMap.map.setFilter("prevent", ["in", "OBJECTID", newValue])
  detailMap.map.fitBounds(new mapboxgl.LngLatBounds(bigMap["southWest"], bigMap["northEast"]))
})

const getTagType = function (num) {
  num = parseFloat(num)
  if (num <= 2.1) {
    return "success"
  } else if (num < 2.8) {
    return "warning"
  } else {
    return "danger"
  }
}

</script>

<style scoped>

</style>