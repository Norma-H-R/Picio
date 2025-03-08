<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import CustomTitleBar from './components/CustomTitleBar.vue'
import SideBar from './components/SideBar.vue'
import NotificationComponent from './components/NotificationComponent.vue'



const isSidebarVisible = ref(true)
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}
const notification = ref(null)
const handleAddNotification = (config) => {
  notification.value?.addNotification(config)
}
</script>

<template>
  <CustomTitleBar @toggle-sidebar="toggleSidebar" />
    <div class="main-container">
    <SideBar :is-visible="isSidebarVisible" />
    <div class="content">
      <NotificationComponent ref="notification" />
      <div class="button-group">
        <button class="notify-btn" @click="handleAddNotification({ title: '成功', message: '操作成功完成', type: 'success' })">成功通知</button>
        <button class="notify-btn error" @click="handleAddNotification({ title: '错误', message: '发生未知错误', type: 'error' })">错误通知</button>
        <button class="notify-btn warning" @click="handleAddNotification({ title: '警告', message: '磁盘空间不足', type: 'warning', duration: 8000 })">警告通知</button>
      </div>
      <div class="aaa"> 测试数据</div>
      <div class="aaa"> <img src="../src/assets/img/user.svg" alt=""></div>
      <div class="aaa"> 测试数据</div>
      <div class="aaa"> 测试数据</div>
      <div class="aaa"> 测试数据</div>
      <div class="backgroundword">
          <HelloWorld msg="Picio" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  height: 100%;
  margin: 0px;
  margin-top: 50px;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.content {
  padding: 0px;
  flex-grow: 1;
  transition: all 0.2s ease;
}
.content {
  position: relative;
  display: flex;
  min-height: calc(100vh - 50px);
  justify-content: center;
  align-items: center;
}
.backgroundword {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);
  justify-content: center;
  align-items: center;
  z-index: -999;
}

.notify-btn {
  padding: 8px 16px;
  background: #4CAF50;
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

.button-group {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
  z-index: 1000;
}
</style>
