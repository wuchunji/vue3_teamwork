import { onMounted, reactive } from 'vue'
import axios from 'axios'
import baseUrl from '../serverIp'
import { mainStore } from '../../store'

export default function getInformation() {
  let store = mainStore()

  // 根据nowid获取公文信息
  type inforType = {
    title: string,
    keywords: any,
    usernames: any,
    brief: string,
    words: string,
  }
  let information: inforType = reactive({
    title: '',
    keywords: [],
    usernames: [],
    brief: '',
    words: ''
  })

  onMounted(() => {
    // 获取用户信息
    const getInformation = new Promise((resolve) => {
      axios.get(`${baseUrl}/getPaper?id=${store.nowId}`)
      .then(response => {
        const data = response.data[0]
        information.title = data.title
        information.brief = data.brief
        information.words = data.words        
        if(data.keywords) {
          information.keywords = data.keywords.split('&')
        }
        // 获取用户id
        const reg = /\d+/g
        resolve(data.members.match(reg))    
      })
    })
    // 获取用户姓名
    getInformation.then(async (data:any) => {
      for(let prop of data) {
        await axios.get(`${baseUrl}/getUsername?id=${prop}`)
        .then(response => {
          information.usernames.push(response.data[0].username)
        })
      }
    })
  })

  return information
}
