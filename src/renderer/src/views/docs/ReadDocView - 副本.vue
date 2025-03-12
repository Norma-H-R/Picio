<template>
  <div class="container">
    <div v-if="isLoading">加载中...</div>
    <div v-else-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-else-if="currentDoc" :class="isReadingMode ? 'doc-read-head' : 'doc-content'">
      <div class="doc-info">
        <img
          :src="currentDoc.cover === 'dd' ? '/img/pbook.jpg' : currentDoc.cover"
          class="cover-image"
          :class="isReadingMode ? 'doc-read-head-cover-image' : 'doc-read-head-cover-image-def'"
          @click="openDocument"
        />
        <div class="doc-info-h2" :class="isReadingMode ? 'doc-info-none' : 'doc-content-h2'">
          <h2>{{ currentDoc.name }}</h2>
          <h2>{{ currentDoc.name }}</h2>
          <h2>{{ currentDoc.name }}</h2>
          <h2>{{ currentDoc.name }}</h2>
          <h2>{{ currentDoc.name }}</h2>
          <h2>{{ currentDoc.name }}</h2>
        </div>
      </div>
      <h2 :class="isReadingMode ? 'doc-read-head-h2' : 'doc-read-head-h2-none'">{{ currentDoc.name }}</h2>
      <div :class="isReadingMode ? 'doc-read-head-read-cos' : 'doc-read-head-read-cos-none'">阅读进度</div>
      <div :class="isReadingMode ? 'doc-read-head-read-time' : 'doc-read-head-read-time-none'">上次阅读时间</div>
    </div>
    <div :class="isReadingMode ? 'doc-read-head-back' : 'doc-read-head-back-none'"></div>
    <div class="readview"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useEventBus } from '@vueuse/core'

const route = useRoute()
const eventBus = useEventBus('load-docs')
const currentDoc = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const isReadingMode = ref(false);

const openDocument = () => {
  isReadingMode.value = !isReadingMode.value;
  if (currentDoc.value?.path) {
    try {
      window.electronAPI.invoke('open-file', { path: currentDoc.value.path });
    } catch (error) {
      notification.value.addNotification({
        title: '打开失败',
        message: `无法打开文件: ${error.message}`,
        type: 'error'
      });
    }
  } else {
    notification.value.addNotification({
      title: '文件路径错误',
      message: '未找到有效的文件路径',
      type: 'error'
    });
  }
}
const docListPath = './src/renderer/public/doclist.json';

onMounted(async () => {
  try {
    const id = Number(route.query.id);
    const docListData = await window.electronAPI.invoke('read-file', { path: docListPath });
    const docs = JSON.parse(docListData || '[]');
    
    currentDoc.value = docs.find(doc => doc.id === id);
    
    if (!currentDoc.value) {
      throw new Error('未找到该文档');
    }
  } catch (error) {
    errorMessage.value = error.message;
    notification.value.addNotification({
      title: '加载失败',
      message: error.message,
      type: 'error'
    });
  } finally {
    isLoading.value = false;
  }
});
  eventBus.emit()
</script>

<style scoped>
h2 {
  margin: 0;
  color: #000000;
}
.doc-read-head-h2 {
  position: absolute;
  color: #fff;
  z-index: 1;
  left: -100%;
  top: 0;
  animation: doc-read-head-h2 0.2s forwards 0.5s;
}
@keyframes doc-read-head-h2 {
  form {
    opacity: 0;
    left: -100%;
  }to{
    opacity: 1;
    left: 120px;
  }
}
.doc-read-head-h2-none {
  display: none;
}
.doc-info {
}
.doc-info-h2 {
  position: absolute;
  left: 45%;
  top: 30%;
}
.doc-content-h2 {
  animation: doc-content-h2 0.2s forwards;
}
@keyframes doc-content-h2 {
  from {
    opacity: 0;
    transform: translateX(50px);
    display: none;
  }to{
    opacity: 1;
    transform: translateX(0px);
  }
}
.doc-info-none {
  animation: doc-info-none 0.2s forwards;
}
@keyframes doc-info-none {
  from {
    opacity: 1;
    transform: translateX(0px);
  }to{
    opacity: 0;
    transform: translateX(50px);
    display: none;
  }
}
.doc-read-head-read-cos {
  position: absolute;
  top: 40px;
  color: #b8b8b8;
  z-index: 1;
  left: -100%;
  font-size: 14px;
  animation: doc-read-head-read-cos 0.2s forwards 0.6s;
}
.doc-read-head-read-time {
  position: absolute;
  top: 64px;
  color: #b8b8b8;
  z-index: 1;
  left: -100%;
  font-size: 14px;
  animation: doc-read-head-read-time 0.2s forwards 0.7s;
}
@keyframes doc-read-head-read-cos {
  form {
    opacity: 0;
    left: -100%;
  }to{
    opacity: 1;
    left: 150px;
  }
}
@keyframes doc-read-head-read-time {
  from {
    opacity: 0;
    left: -100%;
  }to{
    opacity: 1;
    left: 150px
  }
}
.doc-read-head-read-cos-none {
  display: none;
}
.doc-read-head-read-time-none {
  display: none;
}
.doc-read-head-back-none {
  width: 0%;
}
.doc-read-head-back {
  height: 90px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  animation: doc-read-head-back 0.2s forwards 0.3s;
}
@keyframes doc-read-head-back {
  from {
    width: 0%;
  }to{
    width: 100%;
  }
}
.container {
  padding: 0px;
  width: 100%;
  height: 100%;
} 
.doc-read-head {
  width: 100%;
  height: 70px;
  left: 0;
  top: 0;
  transition: all 0.3s;
}
.doc-read-head-cover-image {
  width: 90px;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 4px;
  transform: translateX(0px);
  transition: all 0.3s;
  z-index: 2;
}
.doc-read-head-cover-image-def {
  max-width: 200px;
  position: absolute;
  z-index: 2;
}
.doc-content {
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: auto;
  transition: all 0.3s;
  float: left;
}
.doc-content .cover-image {
  width: 200px;
  /* position: absolute; */
  top: 30%;
  left: 20%;
}
.cover-image {
  margin: 0px;
  cursor: pointer;
  transition: all 0.3s;
}
.error {
  color: #ff4d4f;
  padding: 20px;
}

.document-content {
  white-space: pre-wrap;
  line-height: 1.6;
  font-family: 'Microsoft Yahei', sans-serif;
  color: #000000;
}
/* .cover-image {
  cursor: pointer;
  transition: transform 0.2s;
}
.cover-image:hover {
  transform: scale(1.05);
} */

</style>
