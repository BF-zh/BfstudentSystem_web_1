<script setup lang="ts">
import { ElMessage } from 'element-plus'
import type { Account } from '@/types'
import { Formatter } from '@/tools'

const form = reactive<Partial<Account & { keyword: string }>>({})
const updateForm = ref < Partial<Account>>({})
const dialogVisible = ref(false)
const { userList, userUpdate } = useHttp()
const formRef = ref()
const tableData = reactive<{ data: Partial<Account>[] }>({ data: [] })

onMounted(() => {
  userList().then(({ message, success }) => {
    if (!success)
      ElMessage.error('发送错误啦')
    tableData.data = message
    ElMessage.success('查询成功')
  })
})
function openDialog(user: Account) {
  updateForm.value = { ...user }
  dialogVisible.value = true
}
function closeDialog() {
  updateForm.value = {}
  dialogVisible.value = false
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
function handleSubmit() {
  userList({ ...form }).then(({ message, success }) => {
    if (!success)
      return ElMessage.error('发送错误啦')
    tableData.data = message
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
              <el-option label="管理员" value="2" />
              <el-option label="老师" value="1" />
              <el-option label="学生" value="0" />
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
          <el-form-item>
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

    <el-table border stripe :data="tableData.data">
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
          <el-button link type="primary" size="small">
            详情
          </el-button>
          <el-button link type="primary" size="small" @click="openDialog(scope.row)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div py-15px>
      <el-button type="primary">
        分配班级
      </el-button>
      <el-button type="warning">
        导入成绩
      </el-button>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="更新信息" width="300px" draggable>
    <el-form :model="updateForm">
      <el-form-item label="学号">
        <el-input v-model="updateForm.id" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="updateForm.nickname" placeholder="请输入姓名" />
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
</template>

<style scoped>

</style>
