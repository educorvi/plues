import {createTraverserLink} from "@/traverser/normalizer";
import {mapGetters} from "vuex";

const basecomponent = {
  props: ['context'],
  created() {
    //Wenn die Seite geladen wird, überprüft sie, ob die aktuelle Seite die ist, die in der URL steht, ansonsten wird zu home und zur Seite navigiert, um das Laden der richtigen Seite zu erzwingen
    const link = createTraverserLink(this.context, this.config);
    if (link !== this.$route.fullPath) {
      const to = this.$route.fullPath;
      this.$router.replace("/");
      this.$router.replace(to);
    }
  },
  computed: {
    ...mapGetters(["config"])
  }
};

export default basecomponent;
