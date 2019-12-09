<template>
    <b-navbar id="bar" toggleable="lg" variant="light">
        <b-navbar-brand @click="traverse(rootData)" href="#">
            <span class="navbar-brand"><img id="logo" src="../../assets/logo.png"/>
           {{rootData.title}}</span>
        </b-navbar-brand>
        <b-navbar-toggle target="collapse"></b-navbar-toggle>

        <b-collapse class="mt-n2" id="collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-for="(item, index) in navigation" :key="index" class="text-center" @click="traverse(item)">{{item.title}}</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "Topbar",
        computed: {
            ...mapGetters(["rootData", "navigation"])
        }
    }
</script>

<style scoped>
    #logo {
        height: 40px;
    }

    #bar {
        position: sticky;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 0; /* top left corner should start at topmost spot */
        width: 100vw; /* take up the full browser width */
        z-index: 200; /* high z index so other content scrolls underneath */
        background: white;
    }
</style>