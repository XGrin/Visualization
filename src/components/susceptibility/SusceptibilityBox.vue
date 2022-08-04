<template>
  <box>
    <template #map>
      <susceptibility-map style="width: 100%;height: 87vh"></susceptibility-map>
    </template>
    <template #mapDetail>
      <div style="height: 100%;width: 100%;text-align: center">
        <el-image src="/image/饼图.png" style="height: 30vh"></el-image>
      </div>
    </template>
    <template #mapInfo>
      <el-image src="/image/title.png"></el-image>
      <el-divider/>
      <el-image src="/image/text.png"></el-image>
    </template>
  </box>
</template>

<script setup>
import Box from "@/components/Box";
import SusceptibilityMap from "@/components/susceptibility/SusceptibilityMap";</script>

<style scoped>

</style>