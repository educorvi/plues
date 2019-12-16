<template>
    <span v-html="getDuration()"/>
</template>

<script>
    // Zeigt eine Zeitspanne formatiert an (nur Uhrzeiten, wenn beide an selbem Tag, sonst auch Daten)
    // @group Helper/EventItem
    export default {
        name: "TimeDurationDisplay",
        props: {
            //Date Objekt, das den Start repräsentiert
            start: {
                type: Date,
                required: true
            },
            //Date Objekt, das das Ende repräsentiert
            end: {
                type: Date,
                required: true
            },
            //Gibt an, ob das Event ein offenes Ende hat
            openEnd: {
                type: Boolean,
                default: false
            },
            //Gibt an, ob das Event ganztägig ist
            wholeDay: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            //@vuese
            // Hauptmethode, die die formatierte Zeitspanne zuückgibt
            getDuration() {
                const start = this.start;
                const end = this.end;

                if (start.getDate() === end.getDate() && start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
                    if (this.wholeDay && this.openEnd) {
                        return this.getSingleDate(start) + " (Offenes Ende)";
                    }
                    if (this.wholeDay) {
                        return this.getSingleDate(start);
                    }
                    return "<p>" + this.getTimeDuration(start, end) + "</br>" + this.getSingleDate(start) + "</p>";
                } else {
                    if (this.wholeDay && this.openEnd) {
                        return "<p>" + this.getSingleDate(start) + " - offenes Ende"
                    }
                    if (this.wholeDay) {
                        return "<p>" + this.getSingleDate(start) + " - " + this.getSingleDate(end);
                    }
                    if (this.openEnd) {
                        return "<p>" + this.getSingleDate(start) + ", " + this.getSingleTime(start) + " - offenes Ende"
                    }
                    return "<p>" + this.getSingleDate(start) + ", " + this.getSingleTime(start) + " - " + this.getSingleDate(end) + ", " + this.getSingleTime(end);
                }
            },

            //@vuese
            // Gibt das zu einem Date-Objekt gehörende Datum (ohne Uhrzeit) formatiert zurück
            //@arg Date Objekt, das das auszugebende Datum repräsentiert
            getSingleDate(date) {
                return this.formatNumber(date.getDate()) + "." + this.formatNumber(date.getMonth() + 1) + "." + date.getFullYear();
            },

            //@vuese
            // Gibt die zu einem Date-Objekt gehörende Uhrzeit formatiert zurück
            //@arg Date Objekt, das die auszugebende Uhrzeit repräsentiert
            getSingleTime(time) {
                return time.getHours() + ":" + this.formatNumber(time.getMinutes());
            },

            //@vuese
            // Gibt die beiden Uhrzeiten des Start und Endobjekts zurück (hh:mm - hh:mm)
            //@arg Date Objekte, das die auszugebenden Uhrzeiten repräsentieren (1. Parameter Start, 2. Ende)
            getTimeDuration(start, end) {
                if (this.openEnd) {
                    return this.getSingleTime(start) + " - offenes Ende"
                }
                return this.getSingleTime(start) + " - " + this.getSingleTime(end);
            },

            //@vuese
            // Formatiert eine Nummer <100 in ein sicher zweistelliges Format
            //@arg zu formatierende Nummer
            formatNumber(number) {
                if (number < 10) {
                    return "0" + number;
                } else {
                    return number;
                }
            }
        },
    }
</script>

<style scoped>

</style>