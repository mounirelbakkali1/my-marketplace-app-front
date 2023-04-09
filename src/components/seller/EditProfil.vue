<script>
import { useAuthStore } from "@/stores/authStore.js";
const sellerDefault = {
  name: "",
  email: "",
  created_at: "",
  role: "",
  image: null,
  additional_info: {
    phone: "",
    intro: null,
    coverImage: null,
    websiteUrl: "",
    address: {
      city: "",
      street: "",
      zip_code: "",
    },
  },
};
export default {
  name: "Profil",
  data() {
    return {
      seller: new Proxy(sellerDefault, {
        get: function (target, prop) {
          return prop in target ? target[prop] : "";
        },
      }),
    };
  },
  mounted() {
    this.seller = JSON.parse(localStorage.getItem("user"));
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="addItem" method="post">
      <div
        class="flex flex-col md:flex-row items-start justify-between mt-8 w-full"
      >
        <div class="w-full md:w-1/2 md:pr-4">
          <h3 class="text-xl font-bold mb-4">Contact Information</h3>
          <div class="flex flex-col space-y-4">
            <div>
              <h4 class="text-lg font-bold mb-2">Address</h4>
              <input
                type="text"
                v-model="seller.additional_info.address.street"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Email</h4>
              <input
                type="email"
                v-model="seller.email"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Phone Number</h4>
              <input
                type="tel"
                v-model="seller.additional_info.phone"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">City</h4>
              <input
                type="text"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                v-model="seller.additional_info.address.city"
                required
              />
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Zip Code</h4>
              <input
                type="text"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                v-model="seller.additional_info.address.zip_code"
                required
              />
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 md:pl-4">
          <h3 class="text-xl font-bold mb-4">About</h3>
          <div class="flex flex-col space-y-4">
            <div>
              <h4 class="text-lg font-bold mb-2">Bio</h4>
              <textarea
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                v-model="seller.additional_info.intro"
                required
              ></textarea>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Website</h4>
              <input
                type="text"
                v-model="seller.additional_info.websiteUrl"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5 mb-5">
        <button
          type="submit"
          class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Save changes
        </button>
      </div>
    </form>
  </div>
</template>
