<template>
    <section id="collection">
        <Breadcrumbs :breadcrumbs-u-r-l="context['@components']['breadcrumbs']['@id']"/>
        <div class="ml-lg-4 mr-lg-4" v-if="data!=null">
            <h2>{{data.title}}</h2>
            <div class="container-fluid">
                <b-card-group deck>
                    <collection-card :item="item" :key="'cc_'+index" v-for="(item, index) in data.items"/>
                </b-card-group>
            </div>
        </div>
        <CustomSpinner v-else/>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    import CollectionCard from "@/components/Helper/Collection/CollectionCard";
    import axios from "axios"
    import CustomSpinner from "@/components/Helper/CustomSpinner";

    // @group TraverserViews
    // Component um Plone Collections darzustellen
    export default {
        components: {CustomSpinner, CollectionCard, Breadcrumbs},
        mixins: [basecomponent],
        name: "Collection",
        data() {
            return {
                //Im Grunde dieselben Daten wie in Context, nur mit zusätlichen Feldern
                data: null
            }
        },
        mounted() {
            axios.get(this.context["@id"] + "/?metadata_fields=modified", {
                headers: {
                    Accept: "application/json"
                }
            }).then(res => this.data = res.data)
        }
    }
</script>

<style scoped>

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -50px;
    }

</style>