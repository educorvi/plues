<template>
    <div>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">Titel</th>
                <th scope="col" v-if="token!==null">Ersteller</th>
                <th scope="col">Inhaltstyp</th>
                <th scope="col">Zuletzt bearbeitet</th>
            </tr>
            </thead>
            <tbody>
            <tr :key="item['@id']" v-for="item in items">
                <td>
                    <traverser-link :class="item.title" :item="item">
                        {{item.title}}
                    </traverser-link>
                </td>
                <td v-if="token!==null">
                    {{getNames(item.creators)}}
                </td>
                <td>
                    {{item["@type"]}}
                </td>
                <td>
                    {{new Date(item.modified).toLocaleString()}}
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    import {mapGetters} from "vuex"

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
        computed: {
            ...mapGetters(["token"])
        },
        methods: {
            //Ruft die Namen der Autoren ab
            getNames(creators) {
                let str = '';
                for (let i = 0; i < creators.length; i++) {
                    let creator = creators[i];
                    str += creator;
                    if (!(i === creators.length - 1)) {
                        str += ", "
                    }
                }
                return str;
            }
        },
    }
</script>

<style scoped>

</style>
