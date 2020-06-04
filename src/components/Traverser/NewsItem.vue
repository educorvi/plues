<template>
    <section id="news">
        <h2>{{context.title}}</h2>
        <h6>{{context.description}}</h6>
        <span v-html="context.text.data"/>
        <EditedLine :context="context"/>
    </section>
</template>

<script>
    import basecomponent from "../../traverser/basecomponent";
    import EditedLine from "../Helper/EditedLine";

    // @group TraverserViews
    //Component um Plone NewsItems darzustellen
    export default {
        components: {EditedLine},
        mixins: [basecomponent],
        name: "NewsItem"
    }
</script>

<style scoped>

</style>
