<template>
  <div id="edit">
    <PageHead eng="Edit article" cn="公文内容编辑"></PageHead>
    <div class="container">
      <div id="editBox" ref="editBox"></div>
      <div class="btn">
        <button class="submit" @click="save">保&nbsp;存</button>
        <button class="histroy" @click="newHistroyShow = true">创建历史版本</button>
      </div>
    </div>
    <!-- 新建历史版本遮罩层 -->
    <div class="newPop" v-if="newHistroyShow">
      <div class="mask"></div>
      <div class="container">
        <ul>
          <li class="name">
            <span>历史版本标题:</span>
            <input type="text" v-model="histroyTip" placeholder="date-title">
          </li>
          <li class="btn">
            <button @click="addHistroy">新建历史版本</button>
          </li>
        </ul>
        <div class="close" @click="newHistroyShow = false">×</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  import baseUrl from '../hooks/serverIp'
  import PageHead from './PageHead.vue';
  import E from 'wangeditor'
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { mainStore } from '../store/index'

  const store = mainStore()
  let newHistroyShow = ref(false)
  
  // 保存功能
  let editor: any
  function save() {
    alert('保存成功！')
    // 保存公文内容
    let _newHtml = editor.txt.html()
    _newHtml = encodeURIComponent(_newHtml)
    axios.post(`${baseUrl}/updatePaperContainer?id=${store.nowId}&container=${_newHtml}`)
    
    // 计算新公文的字数 更新公文字数
    const _words = editor.txt.text().length
    axios.get(`${baseUrl}/updatePaperWords?words=${_words}&paperid=${store.nowId}`)
  }  

  // 创建历史版本功能
  let histroyTip = ref('')
  function addHistroy() {
    let index:any
    // 获取公文当前历史版本
    const getHistroy = new Promise(resolve => {
      axios.get(`${baseUrl}/getPaperHistroy?id=${store.nowId}`)
      .then(response => {
        let _histroy
        if(response.data[0].histroy) {
          const histroyArr = response.data[0].histroy.split('&')
          _histroy = `${response.data[0].histroy}&${histroyArr.length}`
          index = histroyArr.length
        }else{
          _histroy = '0'
          index = 0
        }
        resolve(_histroy)
      })
    })
    // 更新当前公文的历史版本
    getHistroy.then(data => {
      let __histroy = data + ''
      __histroy = encodeURIComponent(__histroy)
      axios.get(`${baseUrl}/updatePaperHistroy?histroy=${__histroy}&paperid=${store.nowId}`)
    }).then(() => {
      // 添加到历史版本表中
      const id = encodeURIComponent(`${store.nowId}_${index}`)
      const tip = encodeURIComponent(histroyTip.value)
      const container = encodeURIComponent(editor.txt.html())
      axios.get(`${baseUrl}/addHistroy?id=${id}&tip=${tip}&container=${container}`)
      
      histroyTip.value = ''
      newHistroyShow.value = false
      alert('添加成功！')
    })
  }

  // 初始化编辑器
  onMounted(() => {
    // 创建富文本编辑器
    editor = new E('#editBox')
    editor.config.height = 500
    editor.config.zIndex = 15
    editor.create()

    // 获取公文内容
    const getContainer = () => {
      axios.get(`${baseUrl}/getPaperContainer?id=${store.nowId}`)
      .then(response => {
        // 做一个xss处理
        editor.txt.html(response.data[0].container) 
      })  
    }
    getContainer()
  })
  // 结束时销毁
  onBeforeUnmount(() => {
    editor.destroy()
    editor = null
  })

</script>

<style scoped>
  .container{
    padding-left: .5rem;
  }
  #editBox{
    width: 5rem;
    font-size: .1rem;
    overflow: hidden;
  }
  .container .btn{
    height: .5rem;
    width: 5rem;
    display: flex;
    justify-content: center;
    margin-top: .2rem;
  }
  .container .btn button{
    width: 0.5rem;
    height: 0.2rem;
    font-size: .1rem;
    border: none;
    color: snow;
    border-radius: 0.05rem;
    margin-right: .2rem;
    cursor: pointer;
  }
  .container .btn .submit{
    background-color: #67C23A;
  }
  .container .btn .histroy{
    width: 1rem;
    background-color: #F56C6C;
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
    width: 2rem;
    height: 1rem;
    background-color: #fff;
    padding: .3rem;
    font-size: .12rem;
    font-weight: 400;
    border-radius: 0.2rem;

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
    padding-top: .2rem;
    width: 1.8rem;
    font-size: .12rem;
  }
  .newPop li.btn{
    padding-left: 0.65rem;
    width: .8rem;
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
    margin-top: .1rem;
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
