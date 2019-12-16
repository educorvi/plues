<template>
    <p :class="getClass">Zuletzt verändert am {{new Date(context.modified).toLocaleString()}}<span
            v-if="getCreatorsString!==''">, erstellt von {{getCreatorsString}}</span></p>
</template>
<script>
    //@Group Helper
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
        computed: {
            //@vuese
            //Gibt einen String, der durch Komma getrennt die Ersteller des Objekts enthält
            getCreatorsString() {
                let str = "";

                function add(value, index, array) {
                    str += value;
                    if (!(index === array.length - 1)) {
                        str += ", "
                    }
                }

                this.context.creators.forEach(add);
                return str;
            },

            //CSS Class für den Text
            getClass() {
                if (this.nofloat) {
                    return "text-muted"
                } else {
                    return "text-muted float-right mt-4";
                }
            }
        },
    }
</script>
