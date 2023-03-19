<script>
import axios from "axios";
export default {
  name: "ItemDetails",
  data() {
    return {
      quantity: 1,
      item: {},
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch("cart/addToCart", {
        item: this.item,
        quantity: this.quantity,
      });
    },
  },
  mounted() {
    //console.log(this.itemId);
    // retreive item details from backend using axios
    axios
      .get(
        "http://localhost:8000/api/v1/items/" +
          this.$route.params.id +
          "/details"
      )
      .then((response) => {
        this.item = response.data.item;
        console.log(this.item);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden flex">
    <div class="relative w-50">
      <img class="w-full" :src="item.primary_image" alt="Product Image" />
      <span
        class="bg-green-500 text-white px-2 py-1 absolute top-0 right-0 mt-2 mr-2 rounded"
        >New Arrival</span
      >
    </div>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-2">{{ item.name }}</h2>
      <p class="text-gray-700 text-base mb-4">
        {{ item.description }}
      </p>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 font-bold text-xl">{{ item.price }}</span>
        <span class="text-gray-600 text-sm ml-2 line-through">{{
          item.price
        }}</span>
        <span class="text-green-500 font-bold text-sm ml-2">Save 23%</span>
      </div>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 mr-2">Size:</span>
        <select
          class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-gray-700 text-sm"
        >
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
        </select>
      </div>
      <div class="flex items-center mb-4">
        <span class="text-gray-700 mr-2">Color:</span>
        <div class="w-6 h-6 rounded-full bg-red-500 mr-2"></div>
        <div class="w-6 h-6 rounded-full bg-green-500 mr-2"></div>
        <div class="w-6 h-6 rounded-full bg-blue-500 mr-2"></div>
      </div>
      <button
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>
