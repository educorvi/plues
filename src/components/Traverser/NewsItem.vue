<template>
    <section id="news">
        <Breadcrumbs :breadcrumbs-u-r-l="context['@components']['breadcrumbs']['@id']"/>
        <h2>{{context.title}}</h2>
        <h6>{{context.description}}</h6>
        <span v-html="context.text.data"/>
    </section>
</template>

<script>
    import {basecomponent} from 'plone-vue';
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";

    // @group TraverserViews
    //Component um Plone NewsItems darzustellen
    export default {
        components: {Breadcrumbs},
        mixins: [basecomponent],
        name: "NewsItem"
    }
</script>

<style scoped>

</style>