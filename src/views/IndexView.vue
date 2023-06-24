<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useStore } from '@/stores'

const { logout } = useHttp()
const { goToWeCome } = useGoTo()
const store = useStore()

function handleLogout() {
  logout().then(({ message }) => {
    ElMessage.success(message)
    store.auth.user = null
    goToWeCome()
  })
}
</script>

<template>
  <div flex>
    <div min-w-50px>
      <el-menu
        :default-active="$route.fullPath"
        h-screen
        router
      >
        <el-menu-item index="/admin/Dashboard">
          <el-icon><i-ep-promotion /></el-icon>
          <template #title>
            <span>后台首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/admin/user/query">
          <el-icon> <i-ep-user /></el-icon>
          <template #title>
            <span>用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><i-ep-setting /></el-icon>
          <template #title>
            Navigator Four
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <div flex flex-col flex-1>
      <header bg-white h-60px flex items-center justify-between p-md>
        <span>教务系统后台</span>
        <div>
          <el-dropdown>
            <el-avatar :size="40" src="https://empty">
              user
            </el-avatar>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>用户中心</el-dropdown-item>
                <el-dropdown-item divided>
                  退出登陆
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      <div flex-1 of-hidden p-md>
        <router-view v-slot="{ Component }">
          <transition name="el-fade-in-linear" mode="out-in">
            <div h-full>
              <KeepAlive>
                <component :is="Component" />
              </KeepAlive>
            </div>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
