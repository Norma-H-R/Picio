<template>
  <div class="doc-list-container">
    <!-- 文档列表内容 -->
    <div v-for="doc in docs" :key="doc.id" class="doc-item">
      {{ doc.title }}
    </div>
  </div>
</template>

<script setup>
// 文档数据获取逻辑
</script>

<style scoped>
.doc-list-container {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.doc-item {
  padding: 10px;
  margin-bottom: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>