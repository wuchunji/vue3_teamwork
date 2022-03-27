import axios from "axios"
import baseUrl from '../serverIp'
import { mainStore } from "../../store"
import { onMounted, reactive } from "vue"

export default function getUserPaper() {
  const store = mainStore()
  let paperIdArr: any = [];
  let paperInformation: any[] = reactive([]) 

  onMounted(() => {
    const getUserPaperids = new Promise(resolve => {
      axios.get(`${baseUrl}/getUserPaperids?id=${store.userId}`)
      .then(response => {
        resolve(response.data[0].paperids)
      })
    })
    getUserPaperids.then(data => {
      const _data = data + ''
      paperIdArr = _data.split('&')
      // 获取用户参与公文信息
      const getUserPaper = async ()=>{
        for(let i = 0; i<paperIdArr.length; i++) {
          await axios.get(`${baseUrl}/getPaper?id=${paperIdArr[i]}`)
          .then(response => {
            const paper = {
              id: paperIdArr[i],
              title: response.data[0].title
            }
            paperInformation.push(paper)
          })
        }
      }
      getUserPaper()
    })    
  })

  return paperInformation

}