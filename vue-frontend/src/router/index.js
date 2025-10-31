import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import DeviceManager from '../views/DeviceManager.vue';
import UserProfile from '../views/UserProfile.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/devices', name: 'DeviceManager', component: DeviceManager },
  { path: '/profile', name: 'UserProfile', component: UserProfile }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isPublic = to.path === '/login';
  const hasUser = !!localStorage.getItem('currentUser');
  if (!isPublic && !hasUser) return next('/login');
  if (isPublic && hasUser) return next('/');
  next();
});

export default router;
