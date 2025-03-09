<template>
  <!-- todo:还是要精细化动画流程 -->
  <div class="container">
    <div class="header">
      <div class="doc-find" :class="{ 'doc-find-input': isInputActive }">
        <div class="doc-find-close-btn" :class="{ 'doc-find-close': isInputActive }" @click="find_btn">✕</div>
        <img :src="`../img/search.svg`" :class="{ 'find-file-btn': isInputActive }" @click="find_file" alt="" />
        <img :src="`../img/search.svg`" :class="{ 'doc-find-file': isInputActive }" @click="find_btn" alt="" />
        <input type="text" class="doc-input" :class="{ 'doc-find-input-input': isInputActive }" placeholder="请输入要搜索的名称...">
      </div> 
      <span class="counter">当前文档数: {{ docList.length }}</span>
      <div class="options">
        <button class="add-btn" @click="selectFile">+ 新增文档</button>
      </div>
    </div>
    <div v-if="docList.length" class="docs-list">
      <PopDoc ref="popdocRef" />
      <div
        v-for="(file, index) in docList"
        :key="index"
        class="docs"
        @mouseenter="(e) => handleHover(e, index)"
        @mouseleave="() => popdocRef?.hide()"
      >
        <img :src="file?.cover === 'dd' ? '/img/pbook.jpg' : file?.cover" />
        <div class="docname">{{ file.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject, nextTick } from 'vue'
import PopDoc from '@/components/PopDoc.vue'
import { useEventBus } from '@vueuse/core'

const docListPath = './src/renderer/public/doclist.json'

const eventBus = useEventBus('load-docs')
const docList = ref([])
const notification = inject('notification')
const popdocRef = ref(null)

const isInputActive = ref(false)

const find_btn = () => {
  isInputActive.value = !isInputActive.value
  if (!isInputActive.value) {
    popdocRef.value?.hide()
  }
  nextTick(() => {
    document.querySelector('.doc-input').focus()
  })
}

const handleHover = (event, index) => {
  const file = docList.value[index]
  const rect = event.currentTarget.getBoundingClientRect()
  popdocRef.value?.show({
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
    name: file.name,
    cover: file?.cover === 'dd' ? '/img/pbook.jpg' : file?.cover
  })
}

const selectFile = async () => {
  const { canceled, filePaths } = await window.electronAPI.showOpenDialog()
  if (!canceled) {
    // 标准化路径格式。使用`map`方法将每个路径中的反斜杠替换为正斜杠，并转换为小写，避免不同操作系统路径格式差异导致的问题。
    const standardizedPaths = filePaths.map((path) => path.replace(/\\/g, '/').toLowerCase())
    // 获取现有路径集合。通过`docList.value`获取已存储的文件列表，提取每个文件的路径并同样进行标准化处理，存入`Set`结构以便快速查找
    const storedData = await window.electronAPI.invoke('read-file', { path: docListPath })
    const existingPaths = new Set(
      (storedData ? JSON.parse(storedData) : []).map((item) =>
        item.path.replace(/\\/g, '/').toLowerCase()
      )
    )
    // 筛选重复路径。使用`filter`方法找出在`existingPaths`中已存在的路径，存入`duplicates`数组用于后续提示。
    const duplicates = standardizedPaths.filter((path) => existingPaths.has(path))
    //筛选新文件路径。通过排除已存在的路径，得到新增文件列表`newFiles`，后续会被添加到文档列表中。
    const newFiles = standardizedPaths.filter((path) => !existingPaths.has(path))

    if (duplicates.length > 0) {
      notification.value.addNotification({
        title: '重复文件',
        message: `${duplicates.map((p) => p.split(/[\\/]/).pop()).join(', ')}已存在: `,
        type: 'warning'
      })
    }

    if (newFiles.length > 0) {
      docList.value = [
        ...docList.value,
        ...newFiles.map((path) => ({
          name: path.split(/[\\/]/).pop(),
          path: path,
          cover: 'dd'
        }))
      ]

      window.electronAPI.invoke('write-file', {
        path: docListPath,
        data: JSON.stringify(docList.value)
      })
    }
  }
}

onMounted(async () => {
  try {
    const storedData = await window.electronAPI.invoke('read-file', { path: docListPath })
    docList.value = storedData ? JSON.parse(storedData) : []
    eventBus.emit()
  } catch (error) {
    notification.value.addNotification({
      title: '加载失败',
      message: '无法读取文档列表: ' + error.message,
      type: 'error'
    })
  }
})
</script>

<style scoped>
.container {
  padding: 0px 0px 0px;
}
.container {
  padding: 0px;
  height: 100%;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 14px 10px;
  user-select: none;
}

.counter {
  font-size: 14px;
  color: #909399;
  user-select: none;
}
.options {
  display: inline-flex;
}
.doc-find {
  position: absolute;
  left: 50%;
  user-select: none;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 50%;
}
.doc-find-input{
  animation: doc-find 0.3s ease forwards;
}
.doc-find-input-input {
  animation: doc-find-input-input 0.3s ease forwards;
}
.doc-find img {
  user-select: none;
  width: 24px;
  height: 24px;
  position: absolute;
  z-index: 2;
}
/* .doc-find-input img {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 24px;
} */

.doc-find-file {
  display: none;
}
.find-file-btn {
  display: block;
  position: absolute;
  right: 50px;
}
.doc-find-btn {
  user-select: none;
  padding: 8px 16px;
  background: #67c23a;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 10px;
  right: 45px;
}
.doc-find-btn .doc-input {
  display: block;
}
.doc-input {
  width: 24px;
  height: 24px;
  font-size: 18px;
  margin-left: 10px;
  padding-left: 10px;
  border: none;
  border-radius: 12px;
  outline: none;
  opacity: 0;
}
.doc-find-close-btn {
  display: none;
}
.doc-find-close {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  color: #333;
  font-size: 22px;
}
.add-btn {
  padding: 8px 16px;
  background: #67c23a;
  color: white;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: 10px;
}

.add-btn:hover {
  background: #85ce61;
}
.docs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  height: calc(100vh - 140px);
  overflow-y: auto;
  padding: 10px 20px 20px 10px;
  margin-right: 8px;
}

.docs-list::-webkit-scrollbar {
  width: 6px;
}

.docs-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.docs-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.docs-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
.docs {
  position: relative;
  width: 120px;
  height: 160px;
  background-color: aliceblue;
  overflow: hidden;
}
.docs:hover .docname {
  transform: translateY(0);
}
.docname {
  background-image: linear-gradient(#ffffff00, #000000);
  height: 80%;
  padding: 10px 10px 10px 10px;
  color: #fff;
  display: flex;
  align-items: end;
  justify-content: center;
  position: absolute;
  bottom: 0;
  transform: translateY(160px);
  transition: all 0.3s;
  font-size: 14px;
}
.docs img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@keyframes doc-find {
  0% {
    opacity: 0;
    transform: translate(0,0px)
  }
  100% {
    opacity: 1;
    width: 400px;
    height: 80px;
    background: #fff;
    border-radius: 16px;
    transform: translate(0,100px);
  }
}
@keyframes doc-find-input-input {
  0% {
    width: 24px;
    height: 24px;
    opacity: 0;
  }
  100% {
    height: 50px;
    width: 280px;
    opacity: 1;
    transform: translate(-40px,0px);
  }
}
</style>
