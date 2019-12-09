<template>
    <div id="app">
        <div >
            <Topbar></Topbar>

            <!--    <div id="nav">-->
            <!--      <router-link to="/">Home</router-link> |-->
            <!--      <router-link to="/about">About</router-link>-->
            <!--    </div>-->
            <!--    <router-view/>-->
            <traverser-view class="container-fluid"></traverser-view>
        </div>
    </div>
</template>

<style>

</style>
<script>
    import Topbar from "@/components/Navigation/Topbar";

    export default {
        components: {Topbar}
    }
</script>