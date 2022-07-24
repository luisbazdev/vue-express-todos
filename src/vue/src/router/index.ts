import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Todos from '../components/Todos.vue'

import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/todos' 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    }
  ]
})

router.beforeEach(async(to, from) => {
  let authenticated
  
  await axios.post('http://localhost:8181/api/session', {}, {
    withCredentials: true
  })
  .then((res: any) => {
    authenticated = res.data.authenticated
  })

  if(authenticated){
    if(to.name === 'login' || to.name === 'register')
      return { name: 'todos' }
  }
  else{
    if(to.name === 'todos'){
      return { name: 'login'}
    }
  }
})

export default router
