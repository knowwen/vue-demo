<script lang="ts" setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'  // 引入 useRouter
    import axios from 'axios'         // 引入 axios
    import { ElMessage } from 'element-plus' // 引入 Element Plus 的消息组件

    import api from '../api/api'

    import {OAuth2Client } from '@badgateway/oauth2-client' // 引入 oauth2-client 库

    const router = useRouter()         // 获取路由实例
    const username = ref('')
    const password = ref('')
    const loading = ref(false)

    const client = new OAuth2Client({
      clientId: 'gateway',
      server:'http://127.0.0.1:8080',
      authorizationEndpoint: '/oauth2/authorize',
      clientSecret:'secret',
      tokenEndpoint: '/oauth2/token',
      discoveryEndpoint: '/.well-known/',
    });

    function generateCodeVerifier() {
      const array = new Uint32Array(56 / 2);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    }

    function oauth2_login(){
      const codeVerifier = async () => generateCodeVerifier();
      const url = async () => 
      client.authorizationCode.getAuthorizeUri({
        redirectUri: 'http://localhost:5173/',
        state: '12345',
        codeVerifier,
        scope: ['openid','profile','user'],
      });
      const oauth2Token = async () => { client.authorizationCode.getTokenFromCodeRedirect(
        url,
        {
          /**
           * The redirect URI is not actually used for any redirects, but MUST be the
           * same as what you passed earlier to "authorizationCode"
           */
          redirectUri: 'http://localhost:5173/',
          /**
           * This is optional, but if it's passed then it also MUST be the same as
           * what you passed in the first step.
           *
           * If set, it will verify that the server sent the exact same state back.
           */
          state: 'some-string',
          codeVerifier,
        }
      )};
      // .then((uri) => {
      //   console.log('重定向到授权URI:', uri);
      //   window.location.href = uri; // 重定向用户到授权URI
      // }).then((error) => {
      //   console.error('获取授权URI时出错:', error);
      // });
    } 
    const login = async () => {
        loading.value = true 
        try {
            if (username.value && password.value) {
                api.post("/oauth2/user",{
                  "userName":"zhangsan",
                  "password":"123456"
                }).then(res => console.log(res.data))
                .catch(err => console.error(err));
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
        <el-button type="primary" :loading="loading" @click="oauth2_login">oauth2登录</el-button>
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
