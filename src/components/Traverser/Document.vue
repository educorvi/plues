<template>
    <section id="plone-site">
        <h1>{{context.title}}</h1>
        <span v-html="context.text.data"></span>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';

    export default {
        mixins: [basecomponent],
        name: "document",
    }
</script>

<style scoped>

</style>