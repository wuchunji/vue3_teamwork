import axios from "axios"
import baseUrl from '../serverIp'
import { ref } from "vue"
import { mainStore } from "../../store"

export default function newKeyword() {
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
      const keywords = encodeURIComponent(_data)
      axios.get(`${baseUrl}/updatePaperKeyword?keywords=${keywords}&paperid=${store.nowId}`)
      keyWord.value = ''
    })
  }

  return {
    keyWord,
    addNewKeyword
  }
}