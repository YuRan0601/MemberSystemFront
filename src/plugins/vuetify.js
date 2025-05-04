import "vuetify/styles";
import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from "vuetify/labs/VDateInput";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import customZhHant from "../assets/js/customZhHant";
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { createVuetify } from "vuetify"

const vuetify = createVuetify({
    components: {
        ...components,
        VDateInput,
    },
    aliases,
    directives,
    icons: {
        defaultSet: "mdi", // This is already the default value - only for display purposes
    },
    sets: {
        mdi,
    },
    locale: {
        locale: "zhHant",
        messages: { zhHant: customZhHant },
    },
});

export default vuetify