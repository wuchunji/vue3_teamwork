<template>
  <div id="signIn">
    <div class="box">
      <h3>密码登录</h3>
      <span class="iconfont icon-yonghuming"></span>
      <input type="text" placeholder="请输入用户名" v-model="userInput.userInputName">
      <span class="iconfont icon-mima"></span>
      <input type="password" placeholder="请输入密码" v-model="userInput.userInputPassword">
      <button @click="singIn">登录</button>
      <span class="signUp">
        <router-link to="/SignUp">免费注册</router-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  import baseUrl from '../hooks/serverIp'
  import { reactive } from 'vue';
  import { router } from '../route';
  import { mainStore } from '../store'

  const store = mainStore()

  let userInput = reactive({
    userInputName: null,
    userInputPassword: null 
  })

  // 登录
  function singIn() {
    axios.get(`${baseUrl}/getUser?id=${userInput.userInputName}`)
    .then(response => {
      if(response.data[0]) {
        // 用户存在且密码正确
        if(response.data[0].password == userInput.userInputPassword) {
          router.push('/')
          store.$patch({
            isLogin: true,
            userId: response.data[0].userid,
            paperId: response.data[0].paperids
          })
          // 浏览器设置缓存
          sessionStorage.setItem('isPower', 'true')
        }else{
          alert('用户名或密码不正确')
        }
      }else{
        alert('用户名不存在')
      }
    })
  }

</script>

<style scoped>
  .icon-yonghuming{
    font-size: .16rem;
    position: absolute;
    left: 0.07rem;
    top: 0.43rem;
  }
  .icon-mima{
    font-size: .16rem;
    position: absolute;
    left: 0.07rem;
    top: 0.74rem;
  }
  #signIn{
    background-image: url(../assets/img/indexBg2.png);
    height: 3rem;
    margin-top: .2rem;

    position: relative;
  }
  .box{
    width: 2rem;
    background-color: rgba(255, 255, 255, .7);
    padding-top: .4rem;
    padding-bottom: .3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: .7rem;
    right: .7rem;
  }
  .box h3{
    font-size: .1rem;
    font-weight: 500;
    color: #2c3e50;

    position: absolute;
    top: .15rem;
    left: .3rem;
  }
  .box input{
    /* background: none; */
    outline: none;
    border: 1px solid #c5c5c5;

    width: 1.5rem;
    height: .2rem;
    margin-bottom: .1rem;
    font-size: .08rem;
    text-indent: .1rem;
  }
  .box button{
    width: 1.5rem;
    height: .2rem;
    border: none;
    background-color: #f40;
    margin-bottom: .1rem;
    color: #fff;
    font-size: .09rem;
    cursor: pointer;
}
  .box span.signUp{
    position: absolute;
    right: .3rem;
    bottom: -.1rem;
  }
  .box span a{
    color: #2c3e50;
    font-size: .07rem;
  }
</style>
