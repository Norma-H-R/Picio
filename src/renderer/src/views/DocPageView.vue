<template>
  <div>
    <h1>文档</h1>
    <p>这是使用Vue模板的第二个页面。</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useEventBus } from '@vueuse/core'

const eventBus = useEventBus('load-docs')

onMounted(() => {
  eventBus.emit()
})
</script>

<style scoped>
/* 这里可以添加组件的样式 */
</style>
