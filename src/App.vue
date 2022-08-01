<script setup>
import {ref} from "vue";
import VegetationBox from "@/components/vegetation/VegetationBox";

const content = ref("Vegetation")
</script>

<template>
  <el-container v-loading="false" element-loading-text="资源加载中">
    <el-header>
    </el-header>
    <el-main>
      <keep-alive>
        <vegetation-box></vegetation-box>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<style scoped>
</style>
