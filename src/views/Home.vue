<template>
    <div>
        <Breadcrumbs v-if="!$route.query.nonav"/>
        <traverser-view/>
    </div>
</template>

<script>


    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";

    export default {
        /* eslint-disable no-console */
        name: 'home',
        components: {Breadcrumbs},

        mounted() {
            this.traverse({"@id": this.$route.path + "?rel"});
        }
    }
</script>
