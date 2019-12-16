<template>
    <section id="collection">
        <Breadcrumbs :breadcrumbs-u-r-l="context['@components']['breadcrumbs']['@id']"/>
        <h1>{{context.title}}</h1>
        <ul>
            <li v-for="item in context.items" :key="item['@id']">
                <traverser-link :class="item.title" :item="item">{{item.title}}</traverser-link>
            </li>
        </ul>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";

    // @group TraverserViews
    // Component um Plone Collections darzustellen
    export default {
        components: {Breadcrumbs},
        mixins: [basecomponent],
        name: "Collection",
    }
</script>

<style scoped>

</style>