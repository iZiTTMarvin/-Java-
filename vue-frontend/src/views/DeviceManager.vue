<template>
  <div class="device-manager-container">
    <el-card class="device-card">
      <template #header>
        <div class="card-header">
          <span>设备管理</span>
          <el-button type="primary" size="small" @click="addDevice">添加设备</el-button>
        </div>
      </template>
      <el-table :data="devices" style="width: 100%" class="device-table">
        <el-table-column prop="name" label="设备名称" width="180">
          <template #default="scope">
            <div class="device-name">
              <el-icon><Monitor /></el-icon>
              <span>{{ scope.row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === '已开启' ? 'success' : 'danger'">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button 
              size="small" 
              :type="scope.row.status === '已开启' ? 'danger' : 'success'"
              @click="toggleDevice(scope.row)"
            >
              {{ scope.row.status === '已开启' ? '关闭' : '开启' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElTable, ElTableColumn, ElButton, ElTag, ElIcon, ElCard, ElMessageBox, ElMessage } from 'element-plus';
import { Monitor } from '@element-plus/icons-vue';

const devices = ref([]);

const loadDevices = () => {
  const data = localStorage.getItem('smartHomeDevices');
  return data ? JSON.parse(data) : null;
};

const saveDevices = (list) => {
  localStorage.setItem('smartHomeDevices', JSON.stringify(list));
};

onMounted(() => {
  const list = loadDevices() || [
    { name: '客厅灯', status: '已关闭' },
    { name: '空调', status: '已开启' }
  ];
  devices.value = list;
  saveDevices(list);
});

const toggleDevice = (device) => {
  device.status = device.status === '已开启' ? '已关闭' : '已开启';
  saveDevices(devices.value);
};

const addDevice = async () => {
  try {
    const { value } = await ElMessageBox.prompt('请输入设备名称', '添加设备', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /.+/,
      inputErrorMessage: '名称不能为空'
    });
    devices.value.push({ name: value, status: '已关闭' });
    saveDevices(devices.value);
    ElMessage.success('添加成功');
  } catch (e) {}
};
</script>

<style scoped>
.device-manager-container {
  padding: 20px;
}

.device-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.device-table {
  margin-top: 10px;
}

.device-name {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
