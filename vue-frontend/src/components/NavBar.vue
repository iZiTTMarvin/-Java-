<template>
  <el-header height="70px" class="navbar">
    <div class="logo-container">
      <div class="logo-icon">
        <el-icon><House /></el-icon>
      </div>
      <div class="logo-text">智能家居系统</div>
    </div>
    
    <el-menu mode="horizontal" :default-active="$route.path" class="nav-menu" @select="handleSelect">
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
    
    <div class="user-actions">
      <el-dropdown @command="handleUserCommand" trigger="click">
        <div class="user-avatar">
          <el-avatar :size="36" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="username">{{ currentUser?.username || '用户' }}</span>
          <el-icon class="dropdown-icon"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <el-icon><User /></el-icon>
              <span>个人资料</span>
            </el-dropdown-item>
            <el-dropdown-item command="settings">
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              <el-icon><SwitchButton /></el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElHeader, ElMenu, ElMenuItem, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon, ElAvatar, ElMessage } from 'element-plus';
import { House, HomeFilled, Monitor, User, Setting, SwitchButton, ArrowDown } from '@element-plus/icons-vue';

const router = useRouter();
const currentUser = ref(null);

onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    currentUser.value = JSON.parse(userData);
  }
});

const handleSelect = (index) => {
  router.push(index);
};

const handleUserCommand = (command) => {
  switch (command) {
    case 'profile':
      router.push('/profile');
      break;
    case 'settings':
      ElMessage.info('系统设置功能正在开发中');
      break;
    case 'logout':
      localStorage.removeItem('currentUser');
      ElMessage.success('已退出登录');
      router.push('/login');
      break;
  }
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container {
  display: flex;
  align-items: center;
  margin-right: 60px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-menu {
  flex: 1;
  background: transparent;
  border-bottom: none;
}

.nav-menu .el-menu-item {
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  padding: 0 20px;
  height: 70px;
  line-height: 70px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-menu .el-menu-item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  border-bottom-color: transparent;
}

.nav-menu .el-menu-item.is-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.15);
  border-bottom: 2px solid #fff;
}

.user-actions {
  margin-left: 20px;
}

.user-avatar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-avatar:hover {
  background: rgba(255, 255, 255, 0.2);
}

.username {
  color: #fff;
  font-weight: 500;
}

.dropdown-icon {
  color: rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease;
}

.user-avatar:hover .dropdown-icon {
  transform: rotate(180deg);
}

/* 下拉菜单样式 */
:deep(.el-dropdown-menu) {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: 8px;
}

:deep(.el-dropdown-menu__item) {
  border-radius: 8px;
  margin: 2px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

:deep(.el-dropdown-menu__item:hover) {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}
</style>
