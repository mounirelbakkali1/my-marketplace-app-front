import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import auth from "./auth/auth.js";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

Pusher.logToConsole = true;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "056f6eac4a72e3b03f53",
  cluster: "eu",
  forceTLS: true,
});

var channel = window.Echo.channel('my-channel'); // Use 'window.Echo' instead of just 'Echo'
channel.listen('.my-event', function (data) {
  alert(JSON.stringify(data));
});

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
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
