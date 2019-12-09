<template>
    <section id="folder">
        <h1>{{context.title}}</h1>
        <ul>
            <li :key="item['@id']" v-for="item in context.items">
                <traverser-link :class="item.title" :item="item">{{item.title}}</traverser-link>
            </li>
        </ul>
    </section>
</template>

<script>
    /* eslint-disable no-console */

    // export default {
    //     mixins: [basecomponent],
    //     name: "folder",
    //     created() {
    //         console.log("Hello World");
    //     }
    // }


    import {basecomponent} from 'plone-vue';

    export default {
        mixins: [basecomponent],
        name: "folder",
    }
</script>

<style scoped>

</style>