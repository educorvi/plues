<template>
    <ol class="breadcrumb" style="position: sticky" v-if="breadcrumbs.length>0 || breadcrumbs===null">
        <li class="breadcrumb-item" @click="traverse(rootData)"><a href="#">Home</a></li>
        <li v-for="(item) in breadcrumbs.slice(0, breadcrumbs.length-1)" :key="item['@id']" class="breadcrumb-item">
            <traverser-link
                    :item="item">{{item.title}}
            </traverser-link>
        </li>
        <li class="breadcrumb-item active">{{breadcrumbs[breadcrumbs.length-1].title}}</li>

    </ol>
</template>

<script>
    import axios from "axios";
    import {mapGetters} from "vuex";

    function load() {
        if (this.config !== undefined) {
            this.breadcrumbsURL = this.config["rootURL"] + this.$route.path + "/@breadcrumbs";
        }
    }


    //Component, der die sogenannten Breadcrumbs realisiert
    // @group Navigation
    export default {
        name: "Breadcrumbs",
        props: {
            //Die RestApiUrl zu den @breadcrumbs (z. B. https://www.beispielwebsite.com/ploneroot/@breadcrumbs)
            // breadcrumbsURL: {
            //     type: String,
            //     required: true
            // }
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
        watch: {
            breadcrumbsURL: function () {
                axios.get(this.breadcrumbsURL, {
                    headers: {
                        Accept: "application/json"
                    }
                }).then(res => {
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
