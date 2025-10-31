<template>
  <el-aside width="260px" class="sidebar">
    <div class="sidebar-header">
      <h3>控制面板</h3>
      <p class="sidebar-subtitle">智能家居管理</p>
    </div>
    
    <el-menu :default-active="$route.path" router class="sidebar-menu">
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      
      <el-menu-item index="/devices">
        <el-icon><Monitor /></el-icon>
        <span>设备管理</span>
      </el-menu-item>
      
      <el-menu-item index="/profile">
        <el-icon><User /></el-icon>
        <span>用户信息</span>
      </el-menu-item>
    </el-menu>
    
    <div class="sidebar-footer">
      <div class="system-status">
        <div class="status-item">
          <div class="status-dot online"></div>
          <span>系统运行正常</span>
        </div>
        <div class="status-info">
          <small>版本: 1.0.0</small>
        </div>
      </div>
    </div>
  </el-aside>
</template>

<script setup>
import { ElAside, ElMenu, ElMenuItem, ElIcon } from 'element-plus';
import { HomeFilled, Monitor, User } from '@element-plus/icons-vue';
</script>

<style scoped>
.sidebar {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.08);
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  text-align: center;
}

.sidebar-header h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.sidebar-subtitle {
  margin: 0;
  font-size: 12px;
  color: #666;
}

.sidebar-menu {
  flex: 1;
  padding: 16px 12px;
  border-right: none;
  background: transparent;
}

.sidebar-menu .el-menu-item {
  margin: 4px 0;
  border-radius: 12px;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  color: #555;
  font-weight: 500;
}

.sidebar-menu .el-menu-item:hover {
  background: rgba(102, 126, 234, 0.08);
  color: #667eea;
  transform: translateX(4px);
}

.sidebar-menu .el-menu-item.is-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.sidebar-menu .el-menu-item .el-icon {
  font-size: 18px;
}

.sidebar-footer {
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

.system-status {
  text-align: center;
}

.status-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #555;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status-dot.online {
  background: #67c23a;
  box-shadow: 0 0 8px rgba(103, 194, 58, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 8px rgba(103, 194, 58, 0.5);
  }
  50% {
    box-shadow: 0 0 12px rgba(103, 194, 58, 0.8);
  }
  100% {
    box-shadow: 0 0 8px rgba(103, 194, 58, 0.5);
  }
}

.status-info {
  font-size: 10px;
  color: #999;
}
</style>
