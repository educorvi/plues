<template>
    <div>
        <md-drawer :md-active.sync="active" :v-scroll-lock="true" class="drawer" id="drawer" md-swipeable>
            <md-toolbar md-elevation="0">
                <span class="md-title" v-if="rootData">{{rootData.title}}</span>
            </md-toolbar>

            <md-list>
                <span class="mt-2"
                      v-if="token !== null && !(config !== undefined && config.workflows===false) && workflows.length>0">
                    <md-list-item v-b-toggle="'collapse-workflows'">
                    <p class="mb-0">
                        <b-icon-gear-fill variant="primary"/>
                        Workflows
                    </p>
                    </md-list-item>

                    <b-collapse accordion="sidebar" class="subgroup" id="collapse-workflows">
                        <md-list-item :key="lItem.title"
                                      @click="() => {executeWorkflow(lItem['@id']); active=false}"
                                      v-for="(lItem) in workflows">
                            {{lItem.title}}
                        </md-list-item>
                    </b-collapse>
                    <md-divider/>
                </span>

                <span :key="index" v-for="(item, index) in navitems">
                <span v-if="item.title !=='Home'">
                    <md-list-item :to="getTo(item)" v-if="item.items.length===0">
                    {{item.title}}
                </md-list-item>
                    <span v-else>
                    <md-list-item v-b-toggle="'collapse-'+index">
                        <b :class="isActive(item)?'text-primary':'text-black'">{{item.title}}</b>
                    </md-list-item>

                    <b-collapse :id="'collapse-'+index" accordion="sidebar" class="subgroup">
                        <md-list-item @click="traverse(item)">
                            <b>Alle Elemente aus {{item.title}}</b>
                        </md-list-item>
                        <md-list-item :key="lItem.title" :to="getTo(lItem)"
                                      v-for="(lItem) in item.items">
                            {{lItem.title}}
                        </md-list-item>
                    </b-collapse>

                </span>
                <md-divider v-if="index<navitems.length-1"></md-divider>
            </span>

            </span>
            </md-list>
        </md-drawer>
    </div>
</template>
<script>
    //@vuese
    //Hierbei handelt es sich um eine SideBar, in der die Workflows verwendet werden können
    import {mapGetters} from "vuex";
    import {createTraverserLink} from "@/traverser/normalizer";
    import {BIconGearFill} from "bootstrap-vue";

    export default {
        name: 'Sidebar',
        components: {
            BIconGearFill
        },
        data() {
            return {
                workflows: [],
                active: false,
                defIndex: 0,
                test: false
            }
        },
        props: {
            navitems: {
                type: Array
            }
        },
        created() {
            this.getWorkflows()
        },
        methods: {
            //Ruft die Workflows ab
            getWorkflows() {
                if (this.config !== undefined) {
                    const url = this.config.apiRoot + this.config.ploneRoot + this.$route.fullPath + "/@workflow";
                    this.http.get(url, {headers: {Accept: "application/json"}}).then(res => this.workflows = res.data.transitions);
                }

            },
            //Führt einen ausgewählten Workflow aus
            executeWorkflow(postURL) {
                this.http.post(postURL, {}, {headers: {Accept: "application/json"}}).then(res => {
                    this.getWorkflows();
                    if (res.status === 200) {
                        this.makeToast(true);
                    } else {
                        this.makeToast(false);
                    }
                }).catch(() => this.makeToast(false));
            },
            //Erstellt einen Toast, der anzeigt ob das Ändern erfolgreich war
            makeToast(success) {
                if (success) {
                    this.$bvToast.toast(`Änderung erfolgreich ausgeführt`, {
                        title: 'Erfolg',
                        autoHideDelay: 5000,
                        variant: 'success'
                    });
                } else {
                    this.$bvToast.toast(`Es ist ein Fehler aufgetreten`, {
                        title: 'Fehler',
                        autoHideDelay: 5000,
                        variant: 'danger'
                    });
                }
            },
            getTo(item) {
                const link = createTraverserLink(item, this.config);
                return link === '' ? '/' : link;
            },
            isActive(item) {
                return this.$route.fullPath.includes(createTraverserLink(item, this.config));
            }
        },
        computed: {
            ...mapGetters(["config", "rootData", "token"])
        },
        watch: {
            //Lädt die Workflows nach, wenn sich die Route ändert
            "$route.path": function () {
                if (this.$route.name === 'home') {
                    this.getWorkflows();
                }
                this.active = false;
            },
            active: function () {
                const targetElement = document.querySelector("#drawer");

                const bodyScrollLock = require('body-scroll-lock');
                const disableBodyScroll = bodyScrollLock.disableBodyScroll;
                const enableBodyScroll = bodyScrollLock.enableBodyScroll;

                if (this.active) {
                    disableBodyScroll(targetElement);
                } else {
                    enableBodyScroll(targetElement);
                }


            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../style";

    .header-sidebar {
        text-align: center;
    }

    .drawer {
        position: fixed;
        top: 0;
        left: 0;
        padding-top: 10vh;
        overflow-x: auto;
        padding-bottom: 8vh;
        height: 100vh;
    }

    ul {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    .subgroup {
        padding-left: 20px;
    }

    .drawer::-webkit-scrollbar-track {
        /*-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/
        border-radius: 0;
        background-color: rgba(245, 245, 245, 0);
    }

    .drawer::-webkit-scrollbar {
        width: 5px;
        background-color: #F5F5F5;
    }

    .drawer::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: $primary;
    }

    .text-black {
        color: black;
    }

    .text-primary {
        color: $primary;
    }

</style>
