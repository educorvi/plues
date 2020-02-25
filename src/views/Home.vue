<template>
    <div ref="parentSidebar">
        <Breadcrumbs v-if="!$route.query.nonav"/>
            <b-icon-gear @click="$refs.sidebar.active = true" class="sidebarOpener" font-scale="2.4"
                         v-if="config.sideBar"/>
        <traverser-view/>
        <Sidebar ref="sidebar" v-if="config.sideBar"/>
    </div>
</template>

<script>


    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    import {mapGetters} from "vuex"
    import Sidebar from "@/views/Sidebar";
    import {BIconGear} from "bootstrap-vue"

    export default {
        /* eslint-disable no-console */
        name: 'home',
        components: {Sidebar, Breadcrumbs, BIconGear},

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
        position: sticky;
        position: -webkit-sticky;
        top: 80px;
        left: 10px;
        @media (min-width: 992px) {
            margin-left: -8%;
            margin-top: -5%;
        }
        color: $navbar-light-color;
        z-index: 1000;

    }

</style>
