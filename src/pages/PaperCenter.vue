<template>
  <div id="paperCenter">
    <h3 class="title">我参与的公文</h3>
    <div class="paperList">
      <div class="void" v-if="!paperInformation[0]">
        赶紧创建一个公文吧！
      </div>
      <ul v-else>
        <li v-for="item in paperInformation" :key="item.id">
          <router-link to="/paperControl" @click="toInfor(item.id)">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <button class="newPaper" @click="newPaperShow = true">新建公文</button>
    <!-- 新建论文遮罩层 -->
    <div class="newPop" v-if="newPaperShow">
      <div class="mask"></div>
      <div class="container">
        <ul>
          <li class="name">
            <span>公文题目:</span>
            <input type="text" v-model="newPaperInfor.title" placeholder="请输入公文题目">
          </li>
          <li class="introduce">
            <span>简介:</span>
            <textarea cols="40" rows="5" v-model="newPaperInfor.brief" placeholder="请输入公文简介"></textarea>
          </li>
          <li class="btn">
            <button @click="addNewPaper">新建公文</button>
          </li>
        </ul>
        <div class="close" @click="newPaperShow = false">×</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { mainStore } from '../store'
  import getUserPaper from '../hooks/paperCenter/getUserPaper';
  import newPaper from '../hooks/paperCenter/newPaper'

  // 新建公文功能
  let newPaperShow = ref(false)
  let { newPaperInfor, addNewPaper } = newPaper()

  // 获取用户公文信息渲染页面
  let paperInformation = getUserPaper()
  
  // 跳转到管理页
  const store = mainStore()
  function toInfor(id: any) {
    store.nowId = id
  }
  
</script>

<style scoped>
  a{
    color: #000;
  }
  #paperCenter{
    color: #2c3e50;
    margin: .3rem 0 .3rem .5rem;
    position: relative;
  }
  .title{
    font-size: .2rem;
    font-weight: 400;
    padding-bottom: .2rem;
  }
  .paperList{
    font-size: .12rem;
    font-weight: 300;
    padding-left: .2rem;
  }
  .paperList .void{
    font-size: .5rem;
    font-weight: 500;
    opacity: .3;
    padding: 0.4rem;
  }
  .paperList li{
    padding: .1rem 0;
    border-bottom : 1px solid #c5c5c5;
    width: 6rem;
    text-indent: 2em;
  }
  .newPaper{
    width: 1rem;
    height: 0.3rem;
    font-size: 0.13rem;
    color: #fff;
    background: lightsalmon;
    border: none;
    border-radius: 0.1rem;
    cursor: pointer;
    
    position: absolute;
    top: 0;
    right: .7rem;
  }
  .newPop{
    color: #2e3b50;
    font-size: .12rem;
  }
  .newPop .mask{
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, .7);

    position: fixed;
    top: 0;
    left: 0;
    z-index: 19;
  }
  .newPop .container{
    width: 2rem;
    height: 1.5rem;
    background-color: #fff;
    padding: .3rem;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 20;
  }
  .newPop .container ul{
    display: flex;
    flex-direction: column;
  }
  .newPop .container ul li{
    padding-bottom: .1rem;
  }
  .newPop li.name input{
    border: none;
    outline: none;
    border-bottom: 2px solid #2e3b50;
    margin-left: .1rem;
    width: 1.3rem;
    font-size: .12rem;
  }
  .newPop li.introduce textarea{
    width: 1.8rem;
    height: 0.7rem;
    outline: none;
    resize: none;
    border: 2px solid #2c3e50;
    border-radius: .05rem;
    padding: .05rem;
    margin-top: .05rem;
    font-size: .1rem;
  }
  .newPop li.btn{
    padding-left: 0.65rem;
  }
  .newPop li.btn button{
    width: 0.6rem;
    height: 0.2rem;
    border: none;
    background-color: #409EFF;
    color: #fff;
    font-size: 0.09rem;
    border-radius: 0.1rem;
    cursor: pointer;
  }
  .newPop li.btn button:hover{
    color: #191970;
  }
  .close {
    position: absolute;
    top: -0.1rem;
    right: 0.1rem;

    font-size: .4rem;
    cursor: pointer;
  }
</style>
