import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

//import './assets/main.css'
const pinia = createPinia();

const app = createApp(App).component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(pinia);

app.mount("#app");
