<script>
import { useItemFormStore } from "@/stores/itemFormStore";
import EditItemForm from "./EditItemForm.vue";
import NewItemForm from "./NewItemForm.vue";
import axiosInstance from "../../api/axios";
import AccountStatus from "../AccountStatus.vue";
import BaseSweetAlert from "../BaseSweetAlert.vue";
import BaseAlert from "../BaseAlert.vue";
export default {
  components: {
    NewItemForm,
    EditItemForm,
    AccountStatus,
    BaseAlert,
    BaseSweetAlert,
  },
  data() {
    return {
      currentPage: 1,
      items: [], // items to display
      itemsPerPage: 5, // number of items to display per page,
      ItemFormStore: useItemFormStore(),
      // ItemStore: useItemsStore(),
      editShowen: false,
      message: "",
      addedMessage: "",
      uis: null,
      uisGenerated: false,
      linkText: "Copy link",
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    displayedItems() {
      console.log(this.items);
      if (this.items.length === 0) return [];
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
    showAddItemForm() {
      this.addedMessage = this.ItemFormStore.itemFormSuccess;
      return this.ItemFormStore.getFormStatus;
    },
    showEditItemForm() {
      return this.ItemFormStore.getEditFormStatus;
    },
    getLink() {
      return `localhost:8000/api/items/uis?uis=${this.uis}`;
    },
    copyContent() {
      const contentToCopy = this.$refs.contentToCopy;
      const range = document.createRange();
      range.selectNodeContents(contentToCopy);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
      selection.removeAllRanges();
      range.detach();
      this.linkText = "Copied!";
    },
  },
  mounted() {
    // get authenticated user id
    const userID = JSON.parse(localStorage.getItem("user")).id;
    const items = this.getSellerItems(userID);
    items.then((data) => {
      this.items = data;
      console.log(data);
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
    closeEditForm() {
      this.ItemFormStore.setEditFormStatus(false);
      this.message = "Item updated successfully";
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
        const response = await axiosInstance.get(`/v1/sellers/${id}/items`);
        console.log("response", response);
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
    async generateUIS(item_id) {
      const response = await axiosInstance.get(`/v1/items/${item_id}/uis`);
      this.uis = response.data.uis;
      this.uisGenerated = true;
    },
  },
};
</script>

<template>
  <div>
    <BaseAlert>
      <template #title>
        <p class="font-bold">We make ordering much easier :)</p>
      </template>
      <template #description>
        <p class="text-sm">
          By generating a unique item serial (UIS), you can obtain a distinct
          identifier for your product that can be communicated to your client.
          This unique identifier allows you to track and manage the product
          across various channels, enabling you to request specific actions from
          your client related to the product.
        </p>
      </template>
    </BaseAlert>
    <BaseSweetAlert @close="uisGenerated = false" v-if="uisGenerated">
      <template #title> UIS is generated successfuly </template>
      <template #message>
        <p class="break-words" ref="contentToCopy">{{ getLink }}</p>
        <h6>Send To your client</h6>
        <a
          class="text-green-600 underline underline-offset-8"
          @click="copyContent"
          :href="getLink"
          >{{ linkText }}</a
        >
      </template>
    </BaseSweetAlert>
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
        <EditItemForm v-if="showEditItemForm" @close="closeEditForm" />
        <!-- show success message  -->
        <div
          v-if="message"
          class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Success!</strong>
          <span class="block sm:inline">{{ message }}</span>
          <button
            type="button"
            class="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span class="fa fa-times"></span>
          </button>
        </div>

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
              <td class="py-4 relative">
                <img
                  :src="itemImage(item.primary_image)"
                  class="w-20 h-20 object-cover rounded-md"
                  :class="item.status === 'suspended' ? 'opacity-50' : ''"
                />
                <div
                  v-if="item.status === 'suspended'"
                  class="absolute top-[45px]"
                >
                  <AccountStatus :status="item.status" />
                </div>
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.category_name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.views }}</td>
              <td>
                <div v-if="item.status !== 'suspended'" class="actions">
                  <button
                    class="border border-indigo-200 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-md router-link-active router-link-exact-active text-blue-600"
                    @click="editItem(item.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-gear"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
                      />
                      <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
                      />
                    </svg>
                  </button>
                  <button
                    class="border border-indigo-200 hover:bg-indigo-700 hover:text-white px-4 py-2 rounded-md router-link-active router-link-exact-active text-blue-600"
                    @click="generateUIS(item.id)"
                  >
                    generate UIS
                  </button>
                </div>
                <div v-else>no actions to take</div>
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
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  align-content: center;
  gap: 5px;
}
</style>
