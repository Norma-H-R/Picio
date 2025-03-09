<script setup>
import { ref, provide } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import CustomTitleBar from './components/CustomTitleBar.vue'
import SideBar from './components/SideBar.vue'
import NotificationComponent from './components/NotificationComponent.vue'

const isSidebarVisible = ref(true)
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}
const notification = ref(null)
provide('notification', notification)
</script>
<template>
  <CustomTitleBar @toggle-sidebar="toggleSidebar" />
  <div class="main-container">
    <SideBar :is-visible="isSidebarVisible" />
    <div class="content">
      <NotificationComponent ref="notification" />
      <router-view v-slot="{ Component }">
        <Transition name="route" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
      <!-- <div class="aaa">测试数据</div>
      <div class="aaa"><img src="../src/assets/img/user.svg" alt="" /></div>
      <div class="aaa">测试数据</div>
      <div class="aaa">测试数据</div>
      <div class="aaa">测试数据</div> -->
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
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 100%;
}

.route-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-50px);
  z-index: 0;
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
</style>
