<script setup lang="ts">
import { useHttp } from './composables/useHttp'
import { useGoTo } from './composables/useGoTo'
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
  <router-view />
</template>

<style>

</style>
