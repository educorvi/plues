import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    /* eslint-disable no-console */
    state: {
        //Werte werden durch Inhalt von config.json überschrieben
        config: null,
        rootData: null,
        navigation: null
    },
    mutations: {
        addNavigationToRootData(state, nav) {
            state.rootData.navigation = nav;
        }
    },
    actions: {},
    getters: {
        config:
            state => {
                if (state.config !== null) {
                    return state.config;
                } else {
                    axios.get('/config.json').then(res => {
                        state.config = res.data;
                        state.config.rootURL = state.config.apiRoot + state.config.ploneRoot;
                        return state.config;
                    })
                }
            },
        rootData:
            state => {

                function getRootData() {
                    axios.get(state.config.rootURL, {
                        headers: {
                            Accept: "application/json"
                        }
                    }).then(res => {
                        state.rootData = res.data;
                        document.title = res.data.title;
                    });
                }

                if (state.rootData !== null) {
                    return state.rootData;
                } else {
                    if (state.config === null) {
                        axios.get('/config.json').then(res => {
                            state.config = res.data;
                            state.config.rootURL = state.config.apiRoot + state.config.ploneRoot;
                            return getRootData();
                        });
                    } else {
                        return getRootData;
                    }

                }
            },
        navigation:
            state => {
                if (state.navigation === null) {
                    axios.get(state.config.rootURL + "/@navigation?expand.navigation.depth=2", {
                        headers: {
                            Accept: "application/json"
                        }
                    }).then(res => {
                        state.navigation = res.data.items;
                        return state.navigation;
                    });
                }
                return state.navigation;

            }

    },
    modules: {}
})
