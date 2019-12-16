<template>
    <ol class="breadcrumb" style="position: sticky" v-if="breadcrumbs.length>0">
        <li class="breadcrumb-item" @click="traverse(rootData)"><a href="#">Home</a></li>
        <li v-for="(item) in breadcrumbs.slice(0, breadcrumbs.length-1)" :key="item['@id']" class="breadcrumb-item">
            <traverser-link
                    :item="item">{{item.title}}
            </traverser-link>
        </li>
        <li class="breadcrumb-item active">
            {{breadcrumbs[breadcrumbs.length-1].title}}
        </li>

    </ol>
</template>

<script>
    import axios from "axios";
    import {mapGetters} from "vuex";
    //Component, der die sogenannten Breadcrumbs realisiert
    // @group Navigation
    export default {
        name: "Breadcrumbs",
        props: {
            //Die RestApiUrl zu den @breadcrumbs (z. B. https://www.beispielwebsite.com/ploneroot/@breadcrumbs)
            breadcrumbsURL: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                breadcrumbs: []
            }
        },
        computed: {
            ...mapGetters(["rootData"])
        },
        methods: {},
        mounted() {
            axios.get(this.breadcrumbsURL, {
                headers: {
                    Accept: "application/json"
                }
            }).then(res => {
                this.breadcrumbs = res.data.items;
            });
        }
    }
</script>

<style scoped>

</style>