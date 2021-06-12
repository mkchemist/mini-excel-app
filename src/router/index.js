import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
import Uploader from "../views/Uploader.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/upload',
    component: Uploader
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
