import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [

  {
    path: '/errors/default',
    name: 'gerror',
    component: () => import("@/views/Errors/General_Error")
  },
  {
    path: '/errors/contenttyp/:type',
    name: 'mcterror',
    component: () => import("@/views/Errors/Missing_Contenttype_Error")
  },
  {
    path: '*',
    name: 'home',
    component: () => import("@/views/Home")
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router
