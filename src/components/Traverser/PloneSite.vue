<template>
     <section id="plone-site">

  </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';

    // @group TraverserViews
    //Component um Plone PloneSites darzustellen.
    //Nicht weiter interessant, da bei Aufruf der Site gleich zum ersten Child-Item weiter traversiert wird
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