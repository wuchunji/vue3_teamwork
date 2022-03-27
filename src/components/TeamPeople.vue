<template>
  <div id="teamPeople">
    <PageHead eng="Team members" cn="团队成员管理"></PageHead>
    <div class="container">
      <button class="manage" 
      :style="{background: isPower ? '#409eff' : '#909399'}"
      @click="newPaper">
        添加成员
      </button>
      <div class="table">
        <table>
          <tr class="firstLine">
            <td>ID</td>
            <td>姓名</td>
            <td>角色</td>
          </tr>
          <tr v-for="item in peopleArr" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>
              <span class="iconfont" 
              :class="item.position == '管理员' ? 'icon-guanliyuan1':'icon-guanliyuan'"></span>
              <span>{{item.position}}</span>
            </td>
            <td>
              <button class="delete"
              :style="{background: isPower ? '#F56C6C' : '#909399'}"
              @click="deleteMember(item)">
                移除
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 新建成员遮罩层 -->
    <div class="newPop" v-if="newPeopleShow">
      <div class="mask"></div>
      <div class="container">
        <ul>
          <li class="name">
            <span>成员ID:</span>
            <input type="text" v-model="newMember.id">
          </li>
          <li class="status">
            <span>角&nbsp;&nbsp;&nbsp;色:</span>
            <select name="status" v-model="newMember.status">
              <option value="管理员">管理员</option>
              <option value="成员">成员</option>
            </select>
          </li>
          <li class="btn">
            <button @click="addNewMember">新增成员</button>
          </li>
        </ul>
        <div class="close" @click="newPeopleShow = false">×</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'axios';
  import baseUrl from '../hooks/serverIp'
  import { onMounted, reactive, ref } from 'vue';
  import PageHead from './PageHead.vue';
  import { mainStore } from '../store/index'

  const store = mainStore()
  let isPower = ref(false)
  let newPeopleShow = ref(false)

  
  // 添加成员
  function newPaper() {
    if(isPower.value) {
      newPeopleShow.value = true
    }else{
      alert('你没有管理员权限')
    }
  }
  // 新增成员
  const newMember = reactive({
    id: '',
    status: '成员'
  })
  function addNewMember() {
    // 判断输入的用户id存在是否
    axios.get(`${baseUrl}/getUsername?id=${newMember.id}`)
    .then(response => {
      if(response.data[0]) {
        let isHave = false
        // 判断输入的用户是否在这个公文里了
        for(let prop of peopleArr) {
          if(prop.id == newMember.id) {
            isHave = true
            alert('成员已存在')
            break;
          }
        }
        if(!isHave) {
          const _newMemberId = newMember.id
          // 添加新成员
          const getMembers = new Promise(resolve => {
            axios.get(`${baseUrl}/getPaperMembers?id=${store.nowId}`)
            .then(response => {
              resolve(response.data[0].members)
            })
          })
          getMembers.then(data => {
            // 更新新成员的参与的公文数据
            axios.get(`${baseUrl}/getUserPaperids?id=${newMember.id}`)
            .then(response => {
              let _paperids
              // console.log(response.data[0].paperids == false)
              if(response.data[0].paperids) {
                _paperids = `${response.data[0].paperids}&${store.nowId}`
                _paperids = encodeURIComponent(_paperids)
              }else{
                _paperids = store.nowId
              }
              axios.get(`${baseUrl}/updateUserPaperids?paperids=${_paperids}&userid=${_newMemberId}`)
            })

            // 更新此公文的成员数据
            let _members = `${data}&${newMember.status}-${newMember.id}`
            _members = encodeURIComponent(_members)
            axios.get(`${baseUrl}/updatePaperMember?members=${_members}&paperid=${store.nowId}`)
            
            // 更新页面
            peopleArr.push({
              id: newMember.id,
              position: newMember.status,
              name: response.data[0].username
            })
            // 关闭新增框
            newMember.id = ''
            newMember.status = '成员'
            newPeopleShow.value = false
          })
        }
      }else{
        alert('用户不存在！');
      }
    }) 
  }


  // 删除成员
  function deleteMember(member: any) {
    if(member.position == '成员' && isPower.value == true) {
      const getMem = new Promise(resolve => {
        axios.get(`${baseUrl}/getPaperMembers?id=${store.nowId}`)
        .then(response => {
          resolve(response.data[0].members)
        })
      })
      getMem.then(data => {
        // 移除公文表中成员数据
        let _members = data + ''
        _members = _members.replace(`&${member.position}-${member.id}`, '')
        _members = encodeURIComponent(_members)
        axios.get(`${baseUrl}/updatePaperMember?members=${_members}&paperid=${store.nowId}`)
        
        // 移除用户表中的数据
        axios.get(`${baseUrl}/getUserPaperids?id=${member.id}`)
        .then(response => {
          let _newPaperids
          const _data = response.data[0].paperids
          // 判断用户参与的公文是否只有这一个
          if(_data.indexOf('&') == -1) {
            _newPaperids = ''
          }else{
            // 判断用户参与的公文这个公文是否是第一个
            if(_data.indexOf(`&${store.nowId}`) == -1) {
              _newPaperids = _data.replace(`${store.nowId}&`, '')
              _newPaperids = encodeURIComponent(_newPaperids)
            }else{
              _newPaperids = _data.replace(`&${store.nowId}`, '')
              _newPaperids = encodeURIComponent(_newPaperids)
            }
          }
          axios.get(`${baseUrl}/updateUserPaperids?paperids=${_newPaperids}&userid=${member.id}`)
        })

        // 更改数据渲染页面
        peopleArr.forEach((item, index) => {
          if(item.id == member.id) {
            peopleArr.splice(index, 1)
          }
        })
      })
    }else{
      alert('你没有权限移除他！')
    }
  }

  
  // 获取公文成员数据渲染页面
  let peopleArr: any[] = reactive([])
  onMounted(() => {
    // 获取成员信息
    const getPaperMembers = new Promise((resolve, reject) => {
      axios.get(`${baseUrl}/getPaperMembers?id=${store.nowId}`)
      .then(response => {
        const members = response.data[0].members
        const memArr = members.split('&')
        for(let prop of memArr) {
          const arr = prop.split('-')
          peopleArr.push({
            id: arr[1],
            position: arr[0]
          })
          // 判断当前用户是否为管理员
          if(arr[1] == store.userId && arr[0] == '管理员') {
            isPower.value = true
          }
        }
        resolve('success')
      })
    })
    // 获取用户名字
    getPaperMembers.then(() => {
      for(let prop of peopleArr) {
        axios.get(`${baseUrl}/getUsername?id=${prop.id}`)
        .then(response => {
          prop.name = response.data[0].username
        })
      } 
    })    
  })


