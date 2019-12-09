<template>
    <section id="event">
    <h2 class="title">{{context.title}}</h2>
    <h6 class="description">{{context.description}}</h6>
        <p class="mb-1">Startet am {{new Date(context.start).toLocaleString()}}</p>
        <p>Endet am {{new Date(context.end).toLocaleString()}}</p>
  </section>
</template>

<script>
    import {basecomponent} from 'plone-vue';
    export default {
        mixins: [basecomponent],
        name: "EventItem"
    }
</script>

<style scoped>

</style>