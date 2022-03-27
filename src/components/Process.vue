<template>
  <div id="process">
    <PageHead eng="Process management" cn="写作进程管理"></PageHead>
    <div class="container">
      <div class="milepost">
        <p>
          <span class="iconfont icon-tianjialichengbei"></span>
          公文里程碑:
        </p>
        <ul>
          <li v-for="item in milepost" :key="item.data"
          @click="showMilepost(item)">
            <div class="circle">{{item.data}}</div>
            <div class="line"></div>
          </li>
          <li>
            <div class="circle" @click="newMilepostShow = true">
              <span class="iconfont icon-jia"></span>
            </div>
          </li>
        </ul>
        <div class="showContainer">
          {{milepostContainer}}
        </div>
      </div>
      <div class="histroy">
        <p>
          <span class="iconfont icon-history"></span>
          历史版本:
        </p>
        <ul>
          <li v-for="(item, index) in histroyTip" :key="index" @click="showHistroy(index)">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 新建里程碑遮罩层 -->
    <div class="newPop" v-if="newMilepostShow">
      <div class="mask"></div>
      <div class="container">
        <ul>
          <li class="name">
            <span>日期:</span>
            <input type="text" v-model="newMilepost.data">
          </li>
          <li class="introduce">
            <span>介绍:</span>
            <textarea cols="40" rows="5" v-model="newMilepost.brief"></textarea>
          </li>
          <li class="btn">
            <button @click="addNewMilepost">新建里程碑</button>
          </li>
        </ul>
        <div class="close" @click="newMilepostShow = false">×</div>
      </div>
    </div>

    <!-- 查看历史版本 -->
    <div class="showHistroy newPop" ref="histroyBox" v-show="histroyShow">
      <div class="mask"></div>
      <div id="_histroy" class="container"></div>
      <div class="close" @click="closeHistroy">×</div>
    </div>
</div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  import baseUrl from '../hooks/serverIp'
  import { onMounted, reactive, ref } from 'vue';
  import PageHead from './PageHead.vue';
  import { mainStore } from '../store/index'
  import E from 'wangeditor'

  const store = mainStore()
  let newMilepostShow = ref(false)

  // 展示里程碑内容 
  let milepostContainer = ref('点击日期查看里程碑标记')
  function showMilepost(item: any) {
    milepostContainer.value = item.data + '-' + item.container
  }


  // 新建里程碑
  const newMilepost = reactive({
    data: '',
    brief: ''
  })
  function addNewMilepost() {
    const getMilepost = new Promise((resolve) => {
      axios.get(`${baseUrl}/getPaperMilepost?id=${store.nowId}`)
      .then(response => {
        resolve(response.data[0].milepost)
      }) 
    })
    getMilepost.then((data) => {
      let _milepost: string = ''
      if(data) {
        _milepost = `${data}&${newMilepost.data}-${newMilepost.brief}`
      }else {
        _milepost = `${newMilepost.data}-${newMilepost.brief}`
      }
      // 添加新里程碑
      _milepost = encodeURIComponent(_milepost)  
      axios.get(`${baseUrl}/updatePaperMilepost?milepost=${_milepost}&paperid=${store.nowId}`)
      // 更新页面
      milepost.push({
        data: newMilepost.data,
        container: newMilepost.brief
      })
      // 关闭新增框
      newMilepost.data = ''
      newMilepost.brief = ''
      newMilepostShow.value = false
    })
  }


  // 公文历史版本所用数据
  const histroyId: any[] = reactive([])
  const histroyTip: any[] = reactive([])
  const histroyContainer: any[] = reactive([])
  onMounted(() => {
    // 获取当前公文历史版本
    const getHistroy = new Promise((resolve) => {
      axios.get(`${baseUrl}/getPaperHistroy?id=${store.nowId}`)
      .then(response => {
        if(response.data[0].histroy) {
          const histroyArr = response.data[0].histroy.split('&')
          resolve(histroyArr)
        }
      })
    })
    getHistroy.then((histroyArr: any) => {
      for(let prop of histroyArr) {
        histroyId.push(store.nowId + '_' + prop)
      }
    }).then(async () => {
      for(let prop of histroyId) {
        await axios.get(`${baseUrl}/getHistroy?id='${prop}'`)
        .then(response => {
          histroyTip.push(response.data[0].tip)
          histroyContainer.push(response.data[0].container)
        })
      }
    })
  })


  // 获取当前公文里程碑信息
  const milepost: any[] = reactive([])
  const getMilepost = () => {
    axios.get(`${baseUrl}/getPaperMilepost?id=${store.nowId}`)
    .then(response => {
      if(response.data[0].milepost) {
        const milepostArr = response.data[0].milepost.split('&')
        for(let prop of milepostArr) {
          const arr = prop.split('-')
          milepost.push({
            data: arr[0],
            container: arr[1],
          })
        }
      } 
    })
  }
  onMounted(() => {
    // 获取当前公文里程碑信息
    getMilepost()
  })


  // 查看历史版本
  let histroyShow = ref(false)
  let histroyBox = ref()
  let editor: any
  function showHistroy(index: any) {
    // console.log(histroyContainer[index])
    histroyShow.value = true
    editor = new E('#_histroy')
    editor.config.height = 500
    editor.create()
    editor.txt.html(histroyContainer[index])
  }
  // 关闭历史版本查看
  function closeHistroy() {
    histroyShow.value = false
    editor.destroy()
    editor = null
  }
</script>

<style scoped>
  .iconfont{
    font-size: .15rem;
    font-weight: 700;
    padding-right: .05rem;
  }
  .icon-jia{
    font-size: .18rem;
    padding: 0;
  }
  .container{
    font-size: .15rem;
    padding-left: .5rem;
    color: #2e3b50;
  }
  .milepost{
    margin-bottom: .2rem;
  }
  .milepost ul{
    display: flex;
    margin-top: .2rem;
  }
  .milepost ul li{
    display: flex;
    align-items: center;
  }
  .milepost ul li div.circle{
    width: 0.4rem;
    height: 0.4rem;
    border: 5px solid skyblue;
    border-radius: 50%;
    text-align: center;
    line-height: 0.4rem;
    cursor: pointer;
  }
  .milepost ul li div.line{
    width: 0.4rem;
    height: 0.03rem;
    background: #c5c5c5;
    display: inline-block;
  }
  .milepost .showContainer{
    padding-top: .2rem;
    padding-left: .15rem;
  }
  .histroy ul{
    margin-top: .2rem;
    margin-left: .2rem;
  } 
  .histroy ul li{
    width: 3.5rem;
    border-bottom: 1px solid #c5c5c5;
    margin-bottom: 0.1rem;
    font-size: .12rem;
    opacity: .7;
  }
  .histroy ul li span{
    cursor: pointer;
  }

  /* 遮罩 */
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
    width: 2.1rem;
    height: 1.7rem;
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

  /* 历史版本 */
  .showHistroy #_histroy{
    width: 5rem;
    height: 3rem;
  }
  .showHistroy .close{
    position: fixed;
    top: .15rem;
    right: 1rem;

    font-size: .4rem;
    cursor: pointer;
    z-index: 20;
  }
</style>
