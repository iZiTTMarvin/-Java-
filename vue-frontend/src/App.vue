<template>
  <div id="app">
    <NavBar />
    <div class="container">
      <SideBar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
</script>

<style>
#app { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.container { display: flex; min-height: 100vh; }
.main-content { flex: 1; padding: 24px; background: #f5f7fa; }
</style>
