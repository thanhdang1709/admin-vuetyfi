//import { authHeader } from '../helpers';
// import { resolve } from 'core-js/fn/promise';
// import axios from 'axios';
//import router from '../router';
import { store } from "../store";

import { userService } from "./user.service";
const apiUrl = "https://api.xemhd.xyz/api";

export const departmentService = {
  getAllDepartment,
  editDepartment,
  deleteDepartment,
  addDepartment,
};

function getAllDepartment(data) {
  if (data.limit == "undefined") {
    data.limit = 10;
    data.page = 1;
  }
  console.log(typeof data);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: store.state.account.user.token,
      limit: data.limit,
      page: data.page,
    }),
  };
  return fetch(apiUrl + "/getAllDepartment", requestOptions).then(
    handleResponse
  );
}

function editDepartment(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: store.state.account.user.token,
      id: data.id,
      name: data.name,
      note: data.note,
    }),
  };
  return fetch(apiUrl + "/editDepartment", requestOptions).then(handleResponse);
}
function deleteDepartment(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: store.state.account.user.token,
      id: data.id,
    }),
  };
  return fetch(apiUrl + "/deleteDepartment", requestOptions).then(
    handleResponse
  );
}
function addDepartment(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: store.state.account.user.token,
      name: data.name,
      note: data.note,
    }),
  };
  return fetch(apiUrl + "/addDepartment", requestOptions).then(handleResponse);
}

function handleResponse(response) {
  console.log(response);
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
  return response.text().then((text) => {
    const data = text; //&& JSON.parse(text);
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
