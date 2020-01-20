/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Traverser from 'plone-vue';
import BootstrapVue from "bootstrap-vue";
import './style.scss';
import axios from 'axios';
import Storage from "vue-ls";

Vue.config.productionTip = false;

Vue.use(Traverser);
const interceptor = function (config) {
  console.log("Request with Token on Vue.http");
  // config.headers.Authorization = 'bearer ' + state.authToken;
  console.log(config);
  return config;
};
console.log("Set Requestinterceptor");
Vue.http.interceptors.request.use(interceptor);
console.log(Vue.http.interceptors.request);
Vue.use(BootstrapVue);

const options = {
  namespace: 'pluesjs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

let config = {};

axios.get("/config.json").then(res => {
  config = res.data;

  new Vue({
    router,
    store,
    traverser: {
      views: [
        {
          type: 'Folder',
          view: 'view',
          component: () => import('./components/Traverser/Folder'),
        },
        {
          type: 'Plone Site',
          view: 'view',
          component: () => import('./components/Traverser/PloneSite')
        },
        {
          type: 'Document',
          view: 'view',
          component: () => import('./components/Traverser/Document')
        },
          {
          type: 'Event',
          view: 'view',
          component: () => import('./components/Traverser/EventItem')
        },

          {
          type: 'News Item',
          view: 'view',
          component: () => import('./components/Traverser/NewsItem')
        },
          {
          type: 'Collection',
          view: 'view',
          component: () => import('./components/Traverser/Collection')
        },
      ],
      options: {
        apiRoot: config.apiRoot,
        ploneRoot: config.ploneRoot,
      },
    },
    render: h => h(App)
  }).$mount('#app');
});


