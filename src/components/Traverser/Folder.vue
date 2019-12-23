<template>
    <section id="folder">
        <div v-if="stay">
            <Breadcrumbs :breadcrumbs-u-r-l="context['@components']['breadcrumbs']['@id']"/>
            <h1>Folder: {{context.title}}</h1>
            <ul>
                <li :key="item['@id']" v-for="item in context.items">
                    <traverser-link :class="item.title" :item="item">{{item.title}}</traverser-link>
                </li>
            </ul>
        </div>
        <CustomSpinner/>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    // export default {
    //     mixins: [basecomponent],
    //     name: "folder",
    //     created() {
    //         console.log("Hello World");
    //     }
    // }


    import {basecomponent} from 'plone-vue';
    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";
    import CustomSpinner from "@/components/Helper/CustomSpinner";

    // @group TraverserViews
    //Component um Plone Folders darzustellen
    export default {
        components: {CustomSpinner, Breadcrumbs},
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

