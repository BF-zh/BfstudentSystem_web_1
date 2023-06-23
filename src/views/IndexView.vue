<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { useHttp } from '@/composables/useHttp'
import { useStore } from '@/stores'
import { useGoTo } from '@/composables/useGoTo'

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

const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const isSollapse = ref(true)
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<template>
  <el-container max-h-screen box-border>
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']" :collapse="isSollapse">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Message /></el-icon>Navigator One
            </template>
            <el-menu-item-group>
              <template #title>
                Group 1
              </template>
              <el-menu-item index="1-1">
                Option 1
              </el-menu-item>
              <el-menu-item index="1-2">
                Option 2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3">
                Option 3
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>
                Option4
              </template>
              <el-menu-item index="1-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><IconMenu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>
                Group 1
              </template>
              <el-menu-item index="2-1">
                Option 1
              </el-menu-item>
              <el-menu-item index="2-2">
                Option 2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">
                Option 3
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>
                Option 4
              </template>
              <el-menu-item index="2-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>
                Group 1
              </template>
              <el-menu-item index="3-1">
                Option 1
              </el-menu-item>
              <el-menu-item index="3-2">
                Option 2
              </el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">
                Option 3
              </el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>
                Option 4
              </template>
              <el-menu-item index="3-4-1">
                Option 4-1
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header bg-blue flex="~ items-center justify-between">
        <i i-icon-park:menu-fold-one />
        <i i-icon-park:menu-unfold-one />
      </el-header>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>

</style>