</script>

<style scoped>
  .iconfont{
    font-size: .12rem;
    padding-right: .07rem;
  }
  table{
    border-collapse: collapse;
  }
  .container{
    font-size: .13rem;
    color: #2e3c50;
    font-weight: 300;
    position: relative;
  }
  .container .table{
    padding-left: .5rem;
  }
  .container .table .firstLine{
    font-size: .18rem;
    font-weight: 400;
    color: #708090;
  }
  .container .table tr{
    border-bottom: 1px solid #c5c5c5;
  }
  .container .table td{
    width: 1rem;
    height: .3rem;
  }
  .container tr td:nth-child(1) {
    width: 1.5rem;
  }
  .container tr td:nth-child(4){
    width: .5rem;
  }
  .container .table .delete{
    width: 0.3rem;
    height: 0.17rem;
    font-size: .08rem;
    background: #F56C6C;
    border: none;
    color: snow;
    border-radius: 0.05rem;
    cursor: pointer;
  }
  .container .manage{
    position: absolute;
    top: -.5rem;
    right: 1.5rem;

    width: 0.6rem;
    height: 0.23rem;
    font-size: 0.1rem;
    border: none;
    background: #409EFE;
    color: snow;
    border-radius: 0.1rem;
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
    width: 1.3rem;
    font-size: .12rem;
  }
  .newPop li.status select{
    margin-left: .1rem;
    /* appearance:none; */
    width: .5rem;
    height: 0.15rem;
    border: 2px solid #2e3b50;
    border-radius: 0.05rem;
    padding: 0.01rem;
    cursor: pointer;
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