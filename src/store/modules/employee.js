import { employeeService } from "../../services";
import router from "../../router";

//const user = JSON.parse(localStorage.getItem('user'));

const state = {
	employees: null,
	error: null,
	total_page: 0,
};

const actions = {
	getAllEmployee({ commit }, data) {
		// commit('allEmployee');
		return new Promise((resolve, reject) => {
			// Do something here... lets say, a http call using vue-resource
			employeeService.getAllEmployee(data).then(
				(data) => {
					//console.log(data);
					let responseData = JSON.parse(data);
					commit("allEmployee", responseData.data);
					commit("totalPage", responseData.total);
					//router.push('/');
					console.log(responseData.data);
					//return Promise.resolve(true);
					//console.log(state.employees);
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
		// employeeService.getAllEmployee(data).then(
		// 	(data) => {
		// 		//console.log(data);
		// 		let responseData = JSON.parse(data);
		// 		commit("allEmployee", responseData.data);
		// 		commit("totalPage", responseData.total);
		// 		//router.push('/');
		// 		console.log(responseData.data);
		// 		//return Promise.resolve(true);
		// 		//console.log(state.employees);
		// 		return responseData;
		// 	},
		// 	(error) => {
		// 		//console.log(error);
		// 		commit("requestFailure", error);
		// 		//dispatch('alert/error', error, { root: true });
		// 	}
		// );
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
		//console.log(data);
		employeeService.addEmployee(data).then(
			(data) => {
				var res = data;
				console.log(res);
				///let responseData = JSON.parse(data);
				//console.log(responseData.data);
				commit("allDepartment", null);
				commit("employee/allEmployee", null, { root: true });
				commit("redirectToEmployee");
				setTimeout(() => {
					dispatch("alert/success", "Add successful", { root: true });
				}, 300);

				return Promise.resolve(res);
			},
			(error) => {
				console.log(error);

				commit("requestFailure", error);
			}
		);
	},
	editEmployee({ dispatch, commit }, data) {
		//console.log(data);
		employeeService.editEmployee(data).then(
			(data) => {
				var res = data;
				console.log(res);
				///let responseData = JSON.parse(data);
				//console.log(responseData.data);
				commit("allDepartment", null);
				commit("employee/allEmployee", null, { root: true });
				commit("redirectToEmployee");
				setTimeout(() => {
					dispatch("alert/success", "Edit successful", { root: true });
				}, 300);

				return Promise.resolve(res);
			},
			(error) => {
				console.log(error);

				commit("requestFailure", error);
			}
		);
	},
	checkEmailEmployee({ dispatch, commit }, data) {
		//console.log(data);
		employeeService.checkEmailEmployee(data).then(
			(data) => {
				var res = JSON.parse(data);

				if (res.message == "Email already exists") {
					console.log(res.message);
					dispatch("alert/error", "Email already exists", { root: true });
				}
				if (res.message == "Email available") {
					//console.log(res.message);
					dispatch("alert/success", "Email available", { root: true });
				}
				return Promise.resolve(res);
			},
			(error) => {
				dispatch("alert/clear", { root: true });
				commit("requestFailure", error);
			}
		);
	},
	checkPhoneEmployee({ dispatch, commit }, data) {
		//console.log(data);
		employeeService.checkPhoneEmployee(data).then(
			(data) => {
				var res = JSON.parse(data);

				if (res.message == "Phone already exists") {
					console.log(res.message);
					dispatch("alert/error", "Phone already exists", { root: true });
				}
				if (res.message == "Phone available") {
					//console.log(res.message);
					dispatch("alert/success", "Phone available", { root: true });
				}
				return Promise.resolve(res);
			},
			(error) => {
				dispatch("alert/clear", { root: true });
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
	totalPage(state, data) {
		//state.status = { loggingIn: true };
		state.total_page = data;
	},
	requestFailure(state, data) {
		state.error = data;
	},
	redirectToEmployee() {
		router.push({ name: "Employee" });
	},
};

export const employee = {
	namespaced: true,
	state,
	actions,
	mutations,
};
