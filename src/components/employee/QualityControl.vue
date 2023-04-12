<script>
import { useItemsStore } from "@/stores/ItemsStore";
import AccountStatus from "../AccountStatus.vue";
export default {
  name: "QualityControl",
  components: {
    AccountStatus,
  },
  data() {
    return {
      recentItems: [],
      default_image:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y&d=mm",
      currentPage: 1,
      itemsPerPage: 6,
      loading: true,
      showMenu: false,
      itemsStore: useItemsStore(),
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.recentItems.length / this.itemsPerPage);
    },
    displayedItems() {
      if (this.recentItems.length != 0) {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.recentItems.slice(start, end);
      }
    },
  },
  methods: {
    async getRecentItems() {
      console.log(this.itemsStore);
      await this.itemsStore.getRecentItems();
      this.recentItems = this.itemsStore.items;
      this.loading = false;
      return this.recentItems;
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
    itemImage(image) {
      // if source starts with https, return source
      if (image.startsWith("https")) {
        return image;
      } else {
        return `http://localhost:8000/images/${image}`;
      }
    },
    viewItem(id) {
      console.log("view item ", id);
    },
    blockItem(id) {
      console.log("block item ", id);
    },
    leave() {
      setTimeout(function () {
        this.showMenu = false;
      }, 1000);
    },
  },
  mounted() {
    this.getRecentItems();
  },
};
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-bold mb-3">Quality Control</h1>
    <div class="flex flex-col md:flex-row min-h-screen" v-if="loading">
      <img
        src="../../assets/images/icons8-loading-circle.gif"
        alt="loading"
        class="mx-auto my-auto"
      />
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
        v-if="!loading"
        v-for="item in displayedItems"
        :key="item.id"
        class=""
      >
        <div
          class="flex flex-col bg-white rounded-md shadow-md p-[30px] relative group"
        >
          <!-- edit button in position absolute-->
          <button
            class="absolute top-0 right-0 p-2"
            @mouseover="showMenu = true"
            @mouseleave="leave"
          >
            <img
              src="../../assets/images/icons8-gear-94.png"
              alt="edit"
              class="abs-img"
            />
          </button>
          <div
            class="group-hover:opacity-100 transition-opacity bg-gray-400 px-1 text-sm text-gray-100 rounded-md absolute tooltip opacity-0 z-10"
            v-if="showMenu"
            @mouseover="showMenu = true"
            @mouseleave="leave"
          >
            <button
              class="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-gray-500"
              @click="viewItem(item.id)"
            >
              view
            </button>
            <button
              class="block w-full text-left px-4 py-2 hover:bg-gray-300 hover:text-gray-500"
              @click="blockItem(item.id)"
            >
              block
            </button>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <AccountStatus :status="item.status" />
              <h1 class="text-xl font-bold">{{ item.name }}</h1>
              <h2 class="text-lg font-bold">{{ item.price }}DH</h2>
            </div>
            <div class="flex flex-col">
              <img
                :src="itemImage(item.primary_image) || default_image"
                class="rounded-md w-32 h-32"
              />
            </div>
          </div>
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <h5 class="text-lg">Seller</h5>
              <h6 class="font-bold">{{ item.seller_name }}</h6>
            </div>
            <div class="flex flex-col">
              <h5 class="text-lg">Category</h5>
              <h6 class="font-bold">{{ item.category_name }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-5">
      <div class="flex flex-row">
        <button
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 ml-2"
          :disabled="currentPage === 1"
          @click="prevPage()"
        >
          Prev
        </button>
        <button
          v-for="pageNumber in pageCount"
          class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mx-2"
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
    </div>
  </div>
</template>

<style scoped>
.abs-img {
  width: 30px;
  height: 30px;
}
.abs {
  top: 3px;
  right: 3px;
}
.tooltip {
  top: 40px;
  right: 0px;
}
</style>
