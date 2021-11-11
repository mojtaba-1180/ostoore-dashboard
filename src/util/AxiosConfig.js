import axios from "axios";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies();
let token = cookies.get("token");

// if (token === undefined || token === null) {
//   cookies.remove("token");
//   cookies.remove("user");
//   cookies.remove("login");

//   window.location.replace("/login");
// }

const instance = axios.create({
  baseURL: "https://ostoore-sport.ir/api/v1/admin",
  headers: { 
    'Content-Type': 'application/json'
  }
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default instance;