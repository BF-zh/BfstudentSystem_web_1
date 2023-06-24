<script setup lang="ts">
import locale from 'element-plus/dist/locale/zh-cn.mjs'
import { useStore } from '@/stores'

const { userInfo } = useHttp()
const store = useStore()
const { goToHome } = useGoTo()
if (store.auth.user == null) {
  userInfo().then(({ message, success }) => {
    if (!success) {
      store.auth.user = null
      return
    }
    store.auth.user = message
    goToHome()
  })
}
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<style>
body{
  background: #f3f1f1;
}
</style>
