<template>
    <section id="folder">
        <div>
            <h1>{{context.title}}</h1>
            <p>{{context.description}}</p>
            <tabular_view :items="context.items.filter((item) => !item.excludeFromDisplay)"
                          v-if="context.layout==='tabular_view'"/>
            <listing_view :items="context.items.filter((item) => !item.excludeFromDisplay)" v-else/>
        </div>
    </section>
</template>

<script>
    import basecomponent from "@/traverser/basecomponent";
    import tabular_view from "@/components/Helper/Folder/tabular_view";
    import listing_view from "@/components/Helper/Folder/listing_view";

    // @group TraverserViews
    //Component um Plone Folders darzustellen
    export default {
        components: {listing_view, tabular_view},
        mixins: [basecomponent],
        name: "Folder",
        data() {
            return {}
        }
    }
</script>

