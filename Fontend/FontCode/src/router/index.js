import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import MainPage from '@/components/mainPage'
import acList from '@/components/activityList'
import clList from '@/components/clubList'
import Club from '@/components/club'
import Activity from '@/components/activity'
import myList from '@/components/myList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    
    {
      path:'/mainpage/',
      name:'mainpage',
      component:MainPage,
      meta: {
        keepAlive: true // 需要被缓存
      },
      children:[
        {path:'alist',component:acList,meta:{keepAlive:true}},
        {path:'clist',component:clList,meta:{keepAlive:true}},
        {path:'mylist',component:myList,meta:{keepAlive:true}}
      ]
    },
    {
      path:'/mainpage',
      redirect:'/mainpage/alist'
    },
    {
      path:'/club',
      name:'club',
      component:Club,
    },
    {
      path:'/activity',
      name:'activity',
      component:Activity
    }
  ]
})
