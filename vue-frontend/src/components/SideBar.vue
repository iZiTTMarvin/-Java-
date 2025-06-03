<template>
  <el-aside width="200px" class="sidebar">
    <el-menu :default-active="$route.path" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/devices">设备管理</el-menu-item>
      <el-menu-item index="/profile">用户信息</el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar {
  background: #fff;
  border-right: 1px solid #eee;
  min-height: 100vh;
}
</style>
