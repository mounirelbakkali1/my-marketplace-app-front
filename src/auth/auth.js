import { reactive } from "vue";
import axios from "axios";

const authStore = reactive({
  isAuthenticated: false,
  user: null,
});

const login = async (user) => {
  try {
    const response = await axios.post("http://localhost:8000/api/login", user);
    this.auth = true;
    localStorage.clear();
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      const { from } = this.$route.query || { from: { path: "/" } };
      this.$router.push(from);
    }, 10000);
    console.log(response);
  } catch (error) {
    throw error;
  }
};

const registerSeller = async (user) => {
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
};

const logout = () => {
  return new Promise((resolve) => {
    delete axios.defaults.headers.common["Authorization"];
    resolve();
  });
};

const checkAuth = () => {
  // your authentication check logic here
};

export default {
  authStore,
  login,
  logout,
  checkAuth,
  registerSeller,
};
