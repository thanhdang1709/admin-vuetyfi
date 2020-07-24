import Vue from "vue";
import Vuex from "vuex";

import { alert } from "./modules/alert";
import { account } from "./modules/account";
import { employee } from "./modules/employee";
import { department } from "./modules/department";

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		alert,
		account,
		employee,
		department,
	},
});
