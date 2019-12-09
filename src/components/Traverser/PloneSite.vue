<template>
     <section id="plone-site">

  </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';

    export default {
        mixins: [basecomponent],
        name: "PloneSite",
        created() {
            this.traverse(this.context.items[0]);
        }
    }
</script>

<style scoped>

</style>