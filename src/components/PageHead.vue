<template>
  <div class="title">
    <h3>{{props.eng}}</h3>
    <p>{{props.cn}}</p>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    eng: String,
    cn: String
  })
</script>

<style scoped>
  .title{
    padding: .2rem .3rem;
  }
  .title h3{
    font-size: .15rem;
    font-weight: 800;
    padding-bottom: .05rem;
  }
  .title p{
    font-size: .09rem;
    font-weight: 200;
  }
</style>
