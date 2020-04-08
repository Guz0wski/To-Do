import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TodoInformations from '../views/TodoInformations.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/todo/:id',
    name: 'todoInformations',
    component: TodoInformations
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
