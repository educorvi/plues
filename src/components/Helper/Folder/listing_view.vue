<template>
    <div>
        <hr>
        <span :key="item['@id']" v-for="item in items">
            <traverser-link :class="item.title" :item="item">
                <h4>{{item.title}}</h4>
            </traverser-link>
            <edited-line :context="item" class="mb-0" nofloat></edited-line>
            <p>{{item.description}}</p>
            <hr>
    </span>
    </div>
</template>

<script>
    import EditedLine from "../../Helper/EditedLine";

    // Folder Ansicht, die Plones listing view entspricht
    // @group Helper/Folder
    export default {
        name: "listing_view",
        components: {EditedLine},
        props: {
            // Die Items die in diesem Ordner angezeigt werden sollen; entspricht dem Array Items in der RestAPI
            items: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
