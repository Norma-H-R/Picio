<template>
  <div class="title-bar">
    <div class="left-controls">
      <div class="title-text" @click="$emit('toggle-sidebar')">PICIO</div>
    </div>
    <div>系统时间:{{ currentTime }}</div>
    <div class="window-controls">
      <button @click="minimize">🗕</button>
      <button @click="toggleMaximize">🗖</button>
      <button @click="close">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const minimize = () => window.electronAPI.send('window-control', 'minimize');

const toggleMaximize = () => window.electronAPI.send('window-control', 'toggle-maximize');
const close = () => window.electronAPI.send('window-control', 'close');
const currentTime = ref(new Date().toLocaleTimeString())

onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)
})
</script>

<style scoped>
.title-text {
  margin-left: 14px;
  font-family: 'Font3', sans-serif;
  -webkit-app-region: no-drag;
  user-select: none;
}
.left-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  -webkit-app-region: drag;
}

.title-bar {
  height: 50px;
  background: #2b2b2b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  -webkit-app-region: drag;
}

.window-controls {
  -webkit-app-region: no-drag;
  display: flex;
  gap: 8px;
}

button {
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0px;
  font-size: 14px;
  -webkit-app-region: no-drag;
}

button:active,
button:focus {
  border: none !important;
  outline: none !important;
}

button:hover {
  background: rgba(255,255,255,0.1);
}
</style>