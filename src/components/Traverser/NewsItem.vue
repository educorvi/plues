<template>
    <section id="news">
        <h2 class="title">{{context.title}}</h2>
        <h6 class="description">{{context.description}}</h6>
        <span v-html="context.text.data"></span>
    </section>
</template>

<script>
    import {basecomponent} from 'plone-vue';

    export default {
        mixins: [basecomponent],
        name: "NewsItem"
    }
</script>

<style scoped>

</style>