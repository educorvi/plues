<template>
    <div class="container-fluid" id="app" style="margin-top: 60px">
        <div >
            <Topbar></Topbar>

            <!--    <div id="nav">-->
            <!--      <router-link to="/">Home</router-link> |-->
            <!--      <router-link to="/about">About</router-link>-->
            <!--    </div>-->
            <!--    <router-view/>-->
            <traverser-view></traverser-view>
        </div>
    </div>
</template>

<style>

</style>
<script>
    import Topbar from "@/components/Topbar";

    export default {
        components: {Topbar}
    }
</script>