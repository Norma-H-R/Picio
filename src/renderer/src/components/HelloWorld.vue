<script setup>
// 移除未使用的ref导入
// import { ref } from 'vue'

defineProps({
  msg: String
})
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
h1 {
  font-family: 'Font1', sans-serif;
  user-select: none;
  color: #353535;
  font-size: 100px;
}
.read-the-docs {
  color: #888;
}
</style>
