<template>
  <el-card shadow="always" :body-style="{ padding: '10px'}">
    <el-row justify="center" style="margin-bottom: 5px">
      <el-col :span="24"><span
          style="width: 100%;height: 100%;text-align: center;display:block;">{{ options.title }}</span></el-col>
    </el-row>
    <el-row v-for="item in options.content" justify="space-between" :gutter="20">
      <el-col :span="4">
        <el-avatar shape="square" size="small">
          <div v-if="!item.hasOwnProperty('img')" :style="{background:item.color,width:'100%',height:'100%'}"/>
          <el-image v-else :src="item.img"></el-image>
        </el-avatar>
      </el-col>
      <el-col :span="16"><span style="white-space: nowrap;float: right">{{ item.text }}</span></el-col>
    </el-row>
  </el-card>
</template>

<script setup>
import {inject} from "vue";

const options = inject("options")
</script>

<style scoped>

</style>