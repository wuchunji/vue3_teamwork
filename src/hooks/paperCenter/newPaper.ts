import axios from "axios"
import baseUrl from '../serverIp'
import { mainStore } from "../../store"
import { reactive } from "vue"
import { router } from "../../route"

export default function newPaper() {
  const store = mainStore()

  const newPaperInfor = reactive({
    title: '',
    brief: ''
  })
  
  // 新建公文
  const addNewPaper = function () {
    // 用户输入不能为空
    if(newPaperInfor.title != '' && newPaperInfor.brief != '') {
      const getPaperAllId = new Promise((resolve) => {
        axios.get(`${baseUrl}/getPaperAllId`).then(response => {
          resolve(response.data)
        })
      })
      getPaperAllId.then((data: any) => {
        // 将新公文添加到公文表
        axios.get(`${baseUrl}/addPaper?paperid=${data.length}&members=${`管理员-${store.userId}`}&title=${newPaperInfor.title}&brief=${newPaperInfor.brief}&words=0`)
        // 将当前用户的公文集更新
        let paperids:String = '' 
        if(store.paperId) {
          paperids = encodeURIComponent(store.paperId+'&'+data.length)
        }else{
          paperids = encodeURIComponent(data.length)
        }
        axios.get(`${baseUrl}/updateUserPaperids?paperids=${paperids}&userid=${store.userId}`)
        
        // 更改store数据 跳转页面
        store.$patch({
          paperId: store.paperId+'&'+data.length,
          nowId: data.length
        })
        router.push('/paperControl')
      })
    }else{
      alert('公文标题和简介不能为空！')
    }
  }

  return {
    newPaperInfor,
    addNewPaper
  }
}