/* eslint-disable no-console,no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Traverser from '@/traverser/install';
import BootstrapVue from "bootstrap-vue";
import './style.scss';
import axios from 'axios';
import Storage from "vue-ls";


Vue.config.productionTip = false;


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial);


const options = {
    namespace: 'pluesjs__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
};

Vue.use(Storage, options);

Vue.use(Traverser);
const token = Vue.ls.get("token", null);
if (token !== null) {
    const interceptor = function (config) {
        config.headers.Authorization = 'bearer ' + token;
        return config;
    };
    Vue.http.interceptors.request.use(interceptor)
}

const interceptor = function (config) {
    let params = new URLSearchParams();
    params.append("metadata_fields", "modified");
    params.append("metadata_fields", "creators");
    params.append("metadata_fields", "start");
    config.params = params;
    config.headers.Accept = "application/json";
    return config;
};
Vue.http.interceptors.request.use(interceptor);


Vue.http.interceptors.response.use((response) => { // intercept the global error
    return response;
}, function (error) {
    console.log(JSON.stringify(error));
    if (router.currentRoute.name === "home" && !error.config.url.includes('@workflow')) {
        router.app.$root.$bvToast.toast('Darauf konnte nicht zugegriffen werden. Entweder exisiert die Datei nicht, oder du hast kein Zugriffsrecht darauf. (Bist du angemeldet?)', {
            title: 'Fehler',
            autoHideDelay: 7000,
            variant: 'danger'
        });
    }
    router.replace('/')

});


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


