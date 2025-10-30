<template>
  <div id="app" :class="{ 'auth-layout': isAuthLayout }">
    <router-view v-if="isAuthLayout" />
    <div v-else class="shell">
      <NavBar />
      <div class="shell__body">
        <SideBar />
        <main class="shell__content">
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';

const route = useRoute();
const isAuthLayout = computed(() => route.meta?.layout === 'auth');
</script>

<style>
#app.auth-layout {
  background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 55%),
    radial-gradient(circle at bottom right, rgba(37, 99, 235, 0.22), transparent 45%),
    linear-gradient(142deg, #0f172a, #1d4ed8 55%, #312e81 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
}

.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.03) 0%, rgba(255, 255, 255, 0.75) 60%, #f5f7fb 100%);
}

.shell__body {
  display: flex;
  flex: 1;
  min-height: calc(100vh - 64px);
  backdrop-filter: blur(6px);
}

.shell__content {
  flex: 1;
  padding: 32px;
  background: transparent;
}

@media (max-width: 1024px) {
  .shell__body {
    flex-direction: column;
  }
}
</style>
