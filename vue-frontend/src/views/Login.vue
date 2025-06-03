<template>
  <el-card class="login-card">
    <h2>用户登录</h2>
    <el-form>
      <el-form-item label="用户名">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
</script>

<style scoped>
.login-card {
  max-width: 400px;
  margin: 80px auto;
  padding: 32px 24px;
}
</style>
