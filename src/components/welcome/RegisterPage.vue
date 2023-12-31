<script setup lang="ts">
import { EditPen, Lock, Message, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '@/router'

const { register, validateEmail } = useHttp()
const form = reactive({
  username: '',
  password: '',
  password_repeat: '',
  email: '',
  code: '',
})

function validateUsername(rule: any, value: any, callback: (prams?: any) => void) {
  if (value === '')
    callback(new Error('请输入用户名'))
  else if (!/^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(value))
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))

  else
    callback()
}

function validatePassword(rule: any, value: any, callback: (prams?: any) => void) {
  if (value === '')
    callback(new Error('请再次输入密码'))
  else if (value !== form.password)
    callback(new Error('两次输入的密码不一致'))
  else
    callback()
}

const rules = {
  username: [
    { validator: validateUsername, trigger: ['blur', 'change'] },
    { min: 2, max: 8, message: '用户名的长度必须在2-8个字符之间', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change'] },
  ],
  password_repeat: [
    { validator: validatePassword, trigger: ['blur', 'change'] },
  ],
  email: [
    { required: true, message: '请输入邮件地址', trigger: 'blur' },
    { type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change'] },
  ],
  code: [
    { required: true, message: '请输入获取的验证码', trigger: 'blur' },
  ],
}

const formRef = ref()
const isEmailValid = ref(false)
const coldTime = ref(0)

function onValidate(prop: any, isValid: any) {
  if (prop === 'email')
    isEmailValid.value = isValid
}

function handleToRegister() {
  formRef.value.validate((isValid: any) => {
    if (isValid) {
      register({
        username: form.username,
        code: form.code,
        email: form.email,
        password: form.password,
      }).then(({ message }) => {
        ElMessage.success(message)
      })
    }
    else {
      ElMessage.warning('请完整填写注册表单内容！')
    }
  })
}

function handleValidateEmail() {
  coldTime.value = 60
  validateEmail(form.code).then(({ success, message }) => {
    if (success) {
      ElMessage.success(message)
    }
    else {
      ElMessage.warning(message)
      coldTime.value = 0
    }
  })
}
</script>

<template>
  <div style="text-align: center;margin: 0 20px">
    <div style="margin-top: 100px">
      <div style="font-size: 25px;font-weight: bold">
        注册新用户
      </div>
      <div style="font-size: 14px;color: grey">
        欢迎注册我们的学习平台，请在下方填写相关信息
      </div>
    </div>
    <div style="margin-top: 50px">
      <el-form ref="formRef" :model="form" :rules="rules" @validate="onValidate">
        <el-form-item prop="username">
          <el-input v-model="form.username" :maxlength="8" type="text" placeholder="用户名">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" :maxlength="16" type="password" placeholder="密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="form.password_repeat" :maxlength="16" type="password" placeholder="重复密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="form.email" type="email" placeholder="电子邮件地址">
            <template #prefix>
              <el-icon>
                <Message />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row :gutter="10" style="width: 100%">
            <el-col :span="17">
              <el-input v-model="form.code" :maxlength="6" type="text" placeholder="请输入验证码">
                <template #prefix>
                  <el-icon>
                    <EditPen />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="5">
              <el-button type="success" :disabled="!isEmailValid || coldTime > 0" @click="handleValidateEmail">
                {{ coldTime > 0 ? `请稍后 ${coldTime} 秒` : '获取验证码' }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 80px">
      <el-button style="width: 270px" type="warning" plain @click="handleToRegister">
        立即注册
      </el-button>
    </div>
    <div style="margin-top: 20px">
      <span style="font-size: 14px;line-height: 15px;color: grey">已有账号? </span>
      <el-link type="primary" style="translate: 0 -2px" @click="router.push('/')">
        立即登录
      </el-link>
    </div>
  </div>
</template>

<style scoped>
</style>
