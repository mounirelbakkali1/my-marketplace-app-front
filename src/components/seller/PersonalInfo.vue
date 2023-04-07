<template>
  <div class="flex flex-col items-center">
    <div
      class="w-full h-40 bg-cover bg-center"
      :style="{ backgroundImage: `url('https://picsum.photos/1800')` }"
    ></div>
    <div class="w-full py-4 px-6">
      <div
        class="flex flex-col md:flex-row items-center md:items-start justify-between"
      >
        <div class="flex items-center mb-4 md:mb-0">
          <img
            class="w-20 h-20 rounded-full border-2 border-white mr-4"
            src="https://picsum.photos/1800"
            alt="Seller profile image"
          />
          <div>
            <h2 class="text-2xl font-bold">{{ seller.name }}</h2>
            <p class="text-gray-600 text-sm">{{ seller.email }}</p>
          </div>
        </div>
        <router-link
          to="/seller/profile/edit"
          class="border border-indigo-200 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-md router-link-active router-link-exact-active text-blue-600"
        >
          Edit Profile
        </router-link>
      </div>
      <!-- links to dashboard profil in flex -->
      <div
        class="flex items-center justify-center md:justify-start mt-4 bg-indigo-500"
      >
        <router-link
          :to="{ name: 'sellerProfile' }"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-inherit">
            Profile
          </p></router-link
        >
        <router-link
          :to="{ name: 'sellerDashboard' }"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-inherit">
            Dashboard
          </p></router-link
        >
        <router-link
          :to="{ name: 'sellerProducts' }"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-inherit">
            Products
          </p></router-link
        >
        <router-link
          :to="{ name: 'sellerOrders' }"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-inherit">
            Orders
          </p></router-link
        >
        <router-link
          :to="{ name: 'sellerActivities' }"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-inherit">
            My activities
          </p></router-link
        >
      </div>
      <div class="">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/index";

export default {
  name: "PersonalInfo",
  data() {
    return {
      seller: {},
    };
  },
  mounted() {
    this.seller = JSON.parse(localStorage.getItem("user"));
    const authStore = useAuthStore();
  },
};
</script>
