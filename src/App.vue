<script setup>
import {onMounted, ref} from "vue";
import ImpactBox from "@/components/vegetation/ImpactBox";
import ProtectBox from "@/components/vegetation/ProtectBox";
import TownPreventBox from "@/components/town/TownPreventBox";
import TownProtectBox from "@/components/town/TownProtectBox";
import SusceptibilityBox from "@/components/susceptibility/SusceptibilityBox";
import axios from "axios";

const componentList = {ImpactBox, ProtectBox, TownPreventBox, TownProtectBox, SusceptibilityBox}
const key = ref("SusceptibilityBox")
const flag = ref(true)
onMounted(() => {
  axios({
    method: "get",
    url: "/geojson/植被.geojson"
  }).then(() => {
    flag.value = false
  })
})
</script>

<template>
  <el-container v-loading="flag" element-loading-text="资源加载中">
    <el-header>
      <el-tabs v-model="key">
        <el-tab-pane name="SusceptibilityBox">
          <template #label>
            <span style="font-size: 24px;font-weight: bold">永嘉县易发性评价结果</span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="ImpactBox">
          <template #label>
            <span style="font-size: 24px;font-weight: bold">植被影响性</span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="ProtectBox">
          <template #label>
            <span style="font-size: 24px;font-weight: bold">植被易损性</span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="TownPreventBox">
          <template #label>
            <span style="font-size: 24px;font-weight: bold">乡镇影响性</span>
          </template>
        </el-tab-pane>
        <el-tab-pane name="TownProtectBox">
          <template #label>
            <span style="font-size: 24px;font-weight: bold">乡镇易损性</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-header>
    <el-main>
      <keep-alive>
        <component :is="componentList[key]"></component>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<style scoped>
</style>
