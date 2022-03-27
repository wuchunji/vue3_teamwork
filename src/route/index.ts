import { createRouter, createWebHashHistory } from "vue-router";
import Index from '../pages/Index.vue'
import SignIn from '../pages/SignIn.vue'
import SignUp from '../pages/SignUp.vue'
import PaperCenter from '../pages/PaperCenter.vue'
import PaperControl from '../pages/PaperControl.vue'

import Information from '../components/Information.vue'
import TeamPeople from '../components/TeamPeople.vue'
import Process from '../components/Process.vue'
import EditPaper from '../components/EditPaper.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'index',
      path: "/",
      component: Index
    },
    {
      name: 'signIn',
      path: '/signIn',
      component: SignIn
    },
    {
      name: 'signUp',
      path: '/signUp',
      component: SignUp
    },
    {
      name: 'paperCenter',
      path: '/paperCenter',
      meta: {
        isAuth: true
      },
      component: PaperCenter
    },
    {
      name: 'paperControl',
      path: '/paperControl',
      meta: {
        isAuth: true
      },
      component: PaperControl,
      children: [
        {
          name: 'information',
          path: '',
          component: Information
        },
        {
          name: 'teamPeople',
          path: 'teamPeople',
          component: TeamPeople
        },
        {
          name: 'process',
          path: 'process',
          component: Process
        },
        {
          name: 'editPaper',
          path: 'editPaper',
          component: EditPaper
        }
      ]
    }
  ]
})

// 全局前置路由守卫，初始化和每次路由器切换前调用
router.beforeEach((to, from, next) => {
  if(to.meta.isAuth) { // 判断是否需要验证权限
    if(sessionStorage.getItem('isPower') === 'true') { // 验证权限
      next();
    }else{
      alert('无权访问');
    }
  }else{
    next();
  }
})