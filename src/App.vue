<!--suppress CssUnusedSymbol -->
<template>
    <div id="app">
        <div >
            <Topbar/>

            <!--    <div id="nav">-->
            <!--      <router-link to="/">Home</router-link> |-->
            <!--      <router-link to="/about">About</router-link>-->
            <!--    </div>-->
            <!--    <router-view/>-->
            <traverser-view class="container-fluid"/>
        </div>
    </div>
</template>

<style>
    .ccard {
        cursor: pointer;
        transition: background-color .3s cubic-bezier(.4, 0, .2, 1), box-shadow .4s cubic-bezier(.25, .8, .25, 1);
        will-change: background-color, box-shadow
    }

    .ccard:hover {
        z-index: 2;
        box-shadow: 0 4px 4px -2px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12)
    }
</style>
<script>
    import Topbar from "@/components/Navigation/Topbar";

    export default {
        components: {Topbar}
    }
</script>