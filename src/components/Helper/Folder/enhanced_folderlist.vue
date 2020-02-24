<template>
    <div>
        <hr>
        <span :key="item['@id']" v-for="item in items">
            <traverser-link :class="item.title" :item="item">
                <h3>{{item.title}}</h3>
                <p>{{item.description}}</p>
            </traverser-link>
            <hr>
    </span>
    </div>
</template>

<script>
    // Folder Ansicht, die Plones Enhanced Folderlist entspricht
    // @group Helper/Folder
    export default {
        name: "enhanced_folderlist",
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
