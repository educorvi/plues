<template>
     <section id="plone-site">
    <h1>{{context.title}}</h1>
    <ul>
      <li v-for="item in context.items" :key="item['@id']"><traverser-link :class="item.title" :item="item">{{item.title}}</traverser-link></li>
    </ul>
  </section>
</template>

<script>
    /* eslint-disable no-console */

    import {basecomponent} from 'plone-vue';

    export default {
        mixins: [basecomponent],
        name: "PloneSite",
    }
</script>

<style scoped>

</style>