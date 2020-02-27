<template>
    <b-navbar class="mb-2" id="bar" toggleable="true" type="light" v-if="rootData!==null">
        <b-navbar-brand @click="traverse(rootData)">
            <div class="navbar-brand">
                <img alt="Logo" id="logo" src="../../assets/logo.png">
            </div>
        </b-navbar-brand>

        <b-nav-form>
            <span class="mr-3">
                <b-button
                        v-b-modal.loginModal
                        v-if="token === null">Login</b-button>
                <b-button @click="logout" v-else>Logout</b-button>
            </span>

<!--            Button zum Öffnen der Sidebar-->
            <span>
                <h2 @click="$emit('sidebar')" class="m-0"><b-icon-list/></h2>
            </span>

        </b-nav-form>


        <!--        Login Modal-->
        <b-modal hide-footer id="loginModal" title="Login">
            <b-form @submit="login">
                <b-form-invalid-feedback :state="validationState">
                    <h5>Benutzername/Passwort falsch!</h5>
                </b-form-invalid-feedback>
                <b-form-group
                        id="input-group-1"
                        label="Benutzername:"
                        label-for="input-1"
                >
                    <b-form-input
                            :state="validationState"
                            id="input-1"
                            placeholder="Benutzernamen eingeben"
                            required
                            v-model="form.user"
                    />
                </b-form-group>

                <b-form-group id="input-group-2" label="Ihr Passwort" label-for="input-2">
                    <b-form-input
                            :state="validationState"
                            id="input-2"
                            placeholder="Passwort eingeben"
                            required
                            type="password"
                            v-model="form.pass"
                    />
                </b-form-group>
                <b-button @click="$bvModal.hide('loginModal')" class="left" variant="danger">Abbrechen
                </b-button>
                <b-button class="float-right" type="submit" variant="primary">Einloggen</b-button>
            </b-form>
        </b-modal>

    </b-navbar>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {BIconList} from "bootstrap-vue";

    // @vuese
    // Navigation Bar für die App, deren NavItems sich dynamisch an Plone anpassen
    // @group Navigation
    export default {
        name: "Topbar",
        components: {BIconList},
        data() {
            return {
                form: {
                    user: '',
                    pass: ''
                },
                validationState: null,
                wait: false
            }
        },
        computed: {
            ...mapGetters(["rootData", "config", "token"])
        },
        methods: {

            //Aktionen, die beim Login ausgeführt werden
            login(evt) {
                evt.preventDefault();
                //Versuch des Logins mit den angebenen Daten
                this.http.post(this.config.rootURL + "@login", {
                    login: this.form.user,
                    password: this.form.pass
                }).then(res => {
                    //War der Login erfolgreich, wird das Modal verborgen und der Token gespeichert
                    this.$bvModal.hide('loginModal');
                    this.validationState = null;
                    this.$store.commit('setAuthToken', res.data.token);
                    location.reload();
                }).catch(() => {
                    //Wenn die angegebenen Daten falsch waren, wird das an den Nutzer ausgegeben
                    this.validationState = false;
                });
            },
            //Beim Abmelden wird der Token zurückgesetzt
            logout() {
                this.http.post(this.config.rootURL + "@logout");
                this.$store.commit('setAuthToken', null);
                location.reload();
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../public/custom.scss";


    #logo {
        max-height: 5vh;
    }

    #bar {
        position: sticky;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 0; /* top left corner should start at topmost spot */
        width: 100%; /* take up the full browser width */
        height: 10vh;
        z-index: 200; /* high z index so other content scrolls underneath */
        background: $navbar-custom-color;
    }

    #bar > * {
        color: white !important;
    }

    .cdropdown {
        max-width: 80%;

    }

</style>
