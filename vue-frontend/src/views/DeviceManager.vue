<template>
  <div class="devices">
    <section class="devices__header">
      <div>
        <p class="eyebrow">智能家居云管平台 · 设备控制中心</p>
        <h2>全屋设备统一调度中枢</h2>
        <p class="description">
          通过场景策略、设备分组与远程控制能力，实现多品牌智能终端的高度协同与实时响应。
        </p>
      </div>
      <el-space wrap direction="vertical" alignment="end">
        <el-space wrap>
          <el-button round>批量控制</el-button>
          <el-button type="primary" round>添加新设备</el-button>
        </el-space>
        <el-tag effect="plain" type="success">已连接 {{ deviceTable.length }} 台设备</el-tag>
      </el-space>
    </section>

    <el-row :gutter="24" class="devices__section">
      <el-col :xs="24" :lg="16">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>关键设备运行明细</h3>
                <p>核心设备当前负载、运行模式及计划执行情况。</p>
              </div>
              <el-tag effect="dark" type="primary">实时监控</el-tag>
            </div>
          </template>
          <el-table :data="deviceTable" border class="panel-table">
            <el-table-column prop="name" label="设备名称" min-width="180" />
            <el-table-column prop="type" label="类型" width="110" />
            <el-table-column prop="room" label="所在空间" width="110" />
            <el-table-column label="状态" width="110">
              <template #default="scope">
                <el-tag :type="statusTagType(scope.row.status)">{{ scope.row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="mode" label="运行模式" min-width="140" />
            <el-table-column label="负载情况" min-width="180">
              <template #default="scope">
                <el-progress
                  :percentage="scope.row.load"
                  :stroke-width="8"
                  :color="scope.row.color"
                  :show-text="false"
                />
                <p class="table-hint">{{ scope.row.hint }}</p>
              </template>
            </el-table-column>
            <el-table-column prop="schedule" label="策略计划" width="160" />
            <el-table-column prop="lastOperate" label="最近操作" min-width="160" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="8">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>快捷控制面板</h3>
                <p>预置高频场景，一键完成多设备联动。</p>
              </div>
            </div>
          </template>
          <div class="quick-control">
            <div v-for="control in quickControls" :key="control.name" class="quick-control__item">
              <div class="quick-control__meta">
                <el-tag :type="control.tagType" effect="plain">{{ control.badge }}</el-tag>
                <h4>{{ control.name }}</h4>
                <p>{{ control.description }}</p>
              </div>
              <el-button round size="small" type="primary">立即执行</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="devices__section">
      <el-col :xs="24" :lg="10">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>房间分布概览</h3>
                <p>查看各房间设备运行概况与舒适度。</p>
              </div>
            </div>
          </template>
          <div class="room-grid">
            <div v-for="room in roomOverview" :key="room.name" class="room-card">
              <div class="room-card__header">
                <h4>{{ room.name }}</h4>
                <el-tag effect="plain" size="small" type="info">{{ room.scene }}</el-tag>
              </div>
              <div class="room-card__stats">
                <span>在线设备：{{ room.online }}</span>
                <span>待激活：{{ room.offline }}</span>
              </div>
              <p class="room-card__hint">舒适度：{{ room.comfort }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="14">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <div>
                <h3>设备健康与维护提醒</h3>
                <p>提前获知维护窗口，确保设备稳定运行。</p>
              </div>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="item in maintenanceTimeline"
              :key="item.time"
              :timestamp="item.time"
              :type="item.type"
            >
              <h4>{{ item.title }}</h4>
              <p>{{ item.detail }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const deviceTable = ref([
  {
    name: '客厅全彩灯带',
    type: '照明',
    room: '客厅',
    status: '在线',
    mode: '暖光居家',
    load: 68,
    color: '#f97316',
    hint: '当前亮度 68%，功耗 18W',
    schedule: '18:00-23:30 自动调光',
    lastOperate: '语音控制 · 5 分钟前'
  },
  {
    name: '中央空调主机',
    type: '空调',
    room: '客餐厅',
    status: '在线',
    mode: '舒适节能',
    load: 54,
    color: '#2563eb',
    hint: '压缩机负载 54%，节能模式',
    schedule: '全天候恒温调节',
    lastOperate: 'APP 远程调节 · 15 分钟前'
  },
  {
    name: '全屋新风系统',
    type: '环境',
    room: '全屋',
    status: '在线',
    mode: '自动换气',
    load: 36,
    color: '#34d399',
    hint: '风量 280 m³/h，PM2.5 优',
    schedule: '按空气质量自适应',
    lastOperate: '自动调度 · 2 分钟前'
  },
  {
    name: '入户智能门锁',
    type: '安防',
    room: '玄关',
    status: '在线',
    mode: '指静脉识别',
    load: 12,
    color: '#6366f1',
    hint: '待机功耗 0.5W，电量 92%',
    schedule: '24h 安全巡检',
    lastOperate: '访客授权 · 30 分钟前'
  }
]);

const quickControls = ref([
  {
    name: '一键离家模式',
    description: '关闭照明 & 空调，启动安防模式与节能策略。',
    badge: '节能优选',
    tagType: 'success'
  },
  {
    name: '影院沉浸体验',
    description: '调暗灯光、拉下窗帘、开启环绕音响与空调。',
    badge: '场景联动',
    tagType: 'primary'
  },
  {
    name: '夜间守护模式',
    description: '启动环境夜灯，增强摄像头巡检与门窗监测。',
    badge: '安防优先',
    tagType: 'danger'
  }
]);

const roomOverview = ref([
  { name: '客厅', online: 8, offline: 0, scene: '观影模式', comfort: '舒适 (98%)' },
  { name: '主卧', online: 5, offline: 1, scene: '睡眠模式', comfort: '恒温恒湿' },
  { name: '书房', online: 4, offline: 0, scene: '专注模式', comfort: '静音运行' },
  { name: '厨房', online: 3, offline: 0, scene: '烹饪模式', comfort: '油烟净化中' }
]);

const maintenanceTimeline = ref([
  { time: '本周五', title: '中央空调滤网维护', detail: '建议清洁空调滤网，保持高效运行。', type: 'warning' },
  { time: '本月 25 日', title: '新风系统耗材更换', detail: '检测到滤芯寿命低于 20%，建议预约更换。', type: 'info' },
  { time: '下月 08 日', title: '门锁电池健康检查', detail: '系统将执行门锁电池放电测试。', type: 'primary' }
]);

const statusTagType = (status) => {
  if (status === '在线') return 'success';
  if (status === '待机') return 'info';
  if (status === '告警') return 'danger';
  return 'warning';
};
</script>

<style scoped>
.devices {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.devices__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(79, 70, 229, 0.12));
  border: 1px solid rgba(99, 102, 241, 0.28);
  box-shadow: var(--shadow-soft);
}

.description {
  margin: 12px 0 0;
  color: var(--color-muted);
  max-width: 560px;
  line-height: 1.7;
}

.panel {
  border-radius: var(--radius-lg);
  border: 1px solid rgba(148, 163, 184, 0.2);
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
  --el-table-header-bg-color: rgba(241, 245, 249, 0.92);
}

.table-hint {
  margin: 6px 0 0;
  font-size: 12px;
  color: #64748b;
}

.quick-control {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.quick-control__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(248, 250, 252, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.quick-control__meta h4 {
  margin: 4px 0;
  font-size: 16px;
  font-weight: 600;
}

.quick-control__meta p {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.room-card {
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.room-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.room-card__header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.room-card__stats {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: #334155;
}

.room-card__hint {
  margin: 8px 0 0;
  font-size: 12px;
  color: #64748b;
}

@media (max-width: 1024px) {
  .devices__header {
    padding: 24px;
  }
}
</style>
