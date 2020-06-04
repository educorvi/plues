<template>
    <div>
        <h1>{{context.title}}</h1>
        <b-row>
            <b-col :lg="context.description?6:12" sm="12">
                <b-img :alt="'Bild '+context.title" :src="imageBase64" fluid v-if="imageBase64"/>
                <custom-spinner v-else/>
            </b-col>
            <b-col v-if="context.description" lg="6" sm="12">
                <p>{{context.description}}</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import basecomponent from "../../traverser/basecomponent";
    import CustomSpinner from "../Helper/CustomSpinner";

    export default {
        name: "ImageItem",
        components: {CustomSpinner},
        mixins: [basecomponent],
        data() {
            return {
                imageBase64: null
            }
        },
        methods: {
            loadImage() {
                this.http.get(
                    this.context.image.download,
                    {responseType: 'arraybuffer'},
                )
                    .then(response => {
                        const base64 = btoa(
                            new Uint8Array(response.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                '',
                            ),
                        );
                        this.imageBase64 = "data:;base64," + base64
                    });

            },


        },

        mounted() {
            this.loadImage();
        }
    }
</script>

<style scoped>

</style>
