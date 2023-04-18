<script setup>
import axios from "axios";
import { reactive } from "vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

var router = useRouter();
var route = useRoute();
let form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

let error = ref(null);
let authStore = useAuthStore();
const signup = async () => {
  try {
    await authStore.signup(form);
    console.log(authStore.loginErrors);
    if (authStore.loginErrors.length > 0) {
      error.value = authStore.loginErrors[0];
      return;
    }
    if (route.query.redirect) {
      router.push(route.query.redirect);
    } else {
      switch (authStore.currentUser.role) {
        case "admin":
          router.push({ name: "AdminDashboard" });
          break;
        case "seller":
          router.push({ name: "sellerDashboard" });
          break;
        case "employee":
          router.push({ name: "EmployeeDashboard" });
          break;
        default:
          router.push({ name: "Home" });
          break;
      }
    }
    setTimeout(() => {
      window.location.reload();
    }, 100);
  } catch (e) {
    error.value = authStore.loginErrors[0];
  }
};
</script>
<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <div
      class="lg:w-1/2 bg-cover bg-center bg-gray-300 img"
      style="background-image: url('../../Marketplace.png')"
    ></div>
    <div
      class="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full lg:w-1/2"
    >
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <!-- show error message -->
        <div v-if="error" class="text-red-500 text-center">
          {{ error }}
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="signup">
          <div class="rounded-md shadow-sm">
            <div class="mb-2">
              <label for="email-address" class="sr-only">name</label>
              <input
                id="name"
                name="name"
                type="text"
                autocomplete="name"
                required
                class="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="full name"
                v-model="form.name"
              />
            </div>
            <div class="mb-2">
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                v-model="form.email"
              />
            </div>
            <div class="mb-2">
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                class="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                v-model="form.password"
              />
            </div>
            <label for="password" class="sr-only">Password Confirmation</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password Confirmation"
              v-model="form.password_confirmation"
            />
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <router-link
                to="/login"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Have You An Account?
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
