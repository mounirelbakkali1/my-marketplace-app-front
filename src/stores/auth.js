import { defineStore } from "pinia";

export const useAuth = defineStore("auth", () => {
  const auth = ref(null);

  function user() {
    return auth;
  }

  return { auth, user };
});
