import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axiosInstance from "../api/axios.js";
import jwtDecode from "jwt-decode";
export const useAuthStore = defineStore("AuthStore", {
  // Data
  state: () => ({
    user: null,
    currentUser: {
      email: "",
      role: "",
      isAuthenticated: false,
    },
  }),
  // Computed
  getters: {},
  // Methods
  actions: {
    setUser(user) {
      this.user = user;
    },
    setCurrentUser(user) {
      this.currentUser = user;
    },
    async login(user_info) {
      try {
        const response = await axiosInstance.post("/login", user_info);
        const token = response.data.authorisation.token;
        localStorage.clear();
        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("jwt", token);
        }, 100);
        const user = jwtDecode(token);
        this.currentUser.email = user.email;
        this.currentUser.role = user.role;
        this.currentUser.isAuthenticated = true;
        console.log();
      } catch (error) {
        throw error;
      }
    },
    async registerSeller(user) {
      try {
        const response = await axiosInstance
          .post("/v1/sellers", user)
          .then((response) => {
            if (response.status === 201) {
              console.log(response);
            }
          })
          .catch((error) => {
            throw error;
          });
        setTimeout(() => {
          window.location.href = "/login";
        }, 10000);
      } catch (error) {
        return error;
      }
    },
    async logout() {
      try {
        const resp = await axiosInstance.post("/logout");
        localStorage.clear();
        this.currentUser.email = "";
        this.currentUser.role = "";
        this.currentUser.isAuthenticated = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist: {
    enabled: true,
  },
});
