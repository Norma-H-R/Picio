<script setup>
import { ref, onMounted } from 'vue';
import menuItems from '../assets/menuItems.json';

defineProps({
  isVisible: Boolean
})

const menuData = ref([]);

onMounted(() => {
  menuData.value = menuItems;
});
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar-hidden': !isVisible }">
    <transition-group name="list" tag="div" v-show="isVisible" appear>
      <ul class="menus" key="sidebar-ul">
        <li
          v-for="(item, index) in menuData" 
          :key="index + 1"
          class="menu-item"
          :style="`--i: ${index + 1}`"
        >
          <div class="menu-item-content">
            {{ item.text }}
          </div>
          <div class="menu-item-icon">
            <img :src="item.icon" alt="">
          </div>
        </li>
      </ul>  
    </transition-group>
  </div>
</template>

<style scoped>
/* 原样式代码保持不变 */
.menus{
  padding: 0;
  margin: 0;
}
.menu-item {
  user-select: none;
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  background: #242424;
  color:#fff ;
  box-shadow: inset 1px -4px 0px 0px rgb(235 85 85 / 20%);
  padding: 12px 24px;
  transition: .3s ease;
  animation: menu-item-load cubic-bezier(0.42, 0, 0, 0.65) calc(0.2s * var(--i)) forwards;
}
.menu-item-content {
  transition: .3s ease;
}
.menu-item-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  transition: .3s ease;
}
.menu-item-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.menu-item:hover {
  box-shadow: inset 0px -20px 20px 10px rgba(255, 0, 0, 0.2);
  /* background: #a53b3b; */
}
.menu-item:hover .menu-item-content{
  transform: translateX(10px);
}
.menu-item:hover .menu-item-icon{
  transform: translateX(-5px);
}
@keyframes menu-item-load {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.sidebar {
  width: 200px;
  height: calc(100vh - 50px);
  background-color: #272727;
  flex-shrink: 0;
  overflow-y: auto;
  transition: width 0.2s ease;
  scrollbar-width: thin;
  scrollbar-color: #555 transparent;
}

.sidebar.sidebar-hidden {
  width: 0;
  transition: width 0.4s ease;
}
</style>