<template>
    <b-navbar class="mb-2" id="bar" toggleable="true" type="light" v-if="rootData!==null">
        <b-navbar-brand @click="traverse(rootData)">
            <div class="navbar-brand">
                <img alt="Logo" id="logo" src="../../assets/logo.png">
                <!--                <h5 class="ml-2" style="display: inline;"></h5>-->
            </div>
        </b-navbar-brand>

        <b-nav-form>
            <span class="mr-3">
                <b-button
                        v-b-modal.loginModal
                        v-if="token === null">Login</b-button>
                <b-button @click="logout" v-else>Logout</b-button>
            </span>

            <b-navbar-toggle target="collapse"/>
        </b-nav-form>


        <b-collapse class="mt-n2" id="collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <span :key="index" v-for="(item, index) in navigation">

                    <span v-if="item.title!=='Home'">
                        <b-nav-item @click="traverse(item)" class="text-center" v-if="item.items===''">
                            {{item.title}}
                        </b-nav-item>
                         <b-nav-item-dropdown :text="item.title" class="text-center" right v-else>
                            <b-dropdown-item @click="traverse(item)"
                                             class="border-bottom border-light">
                                <b>Alle Elemente in {{item.title}}</b>
                            </b-dropdown-item>
                             <b-dropdown-item :key="lItem.title" @click="traverse(lItem)"
                                              v-for="lItem in item.items">
                                <p class="mb-0"> {{lItem.title}}</p>
                        </b-dropdown-item>
                        </b-nav-item-dropdown>
                    </span>
                </span>


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

            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
    /* eslint-disable no-console */
    /* eslint-disable no-unused-vars */
    import {mapGetters, mapMutations} from 'vuex';
    import axios from 'axios';
    // @vuese
    // Navigation Bar für die App, deren NavItems sich dynamisch an Plone anpassen
    // @group Navigation
    export default {
        name: "Topbar",
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
            ...mapGetters(["rootData", "config", "navigation", "token"])
        },
        methods: {
            login(evt) {
                evt.preventDefault();
                axios.post(this.config.rootURL + "@login", {
                    login: this.form.user,
                    password: this.form.pass
                }, {
                    headers: {
                        Accept: "application/json"
                    }
                }).then(res => {
                    this.$bvModal.hide('loginModal');
                    this.validationState = null;
                    this.$store.commit('setAuthToken', res.data.token);
                    console.log("Erfolg");
                    location.reload();
                }).catch(res => {
                    this.validationState = false;
                    console.log("Fehler");
                });
            },
            logout() {
                this.$store.commit('setAuthToken', null);
                location.reload();
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "../../../public/custom.scss";


    #logo {
        height: 40px;
    }

    #bar {
        position: sticky;
        /* fixing the position takes it out of html flow - knows
                          nothing about where to locate itself except by browser
                          coordinates */
        left: 0; /* top left corner should start at leftmost spot */
        top: 0; /* top left corner should start at topmost spot */
        width: 100%; /* take up the full browser width */
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
