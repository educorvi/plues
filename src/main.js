import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';

Vue.config.productionTip = false;

//Vue Material (Für die SideBar)
import {MdDrawer, MdToolbar, MdList, MdDivider} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdDrawer);
Vue.use(MdToolbar);
Vue.use(MdList);
Vue.use(MdDivider);


//Vue Storage
const options = {
    namespace: 'pluesjs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
};
import Storage from "vue-ls";

Vue.use(Storage, options);

//Traverser aus eigenem modifiziertem Code
import Traverser from '@/traverser/install';

Vue.use(Traverser);

//BootstrapVue
import BootstrapVue from "bootstrap-vue";
import './style.scss';

Vue.use(BootstrapVue);


//Set Interceptors for axios (default erst wenn config.json gelesen)
import {setLoginInterceptor, setDefaultInterceptor, setDefaultErrorCatcher} from "@/./interceptors";

setLoginInterceptor(Vue);
setDefaultErrorCatcher(Vue);

//Laden der config.json
let config = {};
axios.get("/config.json").then(res => {
    config = res.data;
    setDefaultInterceptor(Vue, config.apiRoot);

    //Starten von Vue
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
                {
                    type: 'Image',
                    view: 'view',
                    component: () => import('./components/Traverser/ImageItem')
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


