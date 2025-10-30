<template>
  <div class="profile">
    <section class="profile__header">
      <div class="profile__avatar">
        <div class="avatar">SC</div>
        <div>
          <h2>宋晨 · 智慧家庭管理员</h2>
          <p>负责家庭成员权限管理、设备策略调度与安全维护。</p>
          <el-tag effect="dark" type="success">超级管理员</el-tag>
        </div>
      </div>
      <div class="profile__score">
        <p>账户安全指数</p>
        <div class="profile__score-value">92</div>
        <el-progress :percentage="92" :stroke-width="12" color="#22c55e" />
      </div>
    </section>

    <el-row :gutter="24" class="profile__section">
      <el-col :xs="24" :lg="12">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <h3>基础信息</h3>
              <el-tag type="info" effect="plain">信息已完善</el-tag>
            </div>
          </template>
          <el-descriptions :column="1" border>
            <el-descriptions-item label="用户名">aurora_admin</el-descriptions-item>
            <el-descriptions-item label="绑定邮箱">aurora@example.com</el-descriptions-item>
            <el-descriptions-item label="手机号">+86 138 **** 5688</el-descriptions-item>
            <el-descriptions-item label="家庭空间">滨江 · 星河湾智能样板间</el-descriptions-item>
            <el-descriptions-item label="角色权限">全屋管理、成员维护、策略编排</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="12">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <h3>账号安全</h3>
              <el-tag type="success" effect="dark">保护中</el-tag>
            </div>
          </template>
          <ul class="security-list">
            <li v-for="item in securityChecklist" :key="item.label">
              <div>
                <h4>{{ item.label }}</h4>
                <p>{{ item.detail }}</p>
              </div>
              <el-tag :type="item.type" effect="plain">{{ item.status }}</el-tag>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="profile__section">
      <el-col :xs="24" :lg="10">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <h3>个性化偏好</h3>
              <el-tag type="primary" effect="plain">AI 自适应中</el-tag>
            </div>
          </template>
          <div class="preference-list">
            <div v-for="pref in preferences" :key="pref.title" class="preference-item">
              <div class="preference-item__meta">
                <h4>{{ pref.title }}</h4>
                <p>{{ pref.detail }}</p>
              </div>
              <el-tag :type="pref.tagType" size="small" effect="dark">{{ pref.state }}</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :lg="14">
        <el-card class="panel" shadow="hover">
          <template #header>
            <div class="panel__header">
              <h3>近期操作记录</h3>
              <el-tag type="info" effect="plain">最近 24 小时</el-tag>
            </div>
          </template>
          <el-timeline class="profile__timeline">
            <el-timeline-item v-for="log in activityLogs" :key="log.time" :timestamp="log.time" :type="log.type">
              <h4>{{ log.title }}</h4>
              <p>{{ log.detail }}</p>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const securityChecklist = ref([
  { label: '登录保护', detail: '双因素认证已启用，登录需短信与指纹验证。', status: '已开启', type: 'success' },
  { label: '数据加密', detail: '云端数据采用端到端加密存储与传输。', status: '强加密', type: 'primary' },
  { label: '登录设备管理', detail: '2 台可信设备，1 台临时授权。', status: '已审核', type: 'info' }
]);

const preferences = ref([
  { title: '居家场景偏好', detail: '偏好暖白光与舒缓音乐，已自动调度。', state: '优先执行', tagType: 'warning' },
  { title: '节能策略', detail: '工作日自动进入离家节能模式。', state: '节能中', tagType: 'success' },
  { title: '安防敏感度', detail: '夜间自动提高门窗传感器灵敏度。', state: '高级', tagType: 'danger' }
]);

const activityLogs = ref([
  { time: '09:35', title: '更新离家模式策略', detail: '调整照明联动设备，新增玄关感应灯。', type: 'primary' },
  { time: '08:12', title: '审核家庭成员访问请求', detail: '批准家属在周末访问娱乐室的权限。', type: 'success' },
  { time: '昨晚 22:16', title: '查看夜间巡检报告', detail: '确认摄像头热成像告警，判定为误触。', type: 'warning' }
]);
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.profile__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.12), rgba(56, 189, 248, 0.18));
  border: 1px solid rgba(14, 165, 233, 0.32);
  box-shadow: var(--shadow-soft);
}

.profile__avatar {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: rgba(59, 130, 246, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: #1d4ed8;
}

.profile__avatar h2 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
}

.profile__avatar p {
  margin: 0 0 12px;
  color: var(--color-muted);
}

.profile__score {
  min-width: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.profile__score p {
  margin: 0;
  font-size: 14px;
  color: #1f2937;
}

.profile__score-value {
  font-size: 36px;
  font-weight: 700;
  color: #22c55e;
}

.panel {
  border-radius: var(--radius-lg);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel__header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.security-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.security-list li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 4px;
  border-bottom: 1px dashed rgba(148, 163, 184, 0.3);
}

.security-list li:last-child {
  border-bottom: none;
}

.security-list h4 {
  margin: 0 0 6px;
  font-size: 15px;
}

.security-list p {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

.preference-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preference-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 12px;
  border-radius: 16px;
  background: rgba(248, 250, 252, 0.95);
  border: 1px solid rgba(148, 163, 184, 0.18);
}

.preference-item__meta h4 {
  margin: 0 0 6px;
  font-size: 15px;
}

.preference-item__meta p {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

.profile__timeline {
  max-height: 320px;
  overflow-y: auto;
}

.profile__timeline :deep(.el-timeline-item__content h4) {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
}

.profile__timeline :deep(.el-timeline-item__content p) {
  margin: 0;
  font-size: 13px;
  color: #475569;
}

@media (max-width: 960px) {
  .profile__header {
    padding: 24px;
  }

  .profile__score {
    width: 100%;
    align-items: flex-start;
  }
}
</style>
