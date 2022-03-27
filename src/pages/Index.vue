<template>
  <div id="container">
    <div class="time">{{time}}</div>
    <div class="title">
      <h2>TeamWork</h2>
      <p>在线公文协同系统</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const time = dayjs(new Date().getTime()).format('YYYY年MM月DD日 HH:mm')
</script>

<style scoped>
  #container{
    background-image: url(../assets/img/indexBg1.png);
    background-size: 100% 4.055rem;
    height: 4.055rem;
    position: relative;
  }
  .time{
    font-size: .15rem;
    color: #fff;
    position: absolute;
    left: .3rem;
    top: .3rem;
  }
  .title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .title h2{
    color: #fff;
    font-size: .3rem;
    font-weight: 500;
  }
  .title p{
    color: #c5c5c5;
    font-size: .15rem;
    font-weight: 200;
  }
</style>
