<template>
    <section id="plone-site">
        <Breadcrumbs :breadcrumbs-u-r-l="context['@components']['breadcrumbs']['@id']"/>
        <h1>{{context.title}}</h1>
        <EditedLine :context="context" nofloat/>
        <span v-html="context.text.data"/>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    import EditedLine from "@/components/Helper/EditedLine";
    // @group TraverserViews
    //Component um Plone Documents darzustellen
    export default {
        components: {EditedLine, Breadcrumbs},
        mixins: [basecomponent],
        name: "Document",
    }
</script>

<style scoped>

</style>