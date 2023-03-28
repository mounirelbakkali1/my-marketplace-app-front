import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/main.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.component("fa", FontAwesomeIcon);
app.mount("#app");
