<script>
import axios from "axios";
import FeedBackSection from "../components/FeedbackSection.vue";
import RelatedItems from "../components/RelatedItems.vue";
export default {
  name: "ItemDetails",
  components: {
    FeedBackSection,
    RelatedItems,
  },
  data() {
    return {
      quantity: 1,
      item: {},
      // four items for related items from items array
      RelatedItems: [],
    };
  },
  methods: {
    addToCart() {
      this.$store.dispatch("cart/addToCart", {
        item: this.item,
        quantity: this.quantity,
      });
    },
    itemImage(image) {
      // if source starts with https, return source
      if (image != null && image.startsWith("https")) {
        return image;
      } else {
        return `http://localhost:8000/images/${image}`;
      }
    },
  },
  mounted() {
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
    axios
      .get("http://localhost:8000/api/v1/items")
      .then((response) => {
        this.RelatedItems = response.data.items.slice(0, 4);
        console.log(this.RelatedItems);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<template>
  <div class="shadow-lg h-full pb-[100px]">
    <div class="bg-white rounded-lg overflow-hidden flex p-4">
      <div class="relative" style="width: 50%">
        <img :src="itemImage(item.primary_image)" alt="Product Image" />
        <span
          class="bg-green-500 text-white px-2 py-1 absolute top-0 right-0 mt-2 mr-2 rounded"
          >new</span
        >
      </div>
      <div class="p-6">
        <h2 class="text-xl font-bold mb-2">{{ item.name }}</h2>
        <p class="text-gray-700 text-base mb-4">
          {{ item.item_details?.description }}
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
          {{ item.item_details?.size }}
          <!-- <select
            class="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-gray-700 text-sm"
          >
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select> -->
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
          <RouterLink :to="{ name: 'chat' }">Contact Seller</RouterLink>
        </button>
      </div>
    </div>
    <FeedBackSection />
    <RelatedItems :relatedItems="RelatedItems" />
  </div>
</template>
