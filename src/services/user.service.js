import { authHeader } from "../helpers";
// import { resolve } from 'core-js/fn/promise';
// import axios from 'axios';
import router from "../router";
const apiUrl = "https://api.xemhd.xyz/api";

export const userService = {
	login,
	logout,
	register,
	getAll,
	getById,
	update,
	delete: _delete,
};

function login(username, password) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	};

	return fetch(apiUrl + "/login", requestOptions)
		.then(handleResponse)
		.then((user) => {
			// login thành công nếu có một token jwt trong response
			if (user.token) {
				// lưu dữ liệu user và token jwt vào local storage để giữ user được log in trong page
				localStorage.setItem("user", JSON.stringify(user));
			}
			//console.log(user);
			return user;
		});

	// var user = new Promise(
	//     function (resolve) {
	//         resolve(
	//             localStorage.setItem('user', JSON.stringify({"token":username+password}))
	//         );
	//     }
	// )
	// return user;
}

function logout() {
	// xoá user từ local storage để log out
	localStorage.removeItem("user");
	router.push("/login").catch((error) => {
		console.info(error.message);
	});
}

function register(user) {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(user),
	};

	return fetch(apiUrl + "/users/register", requestOptions).then(handleResponse);
}

function getAll() {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	};

	return fetch(apiUrl + "/users", requestOptions).then(handleResponse);
}

function getById(id) {
	const requestOptions = {
		method: "GET",
		headers: authHeader(),
	};
	return fetch(apiUrl + "/users/" + id, requestOptions).then(handleResponse);
}

function update(user) {
	const requestOptions = {
		method: "PUT",
		headers: { ...authHeader(), "Content-Type": "application/json" },
		body: JSON.stringify(user),
	};

	return fetch(apiUrl + "/users/${user.id}", requestOptions).then(
		handleResponse
	);
}

function _delete(id) {
	const requestOptions = {
		method: "DELETE",
		headers: authHeader(),
	};

	return fetch(apiUrl + "/users/" + id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
	console.log(response.status);
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				// tự động logout nếu response 401 được trả về từ api
				logout();
				//location.reload(true);
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
