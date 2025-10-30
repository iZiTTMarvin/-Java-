<template>
  <div class="auth-shell">
    <div class="auth-card">
      <section class="auth-card__aside">
        <h1>云端智控，链接美好生活</h1>
        <p>Responsive 云端架构，保障全屋设备互联互通与数据安全，打造极致的智慧居住体验。</p>
        <ul>
          <li>
            <span class="dot dot--blue"></span>
            <span>一站式掌控照明、安防、环境与能源设备</span>
          </li>
          <li>
            <span class="dot dot--purple"></span>
            <span>AI 行为学习与自动化策略匹配</span>
          </li>
          <li>
            <span class="dot dot--green"></span>
            <span>多重加密与零信任访问体系保护隐私</span>
          </li>
        </ul>
      </section>
      <section class="auth-card__form">
        <header>
          <h2>登录 Aurora Smart Home</h2>
          <p>请使用您的账号以继续管理家庭智能设备。</p>
        </header>
        <el-form :model="form" label-position="top" class="auth-form">
          <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名" size="large" clearable />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              show-password
            />
          </el-form-item>
          <div class="auth-form__meta">
            <el-switch v-model="form.remember" active-text="记住设备" inactive-text="临时访问" />
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
          <el-button type="primary" size="large" round block @click="handleLogin">
            立即登录
          </el-button>
          <p class="auth-form__footer">
            还没有账号？
            <el-link type="primary" :underline="false" @click="router.push('/register')">马上注册</el-link>
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
const form = reactive({ username: '', password: '', remember: true });

const handleLogin = () => {
  ElMessage.success('登录请求已发送（示例）');
  router.push('/');
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
  gap: 0;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  background: rgba(255, 255, 255, 0.92);
}

.auth-card__aside {
  padding: 64px 56px;
  background: linear-gradient(140deg, rgba(96, 165, 250, 0.9), rgba(30, 64, 175, 0.98));
  color: white;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.auth-card__aside h1 {
  margin: 0;
  font-size: 32px;
  line-height: 1.2;
  font-weight: 700;
}

.auth-card__aside p {
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  opacity: 0.88;
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
  padding: 64px 56px;
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
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.auth-form__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    padding: 48px 32px;
  }
}
</style>
