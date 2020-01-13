<template>
    <b-navbar class="mb-2" id="bar" toggleable="lg" type="light" v-if="rootData!==null">
        <b-navbar-brand @click="traverse(rootData)" href="#">
            <div class="navbar-brand">
                <img alt="Logo" id="logo" src="../../assets/logo.png">
                <h5 class="ml-2" style="display: inline;"></h5>
            </div>
        </b-navbar-brand>
        <b-navbar-toggle target="collapse"/>

        <b-collapse class="mt-n2" id="collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <span :key="index" v-for="(item, index) in navigation">
                    <b-nav-item @click="traverse(item)" class="text-center" v-if="item.items===''">
                        {{item.title}}
                     </b-nav-item>
                    <b-nav-item-dropdown :text="item.title" class="text-center" right v-else>
                        <b-dropdown-item @click="traverse(item)"
                                         class="border-bottom border-light"><b>Alle {{item.title}}</b></b-dropdown-item>
                        <b-dropdown-item :key="lItem.title" @click="traverse(lItem)" v-for="lItem in item.items">
                            {{lItem.title}}
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </span>

            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapGetters} from 'vuex';
    // @vuese
    // Navigation Bar für die App, deren NavItems sich dynamisch an Plone anpassen
    // @group Navigation
    export default {
        name: "Topbar",
        computed: {
            ...mapGetters(["rootData", "navigation"])
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../public/custom.scss";


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
        background: $navbar-custom-color;
    }

    #bar > * {
        color: white !important;
    }

</style>