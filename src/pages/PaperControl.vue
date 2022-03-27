<template>
  <div id="paperControl">
    <div class="sideNav">
      <ul>
        <li class="title">
          TeamWork
        </li>
        <li class="item">
          <span class="iconfont icon-lunwentimu"></span>
          <router-link to="/paperControl">公文信息</router-link>
        </li>
        <li class="item">
          <span class="iconfont icon-chengyuan"></span>
          <router-link to="/paperControl/teamPeople">公文成员</router-link>
        </li>
        <li class="item">
          <span class="iconfont icon-jincheng"></span>
          <router-link  to="/paperControl/process">进程管理</router-link>
        </li>
        <li class="item">
          <span class="iconfont icon-bianji"></span>
          <router-link to="/paperControl/editPaper">内容编辑</router-link>
        </li>
      </ul>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
  
</template>

<script lang="ts" setup>

</script>

<style scoped>
  .iconfont{
    font-size: .12rem;
    padding-right: .1rem;
  }
  a{
    font-size: .13rem;
    font-weight: 300;
    color: #fff;
  }
  #paperControl{
    display: flex;
  }
  .sideNav{
    width: 1.1rem;
    font-size: .13rem;
    color: #fff;
    background-color: #2c3e50;
    height: 4.055rem;
  }
  .sideNav li.title{
    padding: .15rem 0;
    font-weight: 400;
    font-size: .15rem;
    padding-left: .15rem;
  }
  .sideNav li.item{
    padding: .09rem;
    border-bottom: 1px solid snow;
    margin: 0 .04rem;
  }
  .sideNav li.item a:hover{
    color: lightskyblue;
  }
  .container{
    flex: 1;
    background-color: #f5f5f5;
    height: 4.055rem;
    overflow-y: scroll
  }
</style>
