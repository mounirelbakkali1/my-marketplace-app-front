import axios from "axios";
import { useAuthStore } from "../stores/AuthStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
});
// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const auth = useAuthStore();
    // Do something with unauthorized requests
    if (error.response.status === 401) {
      // Handle unauthorized requests
      // if (localStorage.getItem("jwt")) {
      //   auth.currentUser.isAuthenticated = false;
      //   auth.currentUser.email = "";
      //   auth.currentUser.role = "";
      //   localStorage.removeItem("jwt");
      //   window.location.href = "/login";
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
