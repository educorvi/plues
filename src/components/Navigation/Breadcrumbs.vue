<template>
    <ol class="breadcrumb" style="position: sticky" v-if="breadcrumbs.length>0 || breadcrumbs===null">
        <li @click="traverse(rootData)" class="breadcrumb-item"><a>
            <b-icon-house-fill font-scale="1.5" variant="primary"/>
        </a></li>
        <li v-for="(item) in breadcrumbs.slice(0, breadcrumbs.length-1)" :key="item['@id']" class="breadcrumb-item">
            <traverser-link
                    :item="item">{{item.title}}
            </traverser-link>
        </li>
        <li class="breadcrumb-item active">{{breadcrumbs[breadcrumbs.length-1].title}}</li>

    </ol>
</template>

<script>
    import {mapGetters} from "vuex";
    import {BIconHouseFill} from "bootstrap-vue";

    function load() {
        if (this.config !== undefined) {
            this.breadcrumbsURL = this.config["rootURL"] + this.$route.path + "/@breadcrumbs";
        }
    }


    //Component, der die sogenannten Breadcrumbs realisiert
    // @group Navigation
    export default {
        name: "Breadcrumbs",
        components: {
            BIconHouseFill
        },
        data() {
            return {
                //Das Arrays aus Breadcrumbs
                breadcrumbs: [],
                //    Die URL zu den Breadcrumbs, entwickelt aus der Route
                breadcrumbsURL: ""
            }
        },
        computed: {
            ...mapGetters(["rootData", "config"])
        },
        methods: {},
        mounted() {
            load.call(this);
        },
        watch: {
            breadcrumbsURL: function () {
                this.http.get(this.breadcrumbsURL).then(res => {
                    this.breadcrumbs = res.data.items;
                });

            },
            "$route.path": function () {
                load.call(this);
            },
            config: function () {
                load.call(this);
            }
        }
    }
</script>

<style scoped>

</style>
