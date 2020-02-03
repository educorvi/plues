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
    import EditedLine from "@/components/Helper/EditedLine";

    export default {
        name: "enhanced_folderlist",
        components: {EditedLine},
        props: {
            items: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
