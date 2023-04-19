<script>
import ItemRating from "./ItemRating.vue";
import axiosInstance from "../api/axios.js";
export default {
  name: "MainPage",
  components: {
    ItemRating,
  },
  data() {
    return {
      products: [],
      loading: true,
      selectedCategories: [],
      selectedCollections: [],
    };
  },
  mounted: async function () {
    this.selectedCategories.push("all");
    this.selectedCollections.push("all");
    this.fetchFilteredItems();

    // .then(() => console.table(this.products));
  },
  watch: {
    selectedCategories: function () {
      this.fetchFilteredItems();
    },
    selectedCollections: function () {
      this.fetchFilteredItems();
    },
  },
  computed: {
    fallbackImage() {
      return "../assets/images/fallback-image.jpg";
    },
  },
  methods: {
    itemImage(image) {
      // if source starts with https, return source
      if (image.startsWith("https")) {
        return image;
      } else {
        return `http://localhost:8000/images/${image}`;
      }
    },
    fetchFilteredItems: async function () {
      this.loading = true;
      if (this.selectedCategories.includes("all")) {
        this.selectedCategories = [];
      }
      if (this.selectedCollections.includes("all")) {
        this.selectedCollections = [];
      }
      console.log(this.selectedCategories);
      const resp = await axiosInstance
        .get("/v1/items", {
          params: {
            categories: this.selectedCategories,
            collections: this.selectedCollections,
          },
        })
        .then((res) => {
          this.products = res.data.items;
        });
      this.loading = false;
    },
  },
};
</script>

<template>
  <div class="flex flex-col md:flex-row min-h-screen" v-if="loading">
    <img
      src="../assets/images/page_loading.gif"
      alt="loading"
      class="mx-auto my-auto"
    />
  </div>
  <div class="flex flex-col md:flex-row min-h-screen" v-if="!loading">
    <!-- Sidebar for filtering -->
    <div class="hidden sm:flex md:flex-row">
      <div
        class="w-full md:w-64 h-full bg-white shadow-lg rounded-lg px-4 py-4 mb-4 md:mb-0"
      >
        <h2 class="text-lg font-semibold mb-4">Filter By:</h2>
        <div class="mb-4">
          <h3 class="text-gray-700 font-semibold mb-2">Collections:</h3>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                checked
                v-model="selectedCollections"
                value="all"
              />
              <span class="ml-2 text-gray-700">All</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                value="2"
                v-model="selectedCollections"
              />
              <span class="ml-2 text-gray-700">Dogs</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCollections"
                value="1"
              />
              <span class="ml-2 text-gray-700">Cats</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCollections"
                value="3"
              />
              <span class="ml-2 text-gray-700">Bird</span>
            </label>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="text-gray-700 font-semibold mb-2">Categories:</h3>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                checked
                value="all"
                v-model="selectedCategories"
              />
              <span class="ml-2 text-gray-700">All</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCategories"
                value="1"
              />
              <span class="ml-2 text-gray-700">Food</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCategories"
                value="2"
              />
              <span class="ml-2 text-gray-700">Toys</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCategories"
                value="3"
              />
              <span class="ml-2 text-gray-700">Clothes</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCategories"
                value="4"
              />
              <span class="ml-2 text-gray-700">Accessories</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCategories"
                value="5"
              />
              <span class="ml-2 text-gray-700">furniture</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
                v-model="selectedCategories"
                value="6"
              />
              <span class="ml-2 text-gray-700">other</span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- Product display area -->
    <div class="px-4 py-8">
      <h2 class="text-2xl font-bold mb-4">Featured Products</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <!-- Product card -->
        <div
          class="bg-white shadow-md overflow-hidden p-8"
          v-for="product in products"
        >
          <img
            :src="itemImage(product.primary_image)"
            alt="Product image"
            class="w-full h-48 object-cover"
          />
          <div class="px-4 py-2">
            <!-- product and price in the same line -->
            <div class="flex justify-between items-center">
              <h3 class="text-gray-700 uppercase">{{ product.name }}</h3>
              <span class="text-gray-500 mt-2">{{ product.price }} DH</span>
            </div>
            <!-- product rating -->
            <ItemRating
              v-if="product.rating_average"
              :rating="parseInt(product.rating_average)"
              :reviews="product.rating_count"
            />
            <p class="text-gray-700 mb-2">
              {{ product.description }}
            </p>
            <!-- seller name and image and order button in the right -->
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <img
                  class="h-8 w-8 rounded-full object-cover"
                  :src="product.seller_image"
                  alt="Seller image"
                />
                <span class="text-gray-700 text-sm ml-2">{{
                  product.seller_name
                }}</span>
              </div>
              <!-- add to card with outline and background color took on hover like btn-outline of bootstrap and not fully rounded -->

              <RouterLink
                class="bg-teal-100 hover:bg-teal-500 text-white py-1 text-xs px-2 rounded"
                :to="{ name: 'details', params: { id: product.id } }"
              >
                <img src="../../view.png" alt="" width="20" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
