<template>
    <section id="plone-site">
        <h1>{{context.title}}</h1>
        <EditedLine :context="context" nofloat/>
        <span v-html="context.text.data"/>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';
    import EditedLine from "@/components/Helper/EditedLine";
    // @group TraverserViews
    //Component um Plone Documents darzustellen
    export default {
        components: {EditedLine},
        mixins: [basecomponent],
        name: "Document",
    }
</script>

<style scoped>

</style>
