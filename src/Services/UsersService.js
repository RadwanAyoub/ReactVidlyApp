import HttpService from "./HttpService";
import Constants from "../Constants";
import jwtDecode from "jwt-decode";

HttpService.setUserAuth(getUserToken());

export async function registerUser(user) {
  const response = await HttpService.post(
    Constants.ApiEndPoint + "/users",
    user
  );
  localStorage.setItem("token", response.headers["x-auth-token"]);
  return response;
}

export async function loginUser(user) {
  const response = await HttpService.post(
    Constants.ApiEndPoint + "/auth",
    user
  );
  localStorage.setItem("token", response.data);
  return response;
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  const userToken = localStorage.getItem("token");
  try {
    if (userToken) return jwtDecode(userToken);
    else return null;
  } catch (ex) {
    return null;
  }
}

export function getUserToken() {
  return localStorage.getItem("token");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  loginUser,
  logout,
  registerUser,
  getCurrentUser,
  getUserToken,
};
