import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DeviceManager from '../views/DeviceManager.vue';
import UserProfile from '../views/UserProfile.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login, meta: { layout: 'auth', title: '用户登录' } },
  { path: '/register', name: 'Register', component: Register, meta: { layout: 'auth', title: '用户注册' } },
  { path: '/', name: 'Home', component: Home, meta: { title: '系统总览', activeMenu: '/' } },
  { path: '/devices', name: 'DeviceManager', component: DeviceManager, meta: { title: '设备控制中心', activeMenu: '/devices' } },
  { path: '/profile', name: 'UserProfile', component: UserProfile, meta: { title: '个人与安全设置', activeMenu: '/profile' } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
