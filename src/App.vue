<template>
    <div id="app">
        <Sidebar :navitems="navigation" ref="sidebar"/>
        <Topbar @sidebar="$refs.sidebar.active = !$refs.sidebar.active" v-if="!$route.query.nonav"/>
        <router-view class="container-fluid fluidsized"/>

    </div>
</template>

<style lang="scss">
    @import "style";

    .ccard {
        cursor: pointer;
        transition: background-color .3s cubic-bezier(.4, 0, .2, 1), box-shadow .4s cubic-bezier(.25, .8, .25, 1);
        will-change: background-color, box-shadow
    }

    .ccard:hover {
        z-index: 2;
        box-shadow: 0 4px 4px -2px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12)
    }

    img {
        max-width: 100%;
        height: auto;
    }

    @media (min-width: 992px) {
        .fluidsized {
            max-width: 1000px;
        }

    }

    table{
        border: none;
        @extend .table;
    }

</style>
<script>
    import Topbar from "@/components/Navigation/Topbar";
    import {mapGetters} from 'vuex';
    import Error from "@/views/Errors/General_Error";
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    import CustomSpinner from "@/components/Helper/CustomSpinner";
    import Sidebar from "@/components/Helper/Sidebar";

    export default {
        // eslint-disable-next-line vue/no-unused-components
        components: {Sidebar, CustomSpinner, Breadcrumbs, Error, Topbar},
        computed: {
            ...mapGetters(["config", "navigation"])
        },
        data() {
            return {}
        },
        created() {
            this.http.get('/config.json').then(res => {
                let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = res.data.faviconURL;
                document.getElementsByTagName('head')[0].appendChild(link);
            });
        }
    }
</script>
