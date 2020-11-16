import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import('./../views/Movies.vue')
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
    props: true
  },
  {
    path: '/shows',
    name: 'Shows',
    component: () => import('../views/Shows.vue')
  },
  // {
  //   path: '/show/:id',
  //   name: 'Show',
  //   component: () => import('../views/Show.vue'),
  //   props: true
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
