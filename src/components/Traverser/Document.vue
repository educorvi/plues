<template>
    <section id="plone-site">
        <Breadcrumbs :breadcrumbs-u-r-l="context['@components']['breadcrumbs']['@id']"/>
        <h1>{{context.title}}</h1>
        <span v-html="context.text.data"></span>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";

    export default {
        components: {Breadcrumbs},
        mixins: [basecomponent],
        name: "document",
    }
</script>

<style scoped>

</style>