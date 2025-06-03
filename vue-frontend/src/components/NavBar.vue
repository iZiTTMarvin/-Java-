<template>
  <el-header height="60px" class="navbar">
    <div class="logo">智能家居系统</div>
    <el-menu mode="horizontal" :default-active="$route.path" class="nav-menu">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/devices">设备管理</el-menu-item>
      <el-menu-item index="/profile">用户信息</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped>
.navbar {
  background: #409EFF;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
}
.logo {
  font-size: 20px;
  font-weight: bold;
  margin-right: 40px;
}
.nav-menu {
  flex: 1;
}
</style>
