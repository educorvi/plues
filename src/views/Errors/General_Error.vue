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
            this.$root.$bvToast.toast('Darauf konnte nicht zugegriffen werden. Entweder exisiert die Datei nicht, oder du hast kein Zugriffsrecht darauf. (Bist du angemeldet?)', {
                title: 'Fehler',
                autoHideDelay: 7000,
                variant: 'danger'
            });
            this.$router.go(-2);
        }
    }
</script>

<style scoped>

</style>
