<template>
    <section id="folder">
        <div v-if="stay">
            <h1>{{context.title}}</h1>
            <p>{{context.description}}</p>
            <enhanced_folderlist :items="context.items"/>
        </div>
        <CustomSpinner v-else/>
        <!--        <Batcher :item="context" v-if="context.batching!==null"/>-->
    </section>
</template>

<script>
    import {basecomponent} from 'plone-vue';
    import CustomSpinner from "@/components/Helper/CustomSpinner";
    import enhanced_folderlist from "@/components/Helper/Folder/enhanced_folderlist";

    // @group TraverserViews
    //Component um Plone Folders darzustellen
    export default {
        components: {enhanced_folderlist, CustomSpinner},
        mixins: [basecomponent],
        name: "Folder",
        data() {
            return {
                //Wenn nicht auf Collection weitergeleitet wird, wird es auf true gesetzt
                stay: false
            }
        },
        created() {
            if (this.context.items.length > 0 && this.context.items[0]["@type"] === "Collection") {
                this.traverse(this.context.items[0]);
            } else {
                this.stay = true;
            }
        }
    }
</script>

