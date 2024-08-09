import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import Vueform from "@vueform/vueform";
import "vue-router";
import vueformConfig from "./../vueform.config";

const app = createApp(App);
app.use(router);
app.use(Vueform, vueformConfig);
app.mount("#app");
