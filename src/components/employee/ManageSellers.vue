<script>
import { useSellerStore } from "@/stores/sellerStore.js";
import AccountStatus from "@/components/AccountStatus.vue";
import Profil from "@/components/seller/Profil.vue";

export default {
  name: "ManageSellers",
  components: {
    AccountStatus,
    Profil,
  },
  data() {
    return {
      sellers: [],
      seller: null,
      default_image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mm",
      sellerStore: useSellerStore(),
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.sellers.length / this.itemsPerPage);
    },
    displayedSellers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sellers.slice(start, end);
    },
  },

  methods: {
    async manageSeller(user) {
      await this.sellerStore.getSeller(user);
      this.seller = this.sellerStore.seller;
      console.log(this.seller);
    },
    async blockSeller(user) {
      await this.sellerStore.suspendSeller(user);
      this.getSellers();
      this.seller = null;
    },
    async unblockSeller(user) {
      await this.sellerStore.unblockSeller(user);
      this.getSellers();
      this.seller = null;
    },
    async sendMessage(sellerID) {
      await this.sellerStore.sendMessage(sellerID);
    },
    async getSellers() {
      const sellers = await this.sellerStore.retreiveSellers();
      this.sellers = sellers;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.getSellers();
  },
};
</script>
<template>
  <h2 class="text-2xl font-bold mb-4">Manage Sellers</h2>
  <div class="bg-white shadow-md rounded my-6">
    <!-- view seller info -->
    <div class="p-5" v-if="seller">
      <div class="flex justify-between">
        <div class="flex">
          <div class="w-10 h-10 mr-3">
            <img
              class="w-full h-full rounded-full"
              :src="seller?.image || default_image"
              alt=""
            />
          </div>
          <div>
            <p class="text-gray-900 font-bold text-xl leading-none">
              {{ seller?.name }}
            </p>
            <p class="text-gray-600 text-sm">{{ seller?.email }}</p>
          </div>
        </div>
        <div class="flex">
          <button
            v-if="seller?.account_status === 'suspended'"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="unblockSeller(seller.id)"
          >
            Unblock
          </button>
          <button
            v-if="seller?.account_status === 'active'"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            @click="blockSeller(seller.id)"
          >
            Block
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="sendMessage(seller.id)"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Email</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Image</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="(user, index) in displayedSellers"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">{{ user.name }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <AccountStatus :status="user.account_status" />
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex justify-center items-center">
                <div class="w-10 h-10">
                  <img
                    class="w-full h-full rounded-full"
                    :src="default_image"
                    alt="user image"
                  />
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-right whitespace-nowrap">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      @click="manageSeller(user.id)"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- pagination links -->
  <div class="flex justify-center">
    <button
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2"
      :disabled="currentPage === 1"
      @click="prevPage()"
    >
      Prev
    </button>
    <button
      v-for="pageNumber in pageCount"
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2"
      :class="pageNumber === currentPage ? 'bg-gray-400 text-white' : ''"
      @click="currentPage = pageNumber"
    >
      {{ pageNumber }}
    </button>
    <button
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 ml-2"
      :disabled="currentPage === pageCount"
      @click="nextPage()"
    >
      Next
    </button>
  </div>
</template>
