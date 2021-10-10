import axios from "axios";
// import { toast } from "react-toastify";
import _logger from "../Services/_loggerService";

//Interceptor used to handle errors & success globaly
axios.interceptors.response.use(null, (error) => {
  const expectedErrors =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedErrors) {
    _logger.captureEx(error);
  }

  return Promise.reject(error);
});

export function setUserAuth(token) {
  axios.defaults.headers.common["x-auth-token"] = token;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setUserAuth,
};
