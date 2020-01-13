<template>
    <div class="d-flex justify-content-center mt-3">
        <b-button-group v-if="item.batching">
            <b-button @click="traverseTo(item.batching.first)" v-if="item.batching['@id']!==item['@id']">Erste
            </b-button>
            <b-button @click="traverseTo(item.batching.prev)" v-if="item.batching.prev" variant="primary">
                Vorhergehende
            </b-button>
            <b-button @click="traverseTo(item.batching.next)" v-if="item.batching.next" variant="primary">Nächste
            </b-button>
            <b-button @click="traverseTo(item.batching.last)" v-if="item.batching.last!==item.batching['@id']">Letzte
            </b-button>
        </b-button-group>
    </div>
</template>

<script>
    /* eslint-disable no-console */
    //Dieser Component ist ein Navigator für Seiten mit Batching
    export default {
        name: "Batcher",
        props: {
            //Item, das gerade angezeigt wird
            item: {
                type: Object,
                required: true
            }
        },
        methods: {
            logTraverse(to) {
                console.log('Traverse to ' + to);
                this.traverse({'@id': to})
            },
            traverseTo(to) {
                this.traverse({'@id': to})
            }
        },
    }
</script>

<style scoped>

</style>