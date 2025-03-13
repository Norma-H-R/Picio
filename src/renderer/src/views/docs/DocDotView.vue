<template>
    <div>
        这里是知识点
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