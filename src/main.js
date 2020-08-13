import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import Vuelidate from "vuelidate";
import { store } from "./store";
import VueProgressBar from "vue-progressbar";

Vue.use(VueProgressBar, {
	color: "RGB(205, 92, 92)",
	failedColor: "red",
	height: "2px",
});
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
	vuetify,
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
