<template>
  <!-- position relative in tailwind -->
  <div class="flex flex-col lg:flex-row min-h-screen relative">
    <!-- Sidebar -->
    <div
      class="fixed z-50 left-0 w-0 lg:w-64 h-screen bg-indigo-500 text-gray-100 overflow-hidden sidebar transition-all duration-10"
      :class="sidebarOpen ? 'w-[70px] md:w-64' : ''"
    >
      <div class="flex items-center justify-between mt-8 mx-6">
        <h1 class="text-2xl font-bold hidden md:block">
          <slot name="title"></slot>
        </h1>
        <button
          class="lg:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white"
          @click="toggleNav"
        >
          CS
        </button>
      </div>
      <div
        class="flex flex-col justify-center md:justify-between flex-grow mt-4"
      >
        <nav>
          <slot name="links"></slot>
        </nav>
        <div class="flex items-center p-4 justify-center md:justify-around">
          <button
            class="flex items-center justify-center p-2 md:px-6 py-2 bg-blue-500 bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-500"
          >
            <i class="fas fa-user-circle mr-0 md:mr-3"></i>
            <span class="hidden md:block">
              <router-link to="/logout"> Log Out </router-link>
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div class="flex-1 bg-gray-100 main__content sm:ml-0 min-h-full">
      <div
        class="flex items-center justify-between px-6 bg-white border-b"
      ></div>
      <div class="px-4 py-4 md:px-6 md:py-6">
        <button
          class="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          @click="toggleNav"
        >
          OP
        </button>
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInfo from "../components/seller/PersonalInfo.vue";
import ItemManagement from "../components/seller/ItemManagement.vue";
import Orders from "../components/seller/Orders.vue";
import Statistics from "../components/seller/Statistics.vue";
import DashLink from "./DashLink.vue";
import axios from "axios";

export default {
  components: {
    PersonalInfo,
    ItemManagement,
    Orders,
    Statistics,
    DashLink,
  },
  data() {
    return {
      currentComponent: "personalInfo",
      items: null,
      sidebarOpen: false,
      sidebarWidth: 0,
      navbarHeight: 0,
    };
  },
  watch: {
    sidebarOpen(val) {
      this.updateMainLeftMargin();
      // this.updateSideBarTopMargin();
    },
  },
  mounted() {
    // retreive items from backend
    axios
      .get("http://localhost:8000/api/v1/items")
      .then((res) => (this.items = res.data.items))
      .then(() => console.table(this.items));
    window.addEventListener("resize", () => {
      this.updateMainLeftMargin();
    });
    this.updateMainLeftMargin();
  },
  methods: {
    updateMainLeftMargin() {
      const sidebar = document.querySelector(".sidebar");
      const sidebarWidth = sidebar.getBoundingClientRect().width;
      const main = document.querySelector(".main__content");
      main.style.marginLeft = `${sidebarWidth}px`;
    },
    updateCurrentComponent(component) {
      this.currentComponent = component;
    },
    toggleNav() {
      this.sidebarOpen = !this.sidebarOpen;
      setTimeout(() => {
        this.updateMainLeftMargin();
      }, 110);
    },
  },
};
</script>

<style></style>
