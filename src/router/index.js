import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Error from "@/views/Error";

Vue.use(VueRouter);

const routes = [

  {
    path: '/error',
    name: 'error',
    component: Error
  },
  // {
  //   path: '*',
  //   name: 'home',
  //   component: Home
  // }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
