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
    export default {
        name: "enhanced_folderlist",
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
