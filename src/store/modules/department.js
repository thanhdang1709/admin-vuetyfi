import { departmentService } from "../../services";
//import  router  from '../../router';

//const user = JSON.parse(localStorage.getItem('user'));

const state = {
	departments: null,
	error: null,
	total_page: 0,
};

const actions = {
	getAllDepartment({ commit }, data) {
		// commit('allEmployee');
		return new Promise((resolve, reject) => {
			departmentService.getAllDepartment(data).then(
				(data) => {
					//console.log(typeof(data))
					let responseData = JSON.parse(data);
					commit("allDepartment", responseData.data);
					commit("totalPage", responseData.total);
					//router.push('/');
					//console.log(responseData);
					//return Promise.resolve(true);
					resolve(responseData);
				},
				(error) => {
					//console.log(error);
					commit("requestFailure", error);
					//dispatch('alert/error', error, { root: true });
					reject(error);
				}
			);
		});
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
	totalPage(state, data) {
		//state.status = { loggingIn: true };
		state.total_page = data;
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
