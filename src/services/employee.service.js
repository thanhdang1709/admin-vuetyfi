//import { authHeader } from '../helpers';
// import { resolve } from 'core-js/fn/promise';
import axios from "axios";
//import router from '../router';
import { store } from "../store";

import { userService } from "./user.service";
const apiUrl = "http://localhost/employee-management/api";

export const employeeService = {
	getAllEmployee,
	deleteEmployee,
	addEmployee,
	checkEmailEmployee,
	checkPhoneEmployee,
	editEmployee,
};

function getAllEmployee() {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ token: store.state.account.user.token }),
	};
	return fetch(apiUrl + "/getAllEmployee", requestOptions).then(handleResponse);
}
function deleteEmployee(data) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			token: store.state.account.user.token,
			id: data.item.id,
		}),
	};
	//console.log(requestOptions);
	return fetch(apiUrl + "/deleteEmployee", requestOptions).then(handleResponse);
}
function addEmployee(data) {
	console.log(data);
	data.append("token", store.state.account.user.token);
	return axios({
		method: "POST",
		url: apiUrl + "/addEmployee",
		data: data,
		headers: { "Content-Type": "multipart/form-data" },
	}).then(handleResponseAxios);
}
function editEmployee(data) {
	console.log(data);
	data.append("token", store.state.account.user.token);
	return axios({
		method: "POST",
		url: apiUrl + "/editEmployee",
		data: data,
		headers: { "Content-Type": "multipart/form-data" },
	}).then(handleResponseAxios);
}
function checkEmailEmployee(data) {
	//console.log(requestOptions);
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			token: store.state.account.user.token,
			id: data.id,
			email: data.email,
		}),
	};
	return fetch(apiUrl + "/checkEmailEmployee", requestOptions).then(
		handleResponse
	);
}
function checkPhoneEmployee(data) {
	//console.log(requestOptions);
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			token: store.state.account.user.token,
			id: data.id,
			phone: data.phone,
		}),
	};
	return fetch(apiUrl + "/checkPhoneEmployee", requestOptions).then(
		handleResponse
	);
}

function handleResponse(response) {
	//console.log(response);

	if (response.status == 500) {
		const error = "Server Error";
		return Promise.reject(error);
	}
	if (response.status == 400) {
		const error = "Bad Request";
		return Promise.reject(error);
	}
	if (response.status == 302) {
		const error = "HTTP FOUND";
		return Promise.reject(error);
	}
	//(Promise.resolve('hello'));
	console.log(response);

	return response.text().then((text) => {
		const data = text; // && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// tự động logout nếu response 401 được trả về từ api
				userService.logout();
				//location.reload(true);
			}
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		//console.log(data);
		return data;
	});
}

function handleResponseAxios(response) {
	//console.log(response);

	if (response.status == 500) {
		const error = "Server Error";
		return Promise.reject(error);
	}
	if (response.status == 400) {
		const error = "Bad Request";
		return Promise.reject(error);
	}
	if (response.status == 302) {
		const error = "HTTP FOUND";
		return Promise.reject(error);
	}
	//(Promise.resolve('hello'));
	console.log(typeof response.data);

	const data = response.data;
	if (!response.statusText) {
		if (response.status === 401) {
			userService.logout();
		}
		const error = (data && data.message) || response.statusText;
		return Promise.reject(error);
	}
	return data;
}
