<template>
    <section id="plone-site">
        <Breadcrumbs :breadcrumbs-u-r-l="context['@components']['breadcrumbs']['@id']"/>
        <h1>{{context.title}}</h1>
        <span v-html="context.text.data"/>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    // @group TraverserViews
    //Component um Plone Documents darzustellen
    export default {
        components: {Breadcrumbs},
        mixins: [basecomponent],
        name: "Document",
    }
</script>

<style scoped>

</style>