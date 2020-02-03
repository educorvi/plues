<template>
    <div>
        <Breadcrumbs/>
        <traverser-view/>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars */


    import Breadcrumbs from "@/components/Navigation/Breadcrumbs";

    export default {
        /* eslint-disable no-console */
        name: 'home',
        components: {Breadcrumbs},

        mounted() {
            this.traverse({"@id": this.$route.path + "?rel"})
        }
    }
</script>
