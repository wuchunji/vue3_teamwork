import { defineStore } from "pinia";

export const mainStore = defineStore('mainStore', {
  state: ()=>{
    return {
      isLogin: false,
      userId: null,
      paperId: '', // 当前用户参与的公文id
      nowId: 0, // 当前页面的公文id
    }
  },
  getters: {},
  actions: {}
})