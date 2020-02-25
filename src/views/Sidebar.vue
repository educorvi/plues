<template>
    <div>
        <vs-sidebar class="sidebarx" color="primary" default-index="1" parent="body" spacer v-model="active">
            <div class="header-sidebar" slot="header">
                <h4>{{rootData.title}}</h4>
            </div>
            <vs-sidebar-group open title="Workflow">
                <vs-sidebar-item :index="'1.'+index" :key="'1.'+index" :to="$route.fullPath"
                                 @click="executeWorkflow(item['@id'])" v-for="(item, index) in workflows">
                    {{item.title}}
                </vs-sidebar-item>
            </vs-sidebar-group>
        </vs-sidebar>
    </div>
</template>
<script>
    //Hierbei handelt es sich um eine SideBar, in der die Workflows verwendet werden können
    import {mapGetters} from "vuex";

    export default {
        name: 'Sidebar',
        data() {
            return {
                workflows: [],
                active: false
            }
        },
        created() {
            this.getWorkflows()
        },
        methods: {
            //Ruft die Workflows ab
            getWorkflows() {
                const url = this.config.apiRoot + this.config.ploneRoot + this.$route.fullPath + "/@workflow";
                this.http.get(url, {headers: {Accept: "application/json"}}).then(res => this.workflows = res.data.transitions);
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
            }
        },
        computed: {
            ...mapGetters(["config", "rootData"])
        },
        watch: {
            //Lädt die Workflows nach, wenn sich die Route ändert
            "$route.path": function () {
                this.getWorkflows();
            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "src/style";

    .header-sidebar {
        text-align: center;
    }
</style>
