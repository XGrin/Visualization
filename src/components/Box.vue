<template>
  <el-row justify="space-between">
    <el-col :span="18">
      <el-card style="height: 87vh" :body-style="{ padding: '0px' }">
        <slot name="map"></slot>
      </el-card>
    </el-col>
    <el-col :span="5">
      <el-row>
        <el-col :span="24">
          <el-card shadow="always" style="height: 56vh;margin-bottom: 1vh">
            <slot name="mapInfo"></slot>
          </el-card>
        </el-col>
        <el-col :span="24">
          <el-card style="height: 30vh" :body-style="{ padding: '0px' }">
            <slot name="mapDetail"></slot>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Box"
}
</script>

<style scoped>
</style>