<template>
  <div class="flex flex-col items-center justify-center w-full">
    <h2 class="text-2xl font-bold mb-4">Statistics</h2>
    <div class="flex flex-wrap justify-between w-full mb-8">
      <div
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 border border-gray-300 rounded-md green"
      >
        <h3 class="text-xl font-bold mb-2">Total Sales</h3>
        <p class="text-gray-600">{{ totalSales }}</p>
      </div>
      <div
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 border border-gray-300 rounded-md blue"
      >
        <h3 class="text-xl font-bold mb-2">Total Clients</h3>
        <p class="text-gray-600">{{ totalClients }}</p>
      </div>
      <div
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 border border-gray-300 rounded-md flex items-center justify-between orange"
      >
        <div>
          <h3 class="text-xl font-bold mb-2">Total Products</h3>
          <p class="text-gray-600">{{ totalProducts }}</p>
        </div>
        <div>
          <i class="fa fa-icon"></i>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col items-center justify-center w-full p-4 border border-gray-300 rounded-md"
    >
      <h3 class="text-xl font-bold mb-4">Sales Overview</h3>
      <div class="w-full h-64 flex justify-center">
        <!-- Chart -->
        <SalesOverview />
      </div>
    </div>
  </div>
</template>

<script>
import SalesOverview from "./SalesOverviewChart.vue";
import axiosInstance from "../../api/axios";
import { useAuthStore } from "@/stores/authStore.js";

export default {
  components: {
    SalesOverview,
  },
  data() {
    return {
      totalSales: 0,
      totalClients: 0,
      totalProducts: 0,
      auth: useAuthStore(),
    };
  },
  methods: {
    async getStatistics() {
      const role = this.auth.currentUser.role;
      const response = await axiosInstance.get(`/v1/${role}/statistics`);
      this.totalSales = response.data.statistics.totalSales;
      this.totalClients = response.data.statistics.totalClients;
      this.totalProducts = response.data.statistics.totalItems;
    },
  },
  mounted() {
    this.getStatistics();
  },
};
</script>

<style>
.green {
  background-color: #acffaf;
}
.blue {
  background-color: #cae7ff;
}
.orange {
  background-color: #ffdfb1;
}
</style>
