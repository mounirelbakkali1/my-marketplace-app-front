import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import axios from "axios";
export const useAuthStore = defineStore("AuthStore", {
  // Data
  state: () => ({
    auth: false,
    user: null,
  }),
  // Computed
  getters: {},
  // Methods
  actions: {
    setUser(user) {
      this.user = user;
    },
    async login(user) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/login",
          user
        );
        console.log("USER", response.data);
        localStorage.clear();
        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href = "/";
        }, 10000);
        console.log(response);
      } catch (error) {
        throw error;
      }
    },
    async registerSeller(user) {
      try {
        const response = await axios
          .post("http://localhost:8000/api/v1/sellers", user)
          .then((response) => {
            if (response.status === 201) {
              console.log(response);
            }
          })
          .catch((error) => {
            throw error;
          });
        window.location.href = "/login";
      } catch (error) {
        return error;
      }
    },
    async logout() {
      return new Promise((resolve) => {
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
});
