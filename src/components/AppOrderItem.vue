<script>
import { useItemsStore } from "@/stores/itemsStore";
import axiosInstance from "../api/axios";
export default {
  data() {
    return {
      itemsStore: useItemsStore(),
      item: null,
      form: {},
      quantity: 1,
      stokeError: '',
      errors: [],
    };
  },
  computed: {
    totalPrice() {
      if(this.item)
      return this.item.price * this.quantity;
    },
  },
  methods: {
    async submitForm() {
      if (this.validateInputs()) {
        this.form.item_id = this.item.id;
        this.form.quantity = this.quantity;
       // console.table(this.form);
        const resp = await axiosInstance.post("/v1/customer/orders", this.form);
       console.log(resp.data);

    }
    },
    itemImage(image) {
      // if source starts with https, return source
      if (image != null && image.startsWith("https")) {
        return image;
      } else {
        return `http://localhost:8000/images/${image}`;
      }
    },
    validateInputs() {
      this.errors = [];
      if (this.quantity <= 0) {
        this.errors.push("Quantity must be greater than 0");
      }
      if (!this.form.name) {
        this.errors.push("Name is required");
      }
      if (!this.form.city) {
        this.errors.push("Email is required");
      }
      if (!this.form.phone) {
        this.errors.push("phone is required");
      }
      if (!this.form.zip_code) {
        this.errors.push("zip code is required");
      }
      if (this.errors.length === 0) return true;
    },
    async getItem(id) {
      const resp = await axiosInstance.get("/v1/items/" + id + "/details");
      this.item = resp.data.item;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.getItem(id);
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-100" v-if="item">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="md:flex -mx-4 justify-center">
        <div class="md:w-2/3 px-4">
          <!-- Product Summary -->
          <div class="bg-white rounded-lg p-6 mb-8">
            <div class="flex items-center mb-4">
              <img
                :src="itemImage(item.primary_image)"
                alt="Product Image"
                class="w-16 h-16 object-cover mr-4"
              />
              <div>
                <h2 class="text-xl font-semibold">Product Name</h2>
                <p class="text-gray-500">Product Condition</p>
                <p class="text-lg font-bold">Product Price</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  type="number"
                  class="w-20 px-2 py-1 border rounded-md focus:outline-none"
                  v-model="quantity"
                  @input="updateTotalPrice"
                />
                <span class="ml-2">x</span>
                <span class="ml-2 font-semibold">{{ item.price }}</span>
                <!-- show out of stock error -->
                <p class="text-red-500 ml-2" v-if="stokeError">{{ stokeError }}</p>
              </div>
              <div>
                <p class="text-lg font-bold">{{ totalPrice }}</p>
              </div>
            </div>
          </div>
          <!-- Shipping Information Form -->
          <div class="bg-white rounded-lg p-6">
            <h2 class="text-xl font-semibold mb-4">Shipping Information</h2>
            <form @submit.prevent="submitForm" class="flex flex-col">
                <p v-if="errors.length" class="bg-red-100 border border-red-400 mb-5 p-3">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li class="text-red-500" v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
              <label for="name" class="mb-4">
                Name
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Full Name"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                  required
                />
              </label>
              <label for="phone" class="mb-4">
                Phone
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="Phone Number"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                  required
                />
              </label>
              <label for="address" class="mb-4">
                Streeet
                <input
                  id="address"
                  v-model="form.street"
                  type="text"
                  placeholder="Street Address"
                  class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                  required
                />
              </label>
              <div class="flex -mx-2">
                <div class="w-1/2 px-2">
                  <label for="city" class="mb-4">
                    City
                    <input
                      id="city"
                      v-model="form.city"
                      type="text"
                      placeholder="City"
                      class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                      required
                    />
                  </label>
                </div>
                <div class="w-1/2 px-2">
                  <label for="zip" class="mb-4">
                    Zip Code
                    <input
                      id=""
                      v-model="form.zip_code"
                      type="text"
                      placeholder="Zip Code"
                      class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
                      required
                    />
                  </label>
                </div>
              </div>
              <input type="hidden" v-model="form.quantity" />
              <div class="flex justify-end mt-10">
                <button class="mr-4">
                  <router-link
                    :to="{ name: 'details', params: { id: item.id } }"
                    >Back</router-link
                  >
                </button>
                <button
                  type="submit"
                  class="bg-indigo-500 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add Tailwind CSS classes for styling */
</style>
