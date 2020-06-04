<template>
    <section id="news">
        <h2>{{context.title}}</h2>
        <h6>{{context.description}}</h6>
        <EditedLine :context="context" nofloat/>

        <b-jumbotron>
            <template v-slot:header>Default View</template>

            <template v-slot:lead>
                Für den Contenttype "{{context["@type"]}}" wurde noch keine Ansicht erstellt, deshalb wird diese Standardansicht angezeigt.
            </template>
        </b-jumbotron>
    </section>
</template>

<script>
    import basecomponent from "../../traverser/basecomponent";
    import EditedLine from "../Helper/EditedLine";

    // @group TraverserViews
    //Falls für einen Type keine View gefunden wird, kann diese generalisierte View verwendet werden
    export default {
        components: {EditedLine},
        mixins: [basecomponent],
        name: "defaultView"
    }
</script>

<style scoped>

</style>
