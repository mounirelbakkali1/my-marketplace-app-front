import axios from "axios";

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
    // Do something with unauthorized requests
    if (error.response.status === 401) {
      // Handle unauthorized requests
      console.log("Unauthorized request");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
