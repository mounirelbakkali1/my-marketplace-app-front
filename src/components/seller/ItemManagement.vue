<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/4 lg:w-1/5 px-4 py-6">
      <button class="bg-green-500 text-white px-4 py-2 rounded-md mb-4">
        Add New Item
      </button>
      <div class="flex flex-col">
        <label class="font-bold mb-2">Filter By:</label>
        <div class="flex flex-col">
          <input type="checkbox" class="mr-2 mb-1" />
          <label>Food</label>
        </div>
        <div class="flex flex-col">
          <input type="checkbox" class="mr-2 mb-1" />
          <label>Accessories</label>
        </div>
      </div>
    </div>
    <div class="w-full md:w-3/4 lg:w-4/5 px-4 py-6">
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left">Image</th>
            <th class="text-left">Product Name</th>
            <th class="text-left">Category</th>
            <th class="text-left">Price</th>
            <th class="text-left">Stock</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in displayedItems" :key="index">
            <td>
              <img
                :src="item.image"
                class="w-12 h-12 object-cover rounded-md"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.stock }}</td>
            <td>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-center mt-4">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5, // number of items to display per page
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    displayedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  methods: {
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
};
</script>
