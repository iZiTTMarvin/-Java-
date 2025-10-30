<template>
  <div class="auth-shell">
    <div class="auth-card">
      <section class="auth-card__aside auth-card__aside--register">
        <h1>创建专属智慧家居中心</h1>
        <p>注册一个账户以同步家庭成员、智能终端与自动化策略，体验一站式的智能生活方式。</p>
        <ul>
          <li>
            <span class="dot dot--blue"></span>
            <span>快速绑定家庭空间与智能设备</span>
          </li>
          <li>
            <span class="dot dot--purple"></span>
            <span>管理多用户权限与访问安全</span>
          </li>
          <li>
            <span class="dot dot--green"></span>
            <span>接入自动化流程与节能模式库</span>
          </li>
        </ul>
      </section>
      <section class="auth-card__form">
        <header>
          <h2>注册新账户</h2>
          <p>填写必要信息以开启您的智能家居体验。</p>
        </header>
        <el-form :model="form" label-position="top" class="auth-form">
          <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名" size="large" clearable />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入常用邮箱" size="large" clearable />
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.phone" placeholder="请输入手机号码" size="large" clearable />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" show-password />
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              size="large"
              show-password
            />
          </el-form-item>
          <el-button type="primary" size="large" round block @click="handleRegister">
            创建账户
          </el-button>
          <p class="auth-form__footer">
            已有账号？
            <el-link type="primary" :underline="false" @click="router.push('/login')">立即登录</el-link>
          </p>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({ username: '', email: '', phone: '', password: '', confirmPassword: '' });

const handleRegister = () => {
  if (!form.username || !form.email || !form.password) {
    ElMessage.warning('请完整填写注册信息');
    return;
  }
  if (form.password !== form.confirmPassword) {
    ElMessage.error('两次输入的密码不一致');
    return;
  }
  ElMessage.success('注册请求已发起（示例）');
  router.push('/login');
};
</script>

<style scoped>
.auth-shell {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
}

.auth-card {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  background: rgba(255, 255, 255, 0.94);
}

.auth-card__aside {
  padding: 64px 56px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: linear-gradient(140deg, rgba(236, 72, 153, 0.88), rgba(124, 58, 237, 0.95));
}

.auth-card__aside--register {
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.95), rgba(14, 165, 233, 0.94));
}

.auth-card__aside h1 {
  margin: 0;
  font-size: 32px;
  line-height: 1.25;
  font-weight: 700;
}

.auth-card__aside p {
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.9;
}

.auth-card__aside ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 16px;
}

.auth-card__aside li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.auth-card__form {
  padding: 48px 56px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
}

.auth-card__form header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.auth-card__form header p {
  margin: 8px 0 0;
  color: var(--color-muted);
}

.auth-form {
  display: grid;
  gap: 20px;
}

.auth-form__footer {
  text-align: center;
  color: var(--color-muted);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  flex-shrink: 0;
}

.dot--blue {
  background: #bfdbfe;
}

.dot--purple {
  background: #ddd6fe;
}

.dot--green {
  background: #bbf7d0;
}

@media (max-width: 960px) {
  .auth-card {
    grid-template-columns: 1fr;
  }

  .auth-card__aside {
    padding: 48px 32px;
  }

  .auth-card__form {
    padding: 48px 32px 56px;
  }
}
</style>
