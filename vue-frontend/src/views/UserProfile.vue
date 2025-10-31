<template>
  <div class="user-profile-container">
    <h2>用户信息</h2>
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <span>个人资料</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="用户名">{{ currentUser?.username || '-' }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ currentUser?.email || '-' }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ formatTime(currentUser?.registerTime) }}</el-descriptions-item>
        <el-descriptions-item label="最后登录">{{ formatTime(currentUser?.lastLogin) }}</el-descriptions-item>
      </el-descriptions>
      
      <div class="profile-actions">
        <el-button type="primary">编辑资料</el-button>
        <el-button type="danger">注销账户</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElCard, ElDescriptions, ElDescriptionsItem, ElButton } from 'element-plus';

const currentUser = ref(null);
const formatTime = (t) => (t ? new Date(t).toLocaleString() : '-');

onMounted(() => {
  const data = localStorage.getItem('currentUser');
  if (data) currentUser.value = JSON.parse(data);
});
</script>

<style scoped>
.user-profile-container {
  padding: 20px;
}

.profile-card {
  max-width: 600px;
}

.card-header {
  font-weight: bold;
  font-size: 18px;
}

.profile-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
