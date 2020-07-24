import { employeeService } from "../../services";
//import  router  from '../../router';

//const user = JSON.parse(localStorage.getItem('user'));

const state = {
	employees: null,
	error: null,
};

const actions = {
	getAllEmployee({ commit }) {
		// commit('allEmployee');
		employeeService.getAllEmployee().then(
			(data) => {
				//console.log(typeof(data))
				let responseData = JSON.parse(data);
				commit("allEmployee", responseData.data);
				//router.push('/');
				//console.log(responseData);
				//return Promise.resolve(true);
			},
			(error) => {
				//console.log(error);
				commit("requestFailure", error);
				//dispatch('alert/error', error, { root: true });
			}
		);
	},
	deleteEmployee({ dispatch, commit }, data) {
		employeeService.deleteEmployee(data).then(
			() => {
				///let responseData = JSON.parse(data);
				//console.log(responseData.data);
				//commit("allDepartment", null);
				commit("employee/allEmployee", null, { root: true });
				dispatch("alert/success", "Delete successful", { root: true });
			},
			(error) => {
				commit("requestFailure", error);
			}
		);
	},
	addEmployee({ dispatch, commit }, data) {
		console.log(data);
		employeeService.addEmployee(data).then(
			() => {
				///let responseData = JSON.parse(data);
				//console.log(responseData.data);
				commit("allDepartment", null);
				commit("employee/allEmployee", null, { root: true });
				dispatch("alert/success", "Add successful", { root: true });
			},
			(error) => {
				commit("requestFailure", error);
			}
		);
	},
};

const mutations = {
	allEmployee(state, data) {
		//state.status = { loggingIn: true };
		state.employees = data;
	},
	requestFailure(state, data) {
		state.error = data;
	},
};

export const employee = {
	namespaced: true,
	state,
	actions,
	mutations,
};
