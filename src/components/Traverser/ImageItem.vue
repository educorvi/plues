<template>
    <div>
        <h1>{{context.title}}</h1>
        <b-row>
            <b-col v-if="context.description">
                <p>{{context.description}}</p>
            </b-col>
            <b-col>
                <b-img :alt="'Bild '+context.title" :src="imageBase64" fluid v-if="imageBase64"/>
                <custom-spinner v-else/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    import basecomponent from "@/traverser/basecomponent";
    import CustomSpinner from "@/components/Helper/CustomSpinner";

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

        created() {
            this.loadImage();
        }
    }
</script>

<style scoped>

</style>
