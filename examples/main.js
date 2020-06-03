import Vue from "vue";
import App from "./App.vue";
import PeacockUI from "../packages/index.js";

Vue.config.productionTip = false;

Vue.use(PeacockUI);

new Vue({
  render: h => h(App)
}).$mount("#app");
