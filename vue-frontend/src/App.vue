<template>
  <div id="app">
    <template v-if="$route.path !== '/login'">
      <NavBar />
      <div class="container">
        <SideBar />
        <main class="main-content">
          <router-view />
        </main>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  font-weight: 400;
}

.container {
  display: flex;
  min-height: calc(100vh - 60px);
  padding: 0;
  margin: 0;
}

.main-content {
  flex: 1;
  padding: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  margin: 24px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #333;
}

/* 全局样式优化 */
.el-card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.el-button {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.el-table {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.el-table th {
  background: rgba(102, 126, 234, 0.1);
  color: #333;
  font-weight: 600;
}

.el-table tr {
  transition: all 0.3s ease;
}

.el-table tr:hover {
  background: rgba(102, 126, 234, 0.05);
}

.el-input {
  border-radius: 8px;
}

.el-input__inner {
  border-radius: 8px;
}

.el-menu {
  border-right: none;
}

.el-menu-item {
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.3s ease;
}

.el-menu-item:hover {
  background: rgba(102, 126, 234, 0.1);
}

.el-menu-item.is-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.el-tag {
  border-radius: 6px;
  font-weight: 500;
}

.el-descriptions {
  border-radius: 12px;
  overflow: hidden;
}
</style>
