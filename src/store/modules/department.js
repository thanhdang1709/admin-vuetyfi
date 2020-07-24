import { departmentService } from "../../services";
//import  router  from '../../router';

//const user = JSON.parse(localStorage.getItem('user'));

const state = {
	departments: null,
	error: null,
};

const actions = {
	getAllDepartment({ commit }) {
		// commit('allEmployee');
		departmentService.getAllDepartment().then(
			(data) => {
				//console.log(typeof(data))
				let responseData = JSON.parse(data);
				commit("allDepartment", responseData.data);
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
	editDepartment({ dispatch, commit }, data) {
		departmentService.editDepartment(data).then(
			(data) => {
				let responseData = JSON.parse(data);
				//console.log(responseData.data);
				commit("allDepartment", responseData.data);
				commit("employee/allEmployee", null, { root: true });
				dispatch("alert/success", "Edit successful", { root: true });
			},
			(error) => {
				commit("requestFailure", error);
			}
		);
	},
	deleteDepartment({ dispatch, commit }, data) {
		departmentService.deleteDepartment(data).then(
			() => {
				///let responseData = JSON.parse(data);
				//console.log(responseData.data);
				commit("allDepartment", null);
				commit("employee/allEmployee", null, { root: true });
				dispatch("alert/success", "Delete successful", { root: true });
			},
			(error) => {
				commit("requestFailure", error);
			}
		);
	},
	addDepartment({ dispatch, commit }, data) {
		departmentService.addDepartment(data).then(
			() => {
				///let responseData = JSON.parse(data);
				//console.log(responseData.data);
				commit("allDepartment", null);
				//commit("employee/allEmployee", null, { root: true });
				dispatch("alert/success", "Add successful", { root: true });
			},
			(error) => {
				commit("requestFailure", error);
			}
		);
	},
};

const mutations = {
	allDepartment(state, data) {
		//state.status = { loggingIn: true };
		state.departments = data;
	},
	requestFailure(state, data) {
		state.error = data;
	},
};

export const department = {
	namespaced: true,
	state,
	actions,
	mutations,
};
