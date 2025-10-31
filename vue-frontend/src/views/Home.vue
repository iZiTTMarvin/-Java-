<template>
  <div class="home-container">
    <div class="welcome-section">
      <div class="welcome-card">
        <div class="welcome-header">
          <h2>欢迎回来，{{ currentUser?.username || '用户' }}</h2>
          <p>在这里，您可以便捷地管理和控制您的所有智能家居设备。</p>
        </div>
        
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-icon">
              <el-icon><Monitor /></el-icon>
            </div>
            <div class="stat-number">{{ deviceStats.total }}</div>
            <div class="stat-label">设备总数</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon online">
              <el-icon><Connection /></el-icon>
            </div>
            <div class="stat-number">{{ deviceStats.online }}</div>
            <div class="stat-label">在线设备</div>
          </div>
          
          <div class="stat-item">
            <div class="stat-icon offline">
              <el-icon><Close /></el-icon>
            </div>
            <div class="stat-number">{{ deviceStats.offline }}</div>
            <div class="stat-label">离线设备</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-section">
      <div class="dashboard-grid">
        <el-card class="dashboard-card">
          <template #header>
            <div class="card-header">
              <h3>快速操作</h3>
              <el-icon><Operation /></el-icon>
            </div>
          </template>
          <div class="quick-actions">
            <el-button 
              type="primary" 
              size="large" 
              class="action-btn"
              @click="router.push('/devices')"
            >
              <el-icon><Monitor /></el-icon>
              <span>设备管理</span>
            </el-button>
            <el-button 
              type="success" 
              size="large" 
              class="action-btn"
              @click="router.push('/devices')"
            >
              <el-icon><Plus /></el-icon>
              <span>添加设备</span>
            </el-button>
            <el-button 
              type="warning" 
              size="large" 
              class="action-btn"
            >
              <el-icon><Setting /></el-icon>
              <span>系统设置</span>
            </el-button>
          </div>
        </el-card>
        
        <el-card class="dashboard-card">
          <template #header>
            <div class="card-header">
              <h3>最近活动</h3>
              <el-icon><Clock /></el-icon>
            </div>
          </template>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon success">
                <el-icon><Check /></el-icon>
              </div>
              <div class="activity-content">
                <div class="activity-title">客厅灯已开启</div>
                <div class="activity-time">5分钟前</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon warning">
                <el-icon><Warning /></el-icon>
              </div>
              <div class="activity-content">
                <div class="activity-title">空调温度已调整</div>
                <div class="activity-time">15分钟前</div>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon info">
                <el-icon><InfoFilled /></el-icon>
              </div>
              <div class="activity-content">
                <div class="activity-title">新设备已连接</div>
                <div class="activity-time">30分钟前</div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElCard, ElButton, ElIcon } from 'element-plus';
import { Monitor, Connection, Close, Operation, Plus, Setting, Clock, Check, Warning, InfoFilled } from '@element-plus/icons-vue';

const router = useRouter();
const currentUser = ref(null);
const deviceStats = ref({
  total: 0,
  online: 0,
  offline: 0
});

const loadDevices = () => {
  const key = 'smartHomeDevices';
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  const seed = [
    { name: '客厅灯', status: '已关闭' },
    { name: '空调', status: '已开启' },
    { name: '卧室灯', status: '已关闭' }
  ];
  localStorage.setItem(key, JSON.stringify(seed));
  return seed;
};

onMounted(() => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    currentUser.value = JSON.parse(userData);
  }
  const devices = loadDevices();
  deviceStats.value.total = devices.length;
  deviceStats.value.online = devices.filter(d => d.status === '已开启').length;
  deviceStats.value.offline = devices.filter(d => d.status !== '已开启').length;
});
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  margin-bottom: 32px;
}

.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
}

.welcome-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 0;
}

.welcome-header {
  position: relative;
  z-index: 1;
}

.welcome-header h2 {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 700;
}

.welcome-header p {
  margin: 0;
  font-size: 18px;
  opacity: 0.9;
  max-width: 600px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 24px;
  margin-top: 40px;
  position: relative;
  z-index: 1;
}

.stat-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  font-size: 24px;
}

.stat-icon.online {
  background: rgba(103, 194, 58, 0.3);
}

.stat-icon.offline {
  background: rgba(245, 108, 108, 0.3);
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  opacity: 0.9;
}

.dashboard-section {
  margin-top: 32px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.dashboard-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  height: 50px;
  font-size: 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateX(5px);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.activity-icon.success {
  background: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}

.activity-icon.warning {
  background: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

.activity-icon.info {
  background: rgba(64, 158, 255, 0.1);
  color: #409eff;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.activity-time {
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .welcome-card {
    padding: 24px;
  }
  
  .welcome-header h2 {
    font-size: 24px;
  }
}
</style>
