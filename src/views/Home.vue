<template>
    <div ref="parentSidebar">
        <Breadcrumbs v-if="!$route.query.nonav"/>
        <b-icon-gear @click="$refs.sidebar.active = true" class="sidebarOpener" font-scale="2.4"
                     v-if="config.sideBar && token !== null"/>
        <traverser-view v-show="!loading"/>
        <custom-spinner v-if="loading"/>
        <Sidebar ref="sidebar" v-if="config.sideBar && token !== null"/>
    </div>
</template>

<script>


    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    import {mapGetters} from "vuex"
    import Sidebar from "@/views/Sidebar";
    import {BIconGear} from "bootstrap-vue"
    import CustomSpinner from "@/components/Helper/CustomSpinner";

    export default {
        /* eslint-disable no-console */
        name: 'home',
        components: {CustomSpinner, Sidebar, Breadcrumbs, BIconGear},

        mounted() {
            this.traverse({"@id": this.$route.path + "?rel"});
        },
        computed: {
            ...mapGetters(["token", "config", "loading"])
        }
    }
</script>

<style lang="scss" scoped>
    @import "src/style";

    .sidebarOpener {
        @extend .rounded;
        background-color: $primary;
        float: left;
        @media (min-width: 992px) {
            position: fixed;
            top: 80px;
            left: 8px;

        }
        @media (max-width: 991px) {
            position: sticky;
            position: -webkit-sticky;
            top: 80px;
            left: 10px;
        }
        color: $navbar-light-color;
        z-index: 1000;

    }

</style>
