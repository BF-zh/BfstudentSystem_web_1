<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useStore } from '@/stores'

const { login, userInfo } = useHttp()
const { goToHome } = useGoTo()
const store = useStore()

const form = reactive({
  username: '',
  password: '',
  remember: false,
})

function handleLogin() {
  if (!form.username || !form.password) {
    ElMessage.warning('请填写用户名和密码！')
  }
  else {
    login({
      password: form.password,
      username: form.username,
      remember: form.remember,
    }).then(({ message }) => {
      ElMessage.success(message)
      userInfo().then(({ message, success }) => {
        if (!success) {
          store.auth.user = null
        }
        else {
          store.auth.user = message
          goToHome()
        }
      })
    })
  }
}
</script>

<template>
  <div style="text-align: center;margin: 0 20px">
    <div style="margin-top: 150px">
      <div style="font-size: 25px;font-weight: bold">
        登录
      </div>
      <div style="font-size: 14px;color: grey">
        在进入系统之前请先输入用户名和密码进行登录
      </div>
    </div>
    <div style="margin-top: 50px">
      <el-input v-model="form.username" type="text" placeholder="用户名/邮箱">
        <template #prefix>
          <el-icon><User /></el-icon>
        </template>
      </el-input>
      <el-input v-model="form.password" type="password" style="margin-top: 10px" placeholder="密码">
        <template #prefix>
          <el-icon><Lock /></el-icon>
        </template>
      </el-input>
    </div>
    <el-row style="margin-top: 5px">
      <el-col :span="12" style="text-align: left">
        <el-checkbox v-model="form.remember" label="记住我" />
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-link @click="router.push('/forget')">
          忘记密码？
        </el-link>
      </el-col>
    </el-row>
    <div style="margin-top: 40px">
      <el-button style="width: 270px" type="success" plain @click="handleLogin()">
        立即登录
      </el-button>
    </div>
    <el-divider>
      <span style="color: grey;font-size: 13px">没有账号</span>
    </el-divider>
    <div>
      <el-button style="width: 270px" type="warning" plain @click="router.push('/register')">
        注册账号
      </el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
