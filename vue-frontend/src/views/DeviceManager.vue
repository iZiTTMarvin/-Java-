<template>
  <div>
    <h2>设备管理</h2>
    <el-table :data="devices" style="width: 100%">
      <el-table-column prop="name" label="设备名称" width="180" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="success">开</el-button>
          <el-button size="small" type="danger">关</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const devices = ref([
  { name: '客厅灯', status: '已关闭' },
  { name: '空调', status: '已开启' }
]);
</script>
