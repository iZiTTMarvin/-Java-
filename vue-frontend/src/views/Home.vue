<template>
  <div class="dashboard">
    <section class="dashboard__header">
      <div>
        <p class="eyebrow">智能家居云管平台 · 系统总览</p>
        <h2>一屏掌控全屋设备运行状态</h2>
        <p class="description">
          打通照明、安防、环境、能源等多品类智能终端，实现统一调度、实时监控与策略联动。
        </p>
      </div>
      <el-button type="primary" size="large" round>
        新建自动化策略
      </el-button>
    </section>

    <el-row :gutter="24" class="dashboard__stats">
      <el-col v-for="item in quickStats" :key="item.title" :xs="24" :sm="12" :lg="6">
        <div class="stat-card" :class="`stat-card--${item.accent}`">
          <p class="stat-card__label">{{ item.title }}</p>
          <h3>{{ item.value }}</h3>
          <p class="stat-card__desc">{{ item.subtitle }}</p>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="dashboard__section">
      <el-col :xs="24" :lg="14">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>实时设备状态</h3>
                <p>查看关键设备的当前状态、运行模式与能耗表现。</p>
              </div>
              <el-tag type="success" effect="plain">同步刷新 · 15s</el-tag>
            </div>
          </template>
          <el-table :data="realtimeDevices" class="panel-table" border>
            <el-table-column prop="name" label="设备" min-width="160" />
            <el-table-column prop="room" label="所在空间" width="120" />
            <el-table-column label="状态" width="110">
              <template #default="scope">
                <el-tag :type="statusTagType(scope.row.status)" effect="dark">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="mode" label="模式" min-width="140" />
            <el-table-column prop="power" label="瞬时功耗" width="120" />
            <el-table-column prop="lastSync" label="最后同步" width="140" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="10">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>能源效率总览</h3>
                <p>通过实时能耗监控，实现精细化用能管理。</p>
              </div>
            </div>
          </template>
          <div class="energy-insights">
            <div v-for="item in energyInsights" :key="item.label" class="energy-item">
              <div class="energy-item__meta">
                <p>{{ item.label }}</p>
                <span>{{ item.value }}</span>
              </div>
              <el-progress :percentage="item.percentage" :stroke-width="10" :color="item.color" />
            </div>
          </div>
          <div class="environment-overview">
            <div v-for="metric in environmentMetrics" :key="metric.label" class="environment-card">
              <p class="environment-card__label">{{ metric.label }}</p>
              <h4>{{ metric.value }}</h4>
              <span>{{ metric.detail }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="dashboard__section">
      <el-col :xs="24" :lg="14">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>自动化场景执行</h3>
                <p>提前配置的生活场景按计划运行，保障舒适与安全。</p>
              </div>
            </div>
          </template>
          <el-table :data="automationScenes" class="panel-table" border>
            <el-table-column prop="name" label="场景名称" min-width="160" />
            <el-table-column prop="schedule" label="触发时间" width="140" />
            <el-table-column prop="devices" label="涉及设备" width="120" />
            <el-table-column label="执行情况" width="120">
              <template #default="scope">
                <el-tag :type="scope.row.status === '运行中' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="next" label="下一次执行" width="160" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="10">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>安防事件监控</h3>
                <p>记录并展示最新的门禁、摄像头与传感器反馈。</p>
              </div>
            </div>
          </template>
          <el-timeline class="security-timeline">
            <el-timeline-item
              v-for="event in securityTimeline"
              :key="event.time"
              :timestamp="event.time"
              :type="event.type"
            >
              <h4>{{ event.title }}</h4>
              <p>{{ event.detail }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const quickStats = ref([
  { title: '在线设备', value: '28', subtitle: '较昨日 +3 台', accent: 'primary' },
  { title: '自动化策略', value: '16', subtitle: '运行中 12 条', accent: 'violet' },
  { title: '今日节能', value: '18.6%', subtitle: '碳排放降低 3.1kg', accent: 'emerald' },
  { title: '安全事件', value: '0', subtitle: '连续 48h 无告警', accent: 'slate' }
]);

const realtimeDevices = ref([
  { name: '客厅全彩氛围灯', room: '客厅', status: '在线', mode: '昼夜自适应', power: '12.3 W', lastSync: '刚刚' },
  { name: '中央空调主机', room: '客餐厅', status: '在线', mode: '舒适节能', power: '864 W', lastSync: '1 分钟前' },
  { name: '主卧窗帘电机', room: '主卧', status: '待机', mode: '晨光缓开', power: '0.4 W', lastSync: '3 分钟前' },
  { name: '入户门锁', room: '玄关', status: '在线', mode: '指静脉识别', power: '待机', lastSync: '5 分钟前' }
]);

const energyInsights = ref([
  { label: '全屋今日能耗', value: '12.4 kWh', percentage: 58, color: '#2563eb' },
  { label: '照明能耗占比', value: '22%', percentage: 22, color: '#f97316' },
  { label: '环境与空调', value: '49%', percentage: 49, color: '#34d399' }
]);

const environmentMetrics = ref([
  { label: '室内温度', value: '23.5℃', detail: '舒适度较昨日提升 4%' },
  { label: '湿度水平', value: '47%', detail: '已在健康区间' },
  { label: '空气质量', value: 'AQI 12', detail: '新风系统运行中' }
]);

const automationScenes = ref([
  { name: '晨间起居灯光', schedule: '每日 06:30', devices: '6 个终端', status: '运行中', next: '明日 06:30' },
  { name: '离家布防模式', schedule: '工作日 09:00', devices: '8 个终端', status: '已执行', next: '今日 18:30 解除' },
  { name: '夜间安防巡检', schedule: '每日 22:30', devices: '5 个终端', status: '待触发', next: '今日 22:30' }
]);

const securityTimeline = ref([
  { time: '09:42', title: '远程门锁授权', detail: '为访客下发一次性动态密码', type: 'primary' },
  { time: '08:55', title: '客厅摄像头 AI 识别', detail: '检测到家人到家，自动关闭防护', type: 'success' },
  { time: '00:12', title: '庭院红外探测', detail: '轻微触发，系统已自动复位', type: 'warning' }
]);

const statusTagType = (status) => {
  if (status === '在线') return 'success';
  if (status === '待机') return 'info';
  return 'warning';
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dashboard__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(17, 24, 39, 0.18));
  border: 1px solid rgba(37, 99, 235, 0.22);
  box-shadow: var(--shadow-soft);
}

.eyebrow {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.12em;
  color: #1e3a8a;
  text-transform: uppercase;
}

.dashboard__header h2 {
  margin: 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
}

.description {
  margin: 0;
  color: var(--color-muted);
  max-width: 560px;
  line-height: 1.7;
}

.dashboard__section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard__stats .stat-card {
  padding: 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(148, 163, 184, 0.24);
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard__stats .stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -18px rgba(37, 99, 235, 0.25);
}

.stat-card__label {
  margin: 0;
  font-size: 14px;
  color: var(--color-muted);
}

.stat-card h3 {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
}

.stat-card__desc {
  margin: 0;
  font-size: 13px;
  color: #334155;
}

.stat-card--primary {
  background: linear-gradient(160deg, rgba(37, 99, 235, 0.12), rgba(191, 219, 254, 0.45));
}

.stat-card--violet {
  background: linear-gradient(160deg, rgba(129, 140, 248, 0.16), rgba(196, 181, 253, 0.38));
}

.stat-card--emerald {
  background: linear-gradient(160deg, rgba(16, 185, 129, 0.12), rgba(167, 243, 208, 0.4));
}

.stat-card--slate {
  background: linear-gradient(160deg, rgba(100, 116, 139, 0.16), rgba(226, 232, 240, 0.62));
}

.panel {
  border-radius: var(--radius-lg);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.panel__header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.panel__header p {
  margin: 4px 0 0;
  color: var(--color-muted);
  font-size: 13px;
}

.panel-table {
  --el-table-border-color: rgba(148, 163, 184, 0.18);
  --el-table-header-bg-color: rgba(241, 245, 249, 0.9);
}

.energy-insights {
  display: grid;
  gap: 18px;
}

.energy-item__meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 6px;
}

.environment-overview {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.environment-card {
  padding: 16px;
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.16);
}

.environment-card__label {
  margin: 0;
  font-size: 13px;
  color: var(--color-muted);
}

.environment-card h4 {
  margin: 6px 0 4px;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}

.environment-card span {
  font-size: 12px;
  color: #475569;
}

.security-timeline {
  max-height: 360px;
  overflow-y: auto;
}

.security-timeline :deep(.el-timeline-item__content h4) {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
}

.security-timeline :deep(.el-timeline-item__content p) {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

@media (max-width: 1200px) {
  .dashboard__header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 768px) {
  .dashboard__stats {
    gap: 18px;
  }

  .dashboard__header {
    padding: 24px;
  }
}
</style>
