<template>
    <div ref="parentSidebar">
        <Breadcrumbs v-if="!$route.query.nonav"/>
        <h1 v-if="config.sideBar">
            <b-icon-list @click="$refs.sidebar.active = true" class="sidebarOpener"/>
        </h1>
        <traverser-view/>
        <Sidebar ref="sidebar" v-if="config.sideBar"/>
    </div>
</template>

<script>


    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    import {mapGetters} from "vuex"
    import Sidebar from "@/views/Sidebar";
    import {BIconList} from "bootstrap-vue"

    export default {
        /* eslint-disable no-console */
        name: 'home',
        components: {Sidebar, Breadcrumbs, BIconList},

        mounted() {
            this.traverse({"@id": this.$route.path + "?rel"});
        },
        computed: {
            ...mapGetters(["token", "config"])
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/style";

    .sidebarOpener {
        @extend .rounded;
        background-color: $primary;
        float: left;
        /*position: sticky;*/
        /*position: -webkit-sticky;*/
        /*top: 80px;*/
        /*left: 10px;*/
        color: $navbar-light-color;
        z-index: 1000;

    }

</style>
