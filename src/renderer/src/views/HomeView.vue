<template>
  <div class="home">
    <h1>Welcome to Picio</h1>
    <div class="button-group">
      <button
        class="notify-btn"
        @click="
          handleAddNotification({
            title: '成功',
            message: '操作成功完成',
            type: 'success'
          })
        "
      >
        成功通知
      </button>
      <button
        class="notify-btn error"
        @click="handleAddNotification({ title: '错误', message: '发生未知错误', type: 'error' })"
      >
        错误通知
      </button>
      <button
        class="notify-btn warning"
        @click="
          handleAddNotification({
            title: '警告',
            message: '磁盘空间不足',
            type: 'warning',
            duration: 80000
          })
        "
      >
        警告通知
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const notification = inject('notification')
const handleAddNotification = (config) => {
  notification.value?.addNotification(config)
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}
.button-group {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}
.notify-btn {
  padding: 8px 16px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  margin: 8px;
}
.notify-btn:hover {
  opacity: 0.9;
}

.notify-btn.error {
  background: #f44336;
}

.notify-btn.warning {
  background: #ff9800;
}
</style>
