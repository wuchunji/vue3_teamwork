<template>
  <div id="information">
    <PageHead eng="Base information" cn="公文基本信息"></PageHead>
    <div class="container">
      <ul>
        <li class="name item">{{information.title}}<hr></li>
        <li class="keyword item">
          <span class="iconfont icon-guanjianci"></span>
          <span>关键词:</span>
          <ul>
            <li :style="{backgroundColor: bgColor[index]}"
            v-for="(item, index) in information.keywords" :key="index">
              {{item}}
            </li>
            <li class="add" @click="keywordShow = true">
              <span class="iconfont icon-jiahao"></span>
            </li>
          </ul>
        </li>
        <li class="people item">
          <span class="iconfont icon-chengyuan"></span>
          <span>团队成员:</span>
          <ul>
            <li v-for="item in information.usernames" :key="item">
              {{item}}  
            </li>
          </ul>
        </li>
        <li class="introduction item">
          <span class="iconfont icon-jianjie"></span>
          <span>简介:&nbsp;&nbsp;</span>
          <span>{{information.brief}}</span>
        </li>
        <li class="introduction item">
          <span class="iconfont icon-fabiaolunwen"></span>
          <span>字数:&nbsp;&nbsp;</span>
          <span>{{information.words}}</span>
        </li>
      </ul>
    </div>
    <!-- 新关键词遮罩层 -->
    <div class="newPop" v-if="keywordShow">
      <div class="mask"></div>
      <div class="container">
        <ul>
          <li class="name">
            <span>关键词:</span>
            <input type="text" v-model="keyWord">
          </li>
          <li class="btn">
            <button @click="addNewKeyword(); keywordShow = false">新增关键词</button>
          </li>
        </ul>
        <div class="close" @click="keywordShow = false">×</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import axios from "axios"
  import baseUrl from '../hooks/serverIp'
  import { ref } from "vue" 
  import { mainStore } from "../store"
  import PageHead from './PageHead.vue'
  import getInformation from '../hooks/Information/getInformation'

  let keywordShow = ref(false)

  // 随机关键词颜色
  const bgColor = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C','#409EFF', '#67C23A', '#E6A23C', '#F56C6C']

  // 得到公文信息渲染页面
  let information = getInformation()
  
  // 新增关键词
  const store = mainStore()
  const keyWord = ref('')
  const addNewKeyword = function() {
    // 获取公文原有关键词
    const getKeywords = new Promise((resolve) => {
      axios.get(`${baseUrl}/getKeyword?id=${store.nowId}`)
      .then(response => {
        resolve(response.data[0].keywords)
      })
    })
    // 更新公文关键词
    getKeywords.then((data) => {
      let _data: string = ''
      if(data) {
        _data = data + '&' + keyWord.value
      }else{
        _data = keyWord.value
      }
      information.keywords.push(keyWord.value)      
      const keywords = encodeURIComponent(_data)
      axios.get(`${baseUrl}/updatePaperKeyword?keywords=${keywords}&paperid=${store.nowId}`)
      keyWord.value = ''
    })
  }

</script>

<style scoped>
  .iconfont{
    font-size: .15rem;
    padding-right: 0.05rem;
    font-weight: 400;
  }
  .icon-jiahao{
    padding: 0;
  }
  #information{
    position: relative;
  }
  .container{
    font-size: .15rem;
    color: #2c3e50;
    padding-left: .4rem;
  }
  .container li.item{
    padding-bottom: .15rem;
  }
  .container .name{
    font-weight: 400;
    font-size: .17rem;
    width: 5rem;
  }
  .container .keyword{
    display: flex;
    align-items: center;
  }
  .container .keyword ul{
    display: flex;
    padding-left: .1rem;
  }
  .container .keyword ul li{
    height: .16rem;
    padding: .05rem;
    background-color: lightskyblue;
    border-radius: .07rem;
    margin-right: .05rem;
    font-size: .1rem;
    color: snow;
    text-align: center;
    line-height: .16rem;
  }
  .container .people{
    display: flex;
  }
  .container .people ul{
    margin-left: .1rem;
    margin-top: .02rem;
    font-size: .13rem;
    font-weight: 300;
    color: black;
  }
  .container .people li{
    /* width: 1.2rem; */
    border-bottom: 1px solid #2c3e50;
  }
  .container .introduction{
    width: 4rem;
  }
  .container .introduction span:nth-child(3){
    opacity: .8;
  }
  .add{
    cursor: pointer;
  }
  /* 遮罩层 */
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
    height: .5rem;
    background-color: #fff;
    padding: .3rem .1rem;
    border-radius: .2rem;

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
  .newPop li.name{
    font-size: .15rem;
  }
  .newPop li.name input{
    border: none;
    outline: none;
    border-bottom: 2px solid #2e3b50;
    margin-left: .1rem;
    width: 1rem;
    font-size: .12rem;
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
