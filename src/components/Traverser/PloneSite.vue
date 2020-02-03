<template>
    <section id="plone-site">
        <div class="ml-lg-4 mr-lg-4">
            <h2>{{context.title}}</h2>
            <div class="container-fluid">
                <b-card-group deck>
                    <collection-card :item="item" :key="'cc_'+index" v-for="(item, index) in context.items"/>
                </b-card-group>
            </div>
        </div>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';
    import CollectionCard from "@/components/Helper/Collection/CollectionCard";

    // @group TraverserViews
    // Component um Plone Collections darzustellen
    export default {
        components: {CollectionCard},
        mixins: [basecomponent],
        name: "PloneSite",
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
