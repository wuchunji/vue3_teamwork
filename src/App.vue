<template>
  <div id="head">
    <div class="left">
      <img src="./assets/img/logo.png">
      <h1>公文协同系统</h1>
    </div>
    <div class="right">
      <ul v-if="!store.isLogin">
        <li>
          <div class="signUp">
            <router-link to="/signUp">
              <span>sign up</span>
            </router-link>
          </div>
        </li>
        <li>
          <div class="signIn">
            <router-link to="/signIn">
              <span>sign in</span>
            </router-link>
          </div>
        </li>
      </ul>
      <ul v-else>
        <li>
          <router-link to="/paperCenter">
            <span class="iconfont icon-personal"></span>
            <span>我的公文</span>
          </router-link>
        </li>
        <li class="logOut">
          <span @click="logOut">log out</span>
        </li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { router } from './route';
  import { mainStore } from './store';
  const store = mainStore()

  // 登出
  function logOut() {
    store.isLogin = false
    router.push('/')
    // 更改浏览器缓存
    sessionStorage.setItem('isPower', 'false')
  }

  // 如果用户刷新了，在页面加载时读取sessionStorage内数据
  if(sessionStorage.getItem('store')) {
    const sessionStore = sessionStorage.getItem('store') + ''
    const _store = JSON.parse(sessionStore)
    store.$patch({
      isLogin: _store.isLogin,
      userId: _store.userId,
      paperId: _store.paperId,
      nowId: _store.nowId
    })
    sessionStorage.removeItem('store')
  }
  // 在页面刷新时将pinia里的信息存到sessionStorage里
  window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('store', JSON.stringify(store.$state))
  })
</script>

<style scoped>
  .icon-personal{
    font-size: .12rem;
    padding-right: 0.03rem;
  }
  #head{
    display: flex;
    justify-content: space-between;
    height: .3rem;
    border-bottom: 1px solid #ccc;
  }
  .left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1.15rem;
    padding-left: .2rem;
  }
  .left img{
    width: .3rem;
  }
  .left h1{
    font-size: .13rem;
    color: #2c3e50;
    font-weight: 500;
  }
  .right{
    margin-right: .2rem;
  }
  .right ul{
    list-style: none;
    font-size: .11rem;
    color: #2c3e50;
    height: .3rem;
    display: flex;
    align-items: center;
  }
  .right a{
    color: #2c3e50
  }
  .right ul li{
    margin: 0 .05rem;
    cursor: pointer;
  }
  .right .signIn{
    border: 1px solid #2c3e50;
    border-radius: .05rem;
    padding: .03rem .05rem;
  }
  .logOut{
    border: 1px solid #f40;
    border-radius: .05rem;
    padding: .03rem .05rem;
    color: #f40;
  }

</style>

