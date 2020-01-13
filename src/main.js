/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Traverser from 'plone-vue';
import BootstrapVue from "bootstrap-vue";
import './style.scss';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(Traverser);
Vue.use(BootstrapVue);

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


