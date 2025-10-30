<template>
  <el-header height="64px" class="navbar">
    <div class="navbar__brand">
      <div class="navbar__logo">Aurora Home</div>
      <div class="navbar__project">智能家居中央控制平台</div>
    </div>
    <el-menu
      mode="horizontal"
      :default-active="activePath"
      @select="handleSelect"
      class="navbar__menu"
      background-color="transparent"
      text-color="#dbeafe"
      active-text-color="#ffffff"
    >
      <el-menu-item index="/">系统总览</el-menu-item>
      <el-menu-item index="/devices">设备控制</el-menu-item>
      <el-menu-item index="/profile">个人中心</el-menu-item>
    </el-menu>
    <div class="navbar__actions">
      <div class="navbar__status">
        <span class="status-dot"></span>
        <span>系统稳定运行</span>
      </div>
      <el-button type="primary" round plain @click="router.push('/login')">
        退出登录
      </el-button>
    </div>
  </el-header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const activePath = computed(() => route.meta?.activeMenu || route.path);

const handleSelect = (path) => {
  if (path && path !== route.path) {
    router.push(path);
  }
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(92deg, rgba(30, 64, 175, 0.95), rgba(59, 130, 246, 0.88));
  display: flex;
  align-items: center;
  padding: 0 32px;
  box-shadow: 0 18px 45px rgba(30, 64, 175, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.navbar__brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 48px;
  color: #eff6ff;
}

.navbar__logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.navbar__project {
  font-size: 12px;
  opacity: 0.75;
}

.navbar__menu {
  flex: 1;
  border-bottom: none;
}

.navbar__menu :deep(.el-menu-item) {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 18px;
  color: #e0f2fe;
}

.navbar__status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.25);
}

@media (max-width: 1200px) {
  .navbar {
    flex-wrap: wrap;
    height: auto;
    padding: 16px 24px;
  }

  .navbar__menu {
    order: 3;
    width: 100%;
    margin-top: 12px;
    border-radius: 16px;
    background: rgba(30, 64, 175, 0.32);
    padding: 6px;
  }

  .navbar__actions {
    order: 2;
  }
}
</style>
