<script>
import auth from "../auth/auth";
import { useAuthStore } from "../stores/AuthStore";
export default {
  data() {
    return {
      isOpen: false,
      isScrolled: false,
      auth: useAuthStore(),
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      const navbar = this.$el;
      const scrolled = window.scrollY > navbar.offsetHeight;

      this.isScrolled = scrolled;
    },
  },
  computed: {
    isAuthenticated() {
      return this.auth.currentUser.isAuthenticated;
    },
    role() {
      return this.auth.currentUser.role;
    },
  },
};
</script>

<template>
  <nav
    class="flex items-center justify-between bg-white py-4 px-6 lg:px-12 shadow-md fixed w-full flex-wrap z-[66] navbar"
    :class="{ scrolled: isScrolled }"
  >
    <!-- Logo and Hamburger Menu -->
    <div class="flex items-center flex-shrink-0 text-gray-800">
      <router-link to="/">
        <img
          src="../assets/images/logo.png"
          alt="PetsPlaza Logo"
          class="h-10 mr-2"
        />
      </router-link>
    </div>
    <div class="block lg:hidden">
      <button
        @click="isOpen = !isOpen"
        class="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-black hover:border-black"
      >
        <svg
          class="h-3 w-3 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <!-- Navigation Links and Search Bar -->
    <div
      class="w-full flex-grow lg:flex lg:items-center lg:w-auto lg:block lg:mt-0 lg:ml-10"
      :class="{ block: isOpen, hidden: !isOpen }"
    >
      <div class="lg:flex-grow">
        <div class="mr-6">
          <!-- Search Bar -->
          <form action="#" method="POST" class="flex items-center">
            <input
              type="text"
              placeholder="Search for pets..."
              :class="{ transparent: isScrolled }"
              class="w-full rounded-lg border border-indigo-200 border-4 py-2 px-4 leading-tight focus:outline-none focus:shadow-outline"
            />

            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg ml-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <!-- Other Navigation Links -->
      <div class="text-sm">
        <!-- link that go to dashboard -->
        <router-link :to="{ name: 'sellerDashboard' }" v-if="role === 'seller'"
          >seller dashboard</router-link
        >
        <router-link :to="{ name: 'AdminDashboard' }" v-if="role === 'admin'"
          >admin dashboard</router-link
        >
        <router-link
          :to="{ name: 'EmployeeDashboard' }"
          v-if="role === 'employee'"
          >employee dashboard</router-link
        >
      </div>
      <!-- Sell on Pet Plaza Button -->
      <div class="ml-0 sm:ml-5" v-if="!isAuthenticated">
        <button
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg ml-1 lg:ml-0 mt-4 lg:mt-0"
        >
          <router-link :to="{ name: 'create-seller' }"
            >Sell on Pet Plaza</router-link
          >
        </button>
      </div>
      <div class="ml-0 sm:ml-5">
        <button
          class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg ml-1 lg:ml-0 mt-4 lg:mt-0"
        >
          <router-link v-if="!isAuthenticated" :to="{ name: 'login' }"
            >Sign In</router-link
          >
          <router-link v-if="isAuthenticated" :to="{ name: 'logout' }"
            >Sign Out</router-link
          >
        </button>
      </div>
    </div>
  </nav>
</template>

<style>
.scrolled {
  background-color: #1a1ef180 !important;
  color: white !important;
}
.transparent {
  background-color: #ffffff99;
}
</style>
