import { createApp } from "vue";
import { createPinia } from "pinia";

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import App from "./App.vue";
import router from "./router";

loadFonts();

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
