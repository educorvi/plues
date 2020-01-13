<template>
    <b-card @click="traverse(item)" class="ccard mb-3 lccard" no-body>
        <b-card-header>
            {{item.title}}
            <template v-if="item['@type'] === 'Event'">, <b>{{new Date(item.start).toLocaleDateString()}}</b></template>
        </b-card-header>
        <b-card-body>
            <span v-if="item.description!==''">{{item.description}}</span>
            <span class="text-muted" v-else>(Keine Beschreibung)</span>
        </b-card-body>
        <b-card-footer>
            <p class="mb-0 text-muted">Zuletzt bearbeitet am {{new Date(item.modified).toLocaleString()}}</p>
        </b-card-footer>
    </b-card>
</template>

<script>
    //Karte zum Anzeigen von Elementen einer Collection
    //@group Helper/Collection
    export default {
        name: "CollectionCard",
        props: {
            //Item das angezeigt werden soll
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>
    .lccard {
        min-width: 15rem;
    }

</style>