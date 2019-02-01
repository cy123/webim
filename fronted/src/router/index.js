import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'login',
          component: Login
        }
      ]
    }
  ]
})
