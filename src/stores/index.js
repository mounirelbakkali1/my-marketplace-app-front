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
        const token = response.data.authorisation.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data.user);
        //redirect to "/"
        window.location.href = "/";
      } catch (error) {
        localStorage.removeItem("token");
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
              //return response;
            }
          })
          .catch((error) => {
            throw error;
          });
        window.location.href = "/login";
      } catch (error) {
        localStorage.removeItem("token");
        return error;
      }
    },
    async logout() {
      return new Promise((resolve) => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
});
