<template>
    <div>
        <b-card-header @click="lVisibel=!lVisibel">
            {{title}}
        </b-card-header>
        <b-collapse :id="'collapse_'+title" :visible="lVisibel">
            <b-card-body class="mb-0 pb-0" v-if="!responsiv">
                <!--            Default Slot -->
                <slot/>
            </b-card-body>
            <slot v-else/>
        </b-collapse>
    </div>
</template>

<script>
    // Helper Component, um Cardstacks anzeigen zu können, wobei jeder Teil des Stacks eine Subcard ist
    // @group Helper/EventItem
    export default {
        name: "Subcard",
        props: {
            // In den Card Header zu schreibender Titel
            title: {
                type: String,
                default: ""
            },
            //Wenn in dem Slot ein Objekt übergeben wird, dass ohne Card-Body eingefügt werden soll, dann true übergeben
            responsiv: {
                type: Boolean,
                default: false
            },
            //Bestimmt, ob der Collapse Teil standardmäßig offen oder geschlossen sein soll
            visible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                //lokale, veränderbare Kopie des visible Attributs
                lVisibel: true
            }
        },
        created() {
            this.lVisibel = this.visible;
        }
    }
</script>

<style scoped>

</style>