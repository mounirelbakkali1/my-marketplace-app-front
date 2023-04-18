<script>
import ItemRating from "./ItemRating.vue";
import axios from "axios";
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
    };
  },
  mounted: async function () {
    const resp = await axios
      .get("http://localhost:8000/api/v1/items")
      .then((res) => {
        this.products = res.data.items;
      });
    this.loading = false;

    // .then(() => console.table(this.products));
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
    <div class="flex flex-col md:flex-row">
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
              />
              <span class="ml-2 text-gray-700">All</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <span class="ml-2 text-gray-700">Dogs</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <span class="ml-2 text-gray-700">Cats</span>
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
              />
              <span class="ml-2 text-gray-700">All</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <span class="ml-2 text-gray-700">Food</span>
            </label>
          </div>
          <div>
            <label class="inline-flex items-center">
              <input
                type="checkbox"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
              <span class="ml-2 text-gray-700">Accessories</span>
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
          class="bg-white shadow-md overflow-hidden p-3"
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
                  :fallback="fallbackImage"
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
