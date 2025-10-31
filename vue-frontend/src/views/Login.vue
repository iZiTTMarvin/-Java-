<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2 class="auth-title">{{ isLogin ? '欢迎登录' : '注册账号' }}</h2>
        <p class="auth-subtitle">{{ isLogin ? '请输入您的账号信息' : '创建您的智能家居账号' }}</p>
      </div>
      
      <el-form ref="formRef" :model="form" :rules="rules" class="auth-form">
        <el-form-item prop="username">
          <el-input 
            v-model="form.username" 
            placeholder="请输入用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item v-if="!isLogin" prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword" 
            type="password" 
            placeholder="请确认密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button 
            type="primary" 
            size="large" 
            @click="handleSubmit"
            class="auth-button"
            :loading="loading"
          >
            {{ isLogin ? '登录' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="auth-footer">
        <span>{{ isLogin ? '还没有账号？' : '已有账号？' }}</span>
        <el-button type="text" @click="toggleAuthMode">
          {{ isLogin ? '立即注册' : '返回登录' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

const router = useRouter();
const isLogin = ref(true);
const loading = ref(false);
const formRef = ref(null);

const form = reactive({
  username: '',
  password: '',
  confirmPassword: ''
});

const validateConfirmPassword = (rule, value, callback) => {
  if (!isLogin.value && value !== form.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在3-20个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在6-20个字符之间', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ]
});

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value;
  formRef.value?.resetFields();
};

const handleSubmit = async () => {
  try {
    await formRef.value.validate();
    loading.value = true;
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isLogin.value) {
      // 登录逻辑
      if (handleLogin()) {
        ElMessage.success('登录成功');
        router.push('/');
      }
    } else {
      // 注册逻辑
      if (handleRegister()) {
        ElMessage.success('注册成功，请登录');
        isLogin.value = true;
        formRef.value?.resetFields();
      }
    }
  } catch (error) {
    console.error('表单验证失败:', error);
  } finally {
    loading.value = false;
  }
};

const loadUsers = () => {
  const usersData = localStorage.getItem('smartHomeUsers');
  return usersData ? JSON.parse(usersData) : [];
};

const saveUsers = (users) => {
  localStorage.setItem('smartHomeUsers', JSON.stringify(users));
};

const handleLogin = () => {
  const users = loadUsers();
  const user = users.find(u => u.username === form.username && u.password === form.password);
  
  if (user) {
    const logged = { ...user, lastLogin: new Date().toISOString() };
    localStorage.setItem('currentUser', JSON.stringify(logged));
    return true;
  } else {
    ElMessage.error('用户名或密码错误');
    return false;
  }
};

const handleRegister = () => {
  const users = loadUsers();
  
  if (users.find(u => u.username === form.username)) {
    ElMessage.error('用户名已存在');
    return false;
  }
  
  const newUser = {
    username: form.username,
    password: form.password,
    registerTime: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  return true;
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-title {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.auth-subtitle {
  color: #666;
  font-size: 16px;
  margin: 0;
}

.auth-form {
  margin-bottom: 24px;
}

.auth-button {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.auth-footer {
  text-align: center;
  color: #666;
}

.auth-footer .el-button {
  padding: 0;
  margin-left: 4px;
  font-weight: 600;
}
</style>
