<template>
    <section id="event">
        <div class="w-100 mb-4" style="text-align: center">
            <h2>{{context.title}}</h2>
            <h6>{{context.description}}</h6>
        </div>

        <div class="container-fluid mb-2">
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <span v-html="context.text.data"/>
                </div>
                <div class="col-lg-6 col-md-12">
                    <b-card no-body>
                        <Subcard title="Wann" visible>
                            <TimeDurationDisplay :end="new Date(context.end)" :open-end="context.open_end"
                                                 :start="new Date(context.start)" :whole-day="context.whole_day"/>
                        </Subcard>
                        <Subcard responsiv title="Wo" v-if="context.location != null" visible>
                            <iframe :src="'https://www.google.com/maps/embed/v1/place?q='+context.location+'w&key='+config.mapsApiKey+'&zoom=12'"
                                    class="mb-n2"
                                    height="100%"
                                    style="border: none"
                                    width="100%"
                            />
                        </Subcard>
                        <Subcard title="Teilnehmer" v-if="context.attendees.length!==0">
                            <ul>
                                <li :key="index" v-for="(attendee, index) in context.attendees">{{attendee}}</li>
                            </ul>
                        </Subcard>
                        <Subcard title="Kontaktperson"
                                 v-if="context.contact_name!=null||context.contact_email!=null||context.contact_email!=null">
                            <h5>{{context.contact_name}}</h5>
                            <p class="mb-1">{{context.contact_email}}</p>
                            <p>{{context.contact_phone}}</p>
                        </Subcard>
                    </b-card>
                </div>
            </div>
            <EditedLine :context="context"/>
        </div>


    </section>
</template>

<script>
    import {basecomponent} from 'plone-vue';
    import TimeDurationDisplay from "@/components/Helper/EventItem/TimeDurationDisplay";
    import Subcard from "@/components/Helper/EventItem/Subcard";
    import EditedLine from "@/components/Helper/EditedLine";
    import {mapGetters} from 'vuex';

    // @group TraverserViews
    //Component um Plone EventItems darzustellen
    export default {
        components: {EditedLine, Subcard, TimeDurationDisplay},
        mixins: [basecomponent],
        name: "EventItem",
        computed: {
            ...mapGetters(["config"])
        }
    }
</script>

