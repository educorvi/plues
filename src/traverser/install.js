import View from '@/traverser/view';
import TraverserLink from '@/traverser/traverser-link';
import {updateComponent, traverse} from '@/traverser/traverser';
import traverserComponent from '@/traverser/traverserComponent';
import axios from 'axios';

export const api = process.env.NODE_ENV !== 'test' ? axios.create({
    headers: {
        Accept: 'application/json',
    },
}) : axios;

const plugin = {
    install(Vue) {
        Vue.http = api;

        Vue.mixin({
            beforeCreate() {
                if (this.$options.traverser) {
                    const views = this.$options.traverser.views || [];
                    this.$options.traverser.options.vue = Vue;
                    const options = this.$options.traverser.options;

                    Vue.util.defineReactive(Vue.prototype, '_component', Vue.component(traverserComponent.name, traverserComponent));
                    Vue.util.defineReactive(Vue.prototype, '_context', {});

                    if (!this.$router) {
                        throw new Error('vue-router has to be installed');
                    }

                    Vue.prototype.traverse = (item) => {
                        traverse(item, this.$router, this.$options.traverser.options);
                    };

                    const path = this.$route.path;
                    if (this.$router.getMatchedComponents(path).length === 0) {
                        updateComponent({views, path, vm: Vue, options});
                    }

                    this.$router.beforeEach((to, from, next) => {
                        this.$router.app.$store.commit("setLoading", true);
                        if (this.$router.getMatchedComponents(to).length) {
                            next();
                            if (to.name === 'home') {
                                updateComponent({views, path: to.path, vm: Vue, options});
                            }
                            return;
                        }
                        if (to.name === 'home') {
                            updateComponent({views, path: to.path, vm: Vue, options}).then(next);
                        }
                    });

                    const lpath = this.$options.traverser.options.apiRoot + this.$options.traverser.options.ploneRoot + this.$route.fullPath;
                    updateComponent({views, path: lpath, vm: Vue, options});


                }
            },
        });

        Object.defineProperty(Vue.prototype, '$component', {
            get() {
                return this._component;
            },
        });

        Object.defineProperty(Vue.prototype, '$context', {
            get() {
                return this._context;
            },
        });

        Vue.prototype.http = api;

        Vue.component(View.name, View);
        Vue.component(TraverserLink.name, TraverserLink);
    },
};

export default plugin;
