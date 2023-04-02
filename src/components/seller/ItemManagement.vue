<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/4 lg:w-1/5 px-4 py-6">
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md mb-4"
        @click="addItem"
      >
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
      <!-- form to add new item -->
      <NewItemForm v-if="showAddItemForm" />
      <!-- form to edit item -->
      <EditItemForm v-if="showEditItemForm" />
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left">Image</th>
            <th class="text-left">Product Name</th>
            <th class="text-left">Category</th>
            <th class="text-left">Price</th>
            <th class="text-left">total views</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in displayedItems" :key="index">
            <td class="py-4">
              <img
                :src="itemImage(item.primary_image)"
                class="w-20 h-20 object-cover rounded-md"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.category_name }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.views }}</td>
            <td>
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                @click="editItem(item.id)"
              >
                Edit
              </button>
              <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
                view
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
import axios from "axios";
import { useAuthStore } from "@/stores/index";
import { useItemFormStore } from "@/stores/itemFormStore";
import { useItemsStore } from "@/stores/itemsStore";
import EditItemForm from "./EditItemForm.vue";
import NewItemForm from "./NewItemForm.vue";
export default {
  components: {
    NewItemForm,
    EditItemForm,
  },
  data() {
    return {
      currentPage: 1,
      items: [], // items to display
      itemsPerPage: 5, // number of items to display per page,
      ItemFormStore: useItemFormStore(),
      // ItemStore: useItemsStore(),
      editShowen: false,
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
    showAddItemForm() {
      return this.ItemFormStore.getFormStatus;
    },
    showEditItemForm() {
      return this.ItemFormStore.getEditFormStatus;
    },
  },
  mounted() {
    // get authenticated user id
    const userID = JSON.parse(localStorage.getItem("user")).id;
    const items = this.getSellerItems(userID);
    items.then((data) => {
      this.items = data;
    });
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
    itemImage(image) {
      // if source starts with https, return source
      if (image.startsWith("https")) {
        return image;
      } else {
        return `http://localhost:8000/images/${image}`;
      }
    },
    addItem() {
      this.ItemFormStore.setFormStatus(true);
    },
    async editItem(item) {
      // console.log(item);
      const res = await this.ItemFormStore.retreiveItem(item);
      this.ItemFormStore.setEditFormStatus(true);
      // console.log(res);
    },
    getSellerItems: async function (id) {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `http://localhost:8000/api/v1/sellers/${id}/items`
        );
        return response.data.items;
      } catch (error) {
        if (error.response) {
          // if (error.response.data.message === "Unauthenticated.") {
          //   this.$router.push("/login");
          // }
          console.log(error.response.data.message);
        }
      }
    },
  },
};
</script>
