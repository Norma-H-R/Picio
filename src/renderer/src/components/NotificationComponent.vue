<script setup>
import { ref } from 'vue'

const notifications = ref([])

defineExpose({
  addNotification: (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      visible: true
    }
    notifications.value.push(newNotification)
    const currentId = newNotification.id
    setTimeout(() => {
      removeNotification(currentId)
    }, notification.duration || 3000)
  }
})
const removeNotification = (id) => {
  const index = notifications.value.findIndex((n) => n.id === id)
  if (index !== -1) {
    notifications.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="notification-container">
    <transition-group name="notification" tag="div">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="notification.type"
      >
        <div class="notification-icon" :class="notification.type">
          <img :src="`/img/${notification.type}.svg`" alt="" />
        </div>
        <div class="notification-logo" :class="notification.type">picio</div>
        <div class="notification-content">
          <div class="notification-body">
            <h3>{{ notification.title }}</h3>
            <p>{{ notification.id }}</p>
            <p>{{ notification.message }}</p>
          </div>
          <div class="close-btn" @click="removeNotification(notification.id)">✕</div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.notification-logo {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);
  justify-content: center;
  align-items: center;
  z-index: -999;
  width: 100%;
  font-family: 'Font1', sans-serif;
  user-select: none;
  font-size: 40px;
}
.notification-icon {
  position: absolute;
  user-select: none;
  z-index: -998;
  left: 5px;
  display: flex;
  width: 30px;
  height: 30px;
  margin: auto;
  opacity: 0;
  animation: notification-icon 0.5s ease-in-out forwards;
}
.notification-icon img {
  width: 30px;
  height: 30px;
  margin: auto;
}
.notification-logo.success {
  color: #378039;
}
.notification-logo.error {
  color: #c0362c;
}
.notification-logo.warning {
  color: #d17e01;
}
.notification-container {
  position: fixed;
  top: 50px;
  right: 20px;
  z-index: 9999;
}
.notification {
  position: relative;
  margin-bottom: 6px;
  width: 300px;
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 120px;
  background-color: rgba(0, 255, 85);
  justify-content: right;
  border-radius: 16px;
  overflow: hidden;
  animation: notification 0.2s ease-in-out forwards;
}
.notification-content {
  width: 260px;
  height: 120px;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: left;
  align-items: center;
  animation: notification-content 2s ease-in-out forwards;
}
.notification-body {
  padding: 0 10px;
  color: #333;
  animation: notification-body 0.6s ease-in-out forwards;
  opacity: 0;
  animation-delay: 1s;
  overflow: hidden;
}
.notification-body H3 {
  margin: 6px 0;
}
.notification-body p {
  margin: 6px 0;
}
.notification-leave-active .notification-icon {
  animation: notification-icon-r 0.5s ease-in-out forwards;
}
.notification-leave-active {
  animation: notification-r 0.5s ease-in-out forwards 0.2s;
}
.notification-leave-active .notification-content {
  animation: notification-content-r 1s ease-in-out forwards;
}
.notification-leave-active .notification-body {
  animation: notification-body-r 0.2s ease-in-out forwards;
}
.notification.success {
  background-color: #00d707;
}
.notification.error {
  background-color: #ff1200;
}
.notification.warning {
  background-color: #ffa500;
}
.close-btn {
  user-select: none;
  margin-left: auto;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  width: 40px;
  height: 40px;
}
.close-btn:hover {
  color: #333;
}
@keyframes notification-icon {
  from {
    opacity: 0;
    transform: translateX(300px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes notification {
  from {
    opacity: 0;
    transform: translateX(300px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes notification-content {
  0% {
    width: 60px;
    transform: translateX(300px);
  }
  25% {
    width: 60px;
    transform: translateX(-260px);
  }
  50% {
    width: 260px;
    transform: translateX(0px);
  }
  75% {
    width: 260px;
    transform: translateX(0px);
  }
  100% {
    width: 260px;
    transform: translateX(0px);
  }
}
@keyframes notification-body {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes notification-icon-r {
  from {
    opacity: 1;
    transform: translateX(0px);
  }
  to {
    transform: translateX(340px);
  }
}
@keyframes notification-r {
  from {
    opacity: 1;
    transform: translateX(0px);
    justify-content: left;
  }
  to {
    opacity: 0;
    transform: translateX(340px);
    justify-content: left;
  }
}
@keyframes notification-content-r {
  0% {
    width: 260px;
    transform: translateX(0px);
  }
  25% {
    width: 300px;
    transform: translateX(0px);
  }
  50% {
    width: 60px;
    transform: translateX(0px);
  }
  100% {
    width: 60px;
    transform: translateX(260px);
  }
}
@keyframes notification-body-r {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
