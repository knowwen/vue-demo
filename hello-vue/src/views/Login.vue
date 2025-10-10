<script lang="ts" setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'  // 引入 useRouter
    import axios from 'axios'         // 引入 axios
    import { ElMessage } from 'element-plus' // 引入 Element Plus 的消息组件
    const router = useRouter()         // 获取路由实例
    const username = ref('')
    const password = ref('')
    const loading = ref(false)
    const login = async () => {
        loading.value = true
        try {
            if (username.value && password.value) {
                localStorage.setItem('token', 'mock-token')
                ElMessage.success('登录成功')
                router.push({ name: 'Home' })// 登录成功后跳转到首页
            } 
        } catch (error) {
            ElMessage.error('登录失败，请检查用户名和密码')
        } finally {
            loading.value = false
        }
    }
</script>
<template>
  <div class="login-container">
    <el-form @submit.prevent="login" class="login-form">
      <el-form-item>
        <el-input v-model="username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="password" type="password" placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-form {
  width: 300px;
}
</style>
