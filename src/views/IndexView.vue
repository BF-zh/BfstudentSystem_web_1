<script setup lang="ts">
import { get } from '@/net'
import router from '@/router'
import { useStore } from '@/stores'

const store = useStore()

function logout() {
  get('/api/auth/logout', (message) => {
    ElMessage.success(message)
    store.auth.user = null
    router.push('/')
  })
}
</script>

<template>
  <div>
    欢迎{{ store.auth.user.username }}进入到学习平台
  </div>
  <div>
    <el-button type="danger" plain @click="logout()">
      退出登录
    </el-button>
  </div>
</template>

<style scoped>

</style>
