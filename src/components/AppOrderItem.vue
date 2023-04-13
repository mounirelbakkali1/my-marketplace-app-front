<script>
export default {
  data() {
    return {
      productName: "Product Name",
      productImage: "product_image_url",
      productPrice: "Product Price",
      deliveryCost: "Delivery Cost",
      name: "",
      phone: "",
      address: "",
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      // You can access the form data using this.name, this.phone, this.address
      // and make API calls, update the database, etc.
      console.log("Form submitted");
    },
  },
  mounted() {
    const { uis, id } = this.$route.params;
    console.log("uis", uis);
    console.log("id", id);
  },
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full sm:max-w-md px-4 py-6 bg-white rounded-md shadow-md">
      <h1 class="text-2xl font-semibold mb-4">Product Summary</h1>
      <div class="flex items-center mb-4">
        <img :src="productImage" alt="Product Image" class="w-16 h-16 mr-4" />
        <div>
          <h2 class="text-xl font-semibold">{{ productName }}</h2>
          <p class="text-gray-600">{{ productPrice }} USD</p>
          <p class="text-gray-600">{{ deliveryCost }} USD for delivery</p>
        </div>
      </div>
      <h1 class="text-2xl font-semibold my-4">Contact Information</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-gray-600">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-600">Phone</label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            class="w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block text-gray-600">Address</label>
          <input
            id="address"
            v-model="address"
            type="text"
            class="w-full px-4 py-2 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div class="flex justify-end">
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
</template>

<style scoped>
/* Add Tailwind CSS classes for styling */
</style>
