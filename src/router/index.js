import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
import Uploader from "../views/Uploader.vue"
import JoinSheets from "../views/JoinSheets.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/upload',
    component: Uploader
  },
  {
    path: "/join",
    component: JoinSheets
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
