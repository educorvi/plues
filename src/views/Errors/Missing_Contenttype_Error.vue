<template>
    <div style="text-align: center">
        <h1>Fehler</h1>
        <router-link to="/">Zurück zur Startseite</router-link>
    </div>
</template>

<script>
    export default {
        name: "Error",
        created() {
            this.$root.$bvToast.toast('Keine Ansicht für den Typ "' + this.$route.params["type"] + '" gefunden', {
                title: 'Fehler',
                autoHideDelay: 4000,
                variant: 'danger'
            });
            this.$router.go(-2);
        }
    }
</script>

<style scoped>

</style>
