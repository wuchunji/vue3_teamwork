<template>
  <div id="signUp">
    <h3>用户注册</h3>
    <div class="inputBox">
      <span>用户名</span>
      <input type="text" v-model="userInput.username">
    </div>
    <div class="inputBox">
      <span>姓&#12288;名</span>
      <input type="text" v-model="userInput.name">
    </div>
    <div class="inputBox">
      <span>密&#12288;码</span>
      <input type="password" v-model="userInput.password">
    </div>
    <button @click="signUp">注&nbsp;册</button>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  import baseUrl from '../hooks/serverIp'
  import { reactive } from 'vue';
  import { router } from '../route';
  import { mainStore } from '../store';

  const store = mainStore()
  const userInput = reactive({
    username: null,
    name: null,
    password: null
  })

  // 注册
  function signUp() {
    if(userInput.username && userInput.name && userInput.password) {
      axios.get(`${baseUrl}/getUsername?id=${userInput.username}`)
      .then(response => {
        if(!response.data[0]) {
          axios.get(`${baseUrl}/addUser?userid=${userInput.username}&username=${userInput.name}&password=${userInput.password}`)
          router.push('/')
          store.$patch({
            isLogin: true,
            userId: userInput.username
          })
          // 浏览器设置权限
          sessionStorage.setItem('isPower', 'true')
        }else{
          alert('用户名已存在！')
        }
      })
    }else{
      alert('注册信息不能为空！')
    }
    

  }
</script>

<style scoped>
  #signUp{
    font-size: .1rem;
    width: 1.5rem;
    margin-left: calc(50% - .6rem);
    margin-top: 1rem;
    color: #2c3e50;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #signUp h3{
    font-size: .15rem;
  }
  #signUp .inputBox{
    margin-top: .1rem;
  }
  #signUp .inputBox input{
    width: 1rem;
    height: .15rem;
    border: 2px solid #f90;
    outline: none;
    font-size: .08rem;
  }
  #signUp .inputBox input:focus{
    border: 2px solid #ff5000;
  }
  #signUp .inputBox span{
    margin-right: .1rem;
  }
  #signUp button{
    width: 1.3rem;
    height: 0.2rem;
    margin-top: 0.1rem;
    margin-left: 0.08rem;
    background-image: linear-gradient(90deg,#f90,#ff5000);
    border: none;
    color: #fff;
    font-size: .09rem;
    opacity: .7;
    cursor: pointer;
  }
</style>
