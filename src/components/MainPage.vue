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
    };
  },
  mounted() {
    axios.get("http://localhost:8000/api/v1/items").then((res) => {
      this.products = res.data.items;
    });
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
  <div class="flex flex-col md:flex-row min-h-screen">
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
    <div class="md:w-3/4 px-4 py-8">
      <h2 class="text-2xl font-bold mb-4">Featured Products</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <!-- Product card -->
        <div
          class="bg-white rounded-lg shadow-md overflow-hidden"
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
              <span class="text-gray-500 mt-2">{{ product.price }}</span>
            </div>
            <!-- product rating -->
            <ItemRating
              v-if="product.rating_average"
              :rating="parseInt(product.rating_average)"
              :reviews="product.reviews"
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
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                <RouterLink
                  :to="{ name: 'details', params: { id: product.id } }"
                  >view</RouterLink
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
