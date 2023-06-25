<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { Account } from '@/types'
import { Formatter } from '@/tools'

const addUserFormRef = ref()
const form = reactive<Partial<Account & { keyword: string }>>({})
const selectIds = ref<Array<number>>([])
const updateForm = ref < Partial<Account>>({})
const addUserForm = ref < Partial<Account>>({})
const currentPage = ref(1)
const pageSize = ref(2)
const dialogVisible = ref(false)
const addUserDialog = ref(false)
const { userList, userUpdate, userAdd, userDelete } = useHttp()
const formRef = ref()
const tableData = reactive<{ count: number; data: Partial<Account>[] }>({ data: [], count: 0 })

onMounted(() => {
  userList({ limit: pageSize.value, page: currentPage.value }).then(({ message, success }) => {
    if (!success)
      return ElMessage.error('发送错误啦')
    tableData.data = message.list
    tableData.count = message.count
    ElMessage.success('查询成功')
  })
})
function openAddUserDialog() {
  addUserDialog.value = true
}
function openDialog(user: Account) {
  updateForm.value = { ...user }
  dialogVisible.value = true
}
function closeDialog() {
  updateForm.value = {}
  dialogVisible.value = false
}
function validateUsername(rule: any, value: any, callback: (prams?: any) => void) {
  if (value === '')
    callback(new Error('请输入用户名'))
  else if (!/^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(value))
    callback(new Error('用户名不能包含特殊字符，只能是中文/英文'))

  else
    callback()
}

const addUserRules = {
  nickname: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { min: 2, max: 16, message: '姓名的长度必须在2-16个字符之间', trigger: ['blur', 'change'] },
  ],
  username: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
    { validator: validateUsername, trigger: ['blur', 'change'] },
    { min: 2, max: 8, message: '用户名的长度必须在2-8个字符之间', trigger: ['blur', 'change'] },
  ],
  password: [
    { min: 6, max: 16, message: '密码的长度必须在6-16个字符之间', trigger: ['blur', 'change'] },
  ],
  email: [
    { required: true, message: '请输入邮件地址', trigger: 'blur' },
    { type: 'email', message: '请输入合法的电子邮件地址', trigger: ['blur', 'change'] },
  ],
}
function handleDeleteSelectUser() {
  if (selectIds.value.length <= 0)
    return
  userDelete({ ids: selectIds.value.join(',') }).then(({ success, message }) => {
    if (!success)
      ElMessage.error(message)
    ElMessage.success(message)
    userList({ limit: pageSize.value, page: currentPage.value }).then(({ message, success }) => {
      if (!success)
        return
      tableData.data = message.list
      tableData.count = message.count
    })
  })
}
function closeAddUserDialog() {
  addUserDialog.value = false
  addUserFormRef.value.resetFields()
  addUserForm.value = {}
}
function handleAddUser() {
  addUserFormRef.value.validate((validate: any) => {
    if (validate) {
      userAdd({ ...addUserForm.value }).then(({ success, message }) => {
        if (!success)
          ElMessage.error('添加失败')
        ElMessage.success('添加成功')
        userList({ limit: pageSize.value, page: currentPage.value }).then(({ message, success }) => {
          if (!success)
            return
          tableData.data = message.list
          tableData.count = message.count
        })
      })
    }
  })
}
function handleUpdate() {
  userUpdate({ ...updateForm.value }).then(({ message, success }) => {
    if (!success)
      return ElMessage.error(message)
    ElMessage.success(message)
    tableData.data = tableData.data.map((v) => {
      if (v.id === updateForm.value.id) {
        // 使用解构赋值更新对象属性
        return { ...updateForm.value }
      }
      else {
        return v
      }
    })
  })
}
function handleSelectionChange(val: Account[]) {
  selectIds.value = val.map(({ id }) => id)
}

function handleSubmit() {
  userList({ ...form, limit: pageSize.value, page: currentPage.value }).then(({ message, success }) => {
    if (!success)
      return ElMessage.error('发送错误啦')
    tableData.data = message.list
    tableData.count = message.count
    ElMessage.success('查询成功')
  })
}
</script>

<template>
  <div bg-white p-15px>
    <el-form ref="formRef" inline :model="form">
      <el-row :gutter="15">
        <el-col :span="6">
          <el-form-item label="角色">
            <el-select v-model="form.type" placeholder="请选择查询类型">
              <el-option label="管理员" :value="2" />
              <el-option label="老师" :value="1" />
              <el-option label="学生" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="私密" value="0" />
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关键词">
            <el-input v-model="form.keyword" placeholder="请输入学号或者姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="handleSubmit">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

    <el-table border stripe :data="tableData.data" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="姓名" property="nickname" />
      <el-table-column label="角色" property="type">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ Formatter.role(scope.row.type) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="学号" property="id" />
      <el-table-column label="邮箱" property="email" />
      <el-table-column label="性别" property="sex">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ Formatter.gender(scope.row.sex) }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="出生日期" property="birthday" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <!-- <el-button link type="primary" size="small">
            详情
          </el-button> -->
          <el-button link type="primary" size="small" @click="openDialog(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div py-15px flex gap-15px>
      <el-button type="primary">
        分配班级
      </el-button>
      <el-button type="danger" @click="handleDeleteSelectUser">
        删除选中
      </el-button>
      <el-button type="warning" @click="openAddUserDialog">
        添加用户
      </el-button>
      <!-- <el-button type="warning" @click="openImportStudentDialog">
        导入学生
      </el-button> -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 4, 6, 8]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.count"
        @size-change="handleSubmit"
        @current-change="handleSubmit"
      />
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="更新用户信息" width="300px" draggable>
    <el-form :model="updateForm">
      <el-form-item label="学号">
        <el-input v-model="updateForm.id" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="updateForm.nickname" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="updateForm.email" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="updateForm.type" placeholder="请选择类型">
          <el-option label="管理员" :value="2" />
          <el-option label="老师" :value="1" />
          <el-option label="学生" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="updateForm.sex" placeholder="请选择性别">
          <el-option label="私密" :value="0" />
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="updateForm.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="updateForm.birthday"
          type="date"
          placeholder="请选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleUpdate">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="addUserDialog" title="添加用户" width="300px" draggable>
    <el-form ref="addUserFormRef" :rules="addUserRules" label-width="6em" :model="addUserForm">
      <el-form-item prop="nickname" label="姓名">
        <el-input v-model="addUserForm.nickname" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item prop="username" label="用户名">
        <el-input v-model="addUserForm.username" :maxlength="8" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="addUserForm.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item prop="type" label="角色">
        <el-select v-model="addUserForm.type" placeholder="请选择类型">
          <el-option label="管理员" :value="2" />
          <el-option label="老师" :value="1" />
          <el-option label="学生" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item prop="sex" label="性别">
        <el-select v-model="addUserForm.sex" placeholder="请选择性别">
          <el-option label="私密" :value="0" />
          <el-option label="男" :value="1" />
          <el-option label="女" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="addUserForm.password" placeholder="默认：123456" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-date-picker
          v-model="addUserForm.birthday"
          type="date"
          placeholder="请选择日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeAddUserDialog">取消</el-button>
        <el-button type="primary" @click="handleAddUser">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>
