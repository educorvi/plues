<!--suppress CssUnusedSymbol -->
<template>
    <div id="app">
        <div >
            <Topbar/>
            <traverser-view class="container-fluid"/>
        </div>
    </div>
</template>

<style>
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
</style>
<script>
    import Topbar from "@/components/Navigation/Topbar";
    import {mapGetters} from 'vuex';
    import axios from "axios";

    export default {
        components: {Topbar},
        computed: {
            ...mapGetters(["config"])
        },
        created() {
            axios.get('/config.json').then(res => {
                let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = res.data.faviconURL;
                document.getElementsByTagName('head')[0].appendChild(link);
            });
        }
    }
</script>
