import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { TailwindPagination } from "laravel-vue-pagination";
import auth from "./auth/auth.js";

import App from "./App.vue";
import router from "./router";

import "@fortawesome/fontawesome-free/css/all.css";
import "./assets/main.css";

const pinia = createPinia();
pinia.use(piniaPersist);
const app = createApp(App);
app.config.globalProperties.$auth = auth;
app.use(pinia);
app.use(router);
app.component("fa", FontAwesomeIcon);
app.mount("#app");
