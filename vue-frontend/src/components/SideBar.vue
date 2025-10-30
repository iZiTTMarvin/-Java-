<template>
  <el-aside width="260px" class="sidebar">
    <div class="sidebar__header">
      <p class="sidebar__subtitle">欢迎回来</p>
      <h3 class="sidebar__title">智能家居调度中心</h3>
      <p class="sidebar__hint">轻松管理照明、环境与安防设备。</p>
    </div>
    <el-menu
      :default-active="activePath"
      class="sidebar__menu"
      @select="handleSelect"
      background-color="transparent"
      text-color="#1e293b"
      active-text-color="#1d4ed8"
    >
      <el-menu-item index="/">
        <span>系统概览</span>
      </el-menu-item>
      <el-menu-item index="/devices">
        <span>设备控制中心</span>
      </el-menu-item>
      <el-menu-item index="/profile">
        <span>个人与安全设置</span>
      </el-menu-item>
    </el-menu>

    <div class="sidebar__panel">
      <h4>今日自动化场景</h4>
      <ul class="automation-list">
        <li>
          <span class="dot dot--blue"></span>
          <div>
            <strong>晨起唤醒模式</strong>
            <p>06:30 自动打开窗帘并缓升光照</p>
          </div>
        </li>
        <li>
          <span class="dot dot--green"></span>
          <div>
            <strong>离家节能模式</strong>
            <p>09:00 关闭非必要照明与空调</p>
          </div>
        </li>
        <li>
          <span class="dot dot--purple"></span>
          <div>
            <strong>夜间安防巡检</strong>
            <p>22:30 启动安防传感器巡逻</p>
          </div>
        </li>
      </ul>
    </div>
  </el-aside>
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
.sidebar {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(22px);
  border-right: 1px solid rgba(15, 23, 42, 0.06);
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 12px 0 42px -32px rgba(15, 23, 42, 0.25);
}

.sidebar__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar__subtitle {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: #64748b;
  text-transform: uppercase;
}

.sidebar__title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
}

.sidebar__hint {
  margin: 0;
  font-size: 13px;
  color: #64748b;
}

.sidebar__menu {
  border-right: none;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 20px;
  padding: 4px;
  background: rgba(248, 250, 252, 0.76);
}

.sidebar__menu :deep(.el-menu-item) {
  height: 48px;
  line-height: 48px;
  border-radius: 16px;
  margin: 4px 0;
  font-weight: 600;
}

.sidebar__menu :deep(.el-menu-item:hover) {
  background: rgba(37, 99, 235, 0.08);
}

.sidebar__menu :deep(.is-active) {
  box-shadow: var(--shadow-soft);
}

.sidebar__panel {
  padding: 20px;
  border-radius: var(--radius-lg);
  background: linear-gradient(168deg, rgba(14, 165, 233, 0.08), rgba(14, 116, 144, 0.12));
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: #0f172a;
}

.sidebar__panel h4 {
  margin: 0 0 14px;
  font-size: 15px;
  font-weight: 700;
}

.automation-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.automation-list li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.automation-list strong {
  display: block;
  font-weight: 600;
  font-size: 14px;
}

.automation-list p {
  margin: 2px 0 0;
  font-size: 12px;
  color: #475569;
}

.dot {
  margin-top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  box-shadow: 0 0 0 6px rgba(37, 99, 235, 0.12);
}

.dot--blue {
  background: #3b82f6;
}

.dot--green {
  background: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.12);
}

.dot--purple {
  background: #8b5cf6;
  box-shadow: 0 0 0 6px rgba(139, 92, 246, 0.12);
}

@media (max-width: 1024px) {
  .sidebar {
    width: 100% !important;
    flex-direction: column;
    box-shadow: none;
  }
}
</style>
