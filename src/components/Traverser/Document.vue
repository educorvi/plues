<template>
    <section id="plone-site">
        <h1>{{context.title}}</h1>
        <EditedLine :context="context" nofloat/>
        <span v-html="context.text.data"/>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import basecomponent from "../../traverser/basecomponent";
    import EditedLine from "../Helper/EditedLine";
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
