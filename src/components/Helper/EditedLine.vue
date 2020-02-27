<template>
    <p :class="getClass">Zuletzt verändert am {{new Date(context.modified).toLocaleString()}}<span
            v-if="lineString!=='' && lineString !== 'null'">, erstellt von {{lineString}}</span></p>
</template>
<script>
    import {mapGetters} from "vuex";
    //Dieser Component gibt Information darüber, wann das Dokument zum letzten mal von wem bearbeitet wurde
    //@group Helper
    export default {
        name: 'EditedLine',
        props: {
            //Context des Objekts, das die EditedLine beinhaltet
            context: {
                type: Object,
                required: true
            },
            //Gibt an, dass die Line nicht in der unteren rechten Ecke floaten soll
            nofloat: {
                type: Boolean,
                required: false
            }
        },
        data() {
            return {
                lineString: ''
            }
        },
        computed: {
            //CSS Class für den Text
            getClass() {
                if (this.nofloat) {
                    return "text-muted"
                } else {
                    return "text-muted float-right mt-4";
                }
            },
            ...mapGetters(["token", "config"])
        },
        mounted() {
            if (this.token !== null) {
                for (let i = 0; i < this.context.creators.length; i++) {
                    let creator = this.context.creators[i];
                    this.http.get(this.config.rootURL + "@users/" + creator).then(res => {
                        this.lineString += res.data.fullname;
                        if (!(i === this.context.creators.length - 1)) {
                            this.lineString += ", "
                        }
                    })
                }
            }
        }
    }
</script>
