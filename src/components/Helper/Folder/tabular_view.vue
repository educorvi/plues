<template>
    <div>
        <b-table :fields="fields" :items="items" responsive>
            <template v-slot:cell(title)="data">
                <router-link :to="createTravLink(data.item)">{{data.item.title}}</router-link>
            </template>

            <template v-slot:cell(creators)="data">
                {{getNames(data.item.creators)}}
            </template>

            <template v-slot:cell(modified)="data">
                {{new Date(data.item.modified).toLocaleString()}}
            </template>
        </b-table>

    </div>
</template>

<script>
    import {mapGetters} from "vuex"
    import {createTraverserLink} from "../../../traverser/normalizer";

    // Folder Ansicht, die Plones Tabular View entspricht
    // @group Helper/Folder
    export default {
        name: "enhanced_folderlist",
        props: {
            // Die Items die in diesem Ordner angezeigt werden sollen; entspricht dem Array Items in der RestAPI
            items: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                fields: [
                    {key: 'title', label: 'Titel'},
                    {key: 'creators', label: 'Ersteller'},
                    {key: '@type', label: 'Inhaltstyp'},
                    {key: 'modified', label: 'Zuletzt bearbeitet'}
                ]
            }
        },
        computed: {
            ...mapGetters(["token", "config"])
        },
        methods: {
            //Ruft die Namen der Autoren ab
            getNames(creators) {
                if (creators === undefined) {
                    return '';
                }
                let str = '';
                for (let i = 0; i < creators.length; i++) {
                    let creator = creators[i];
                    str += creator;
                    if (!(i === creators.length - 1)) {
                        str += ", "
                    }
                }
                return str;
            },
            createTravLink(item) {
                return createTraverserLink(item, this.config);
            }
        },
    }
</script>

<style scoped>

</style>
