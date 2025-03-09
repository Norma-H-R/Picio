<template>
  <transition name="popdoc">
    <div
      v-if="visible"
      class="popdoc-container"
      :style="{ left: x + 'px', top: y + 'px' }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <div class="doc-info">
        <div class="doc-title">{{ name }}</div>
        <div class="doc-read-time">阅读总时长:  » 130分钟 «</div>
        <div class="doc-last-read-time">上次阅读:  » 25年3月1日 «</div>
      </div>
      <div class="doc-cover">
        <div class="doc-cover-leight"></div>
        <img :src="cover" alt="" />
      </div>
      <slot></slot>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
const x = ref(0)
const y = ref(0)

const handleMouseEnter = () => {
  visible.value = true
}

const handleMouseLeave = () => {
  visible.value = false
}

defineExpose({
  show: (pos) => {
    const adjustedX = pos.x + 300 > window.innerWidth ? pos.x - 300 : pos.x
    const adjustedY = pos.y + 160 > window.innerHeight ? pos.y - 400 : pos.y
    visible.value = true
    x.value = adjustedX
    y.value = adjustedY
    name.value = pos.name
    cover.value = pos.cover
  },
  hide: () => (visible.value = false)
})

const name = ref('')
const cover = ref('')
</script>

<style scoped>
.popdoc-container {
  position: fixed;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(8px);
  transform-origin: center bottom;
  pointer-events: auto;
  width: 300px;
  height: 160px;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

.popdoc-enter-active,
.popdoc-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.popdoc-enter-from,
.popdoc-leave-to {
  opacity: 0;
  transition: all 1s;
  transform: translateY(10px) scale(0.95);
}
.doc-info {
    width: 180px;
    height: 160px;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: right;
    color: #333;
}
.doc-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  padding-bottom: 8px;
  padding-right: 8px;
  padding-top: 16px;
  border-bottom: 1px solid #eee;
  width: 160px;
  position: absolute;
  right: 0;
  align-items: left;
  text-align: center;
  animation: title-load 0.5s ease forwards;
}
.doc-read-time {
  position: absolute;
  right: 0;
  bottom: 10px;
  width: 160px;
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  animation: doc-read-time 0.9s ease forwards ;
}
.doc-last-read-time {
  bottom: 30px;
  position: absolute;
  right: 0;
  width: 160px;
  font-size: 12px;
  color: #999;
  margin-top: 8px;
  animation: doc-last-read-time 0.7s ease forwards ;
}
.doc-cover {
  position: relative;
  width: 120px;
  height: 160px;
  overflow: hidden;
  animation: cover-load 0.5s ease forwards;
}
.doc-cover-leight {
    display:inline-block;
    width: 220px;
    height: 50px;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) ,rgba(255, 255, 255, 0));
    position: absolute;
    bottom: 0;
    transform-origin: left bottom;
    transform: rotate(135deg) translate(-200px, 150px);
    animation: cover-leight 0.5s ease forwards;
}
.doc-cover img {
  width: 100%;
}
@keyframes cover-load {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes title-load {
 from {
  opacity: 0;
  transform: translateX(40px);;
 }
 to {
  opacity: 1;
  transform: translateX(0);
 }
}
@keyframes doc-read-time {
 from {
  opacity: 0;
  transform: translateX(40px);;
 }
 to {
  opacity: 1;
  transform: translateX(0);
 }
}
@keyframes doc-last-read-time {
 from {
  opacity: 0;
  transform: translateX(40px);;
 }
 to {
  opacity: 1;
  transform: translateX(0);
 }
}
@keyframes cover-leight {
  from {
    transform: rotate(135deg) translate(-200px, 150px);
  }
  to {
    transform: rotate(135deg) translate(-180px, -70px);
  }
    
}
</style>
