<script>
import { useItemFormStore } from "@/stores/itemFormStore";
export default {
  name: "ItemFormTemplate",
  props: {
    newItem: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
  },
  emit: ["action", "delete"],
  data() {
    return {
      ItemStore: useItemFormStore(),
    };
  },
  methods: {
    action() {
      this.$emit("action", this.newItem);
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.newItem.primary_image = files[0];
    },
    cancle() {
      this.ItemStore.reset();
    },
    deleteItem() {
      this.$emit("delete");
    },
  },
  computed: {
    loading() {
      return this.ItemStore.itemFormLoading;
    },
  },
};
</script>

<template>
  <div>
    <h2 class="text-2xl p-2">
      <slot name="title" default="Add new Item to store"></slot>
    </h2>
    <!-- max-w-lg -->
    <form class="w-full" @submit.prevent="action">
      <div class="flex flex-wrap gap-[2%]">
        <div class="w-50">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Name
              </label>
              <input
                v-model="newItem.name"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Price
              </label>
              <input
                v-model="newItem.price"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="number"
                step="0.01"
                placeholder="Price"
                required
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Description
              </label>
              <textarea
                v-model="newItem.description"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Description"
                required
              ></textarea>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Category
              </label>
              <select
                v-model="newItem.category_id"
                required
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="1">Food</option>
                <option value="2">Accessories</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Primary Image
              </label>
              <input
                type="file"
                @change="onFileChange"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Images
              </label>
              <input
                type="file"
                multiple
                @change="onFileChange"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
        </div>
        <div class="w-50">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Stock
              </label>
              <input
                v-model="newItem.stock"
                required
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                type="number"
                placeholder="stock"
                min="0"
              />
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Size
              </label>
              <input
                v-model="newItem.size"
                required
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                placeholder="width,hight (25,50)"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Colors
              </label>
              <textarea
                v-model="newItem.color"
                required
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="color"
              ></textarea>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Status
              </label>
              <select
                v-model="newItem.status"
                required
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="available">available</option>
                <option value="sold">sold</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Condition
              </label>
              <select
                v-model="newItem.condition"
                required
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="new">new</option>
                <option value="like_new">like new</option>
                <option value="good">good</option>
              </select>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-password"
              >
                Collection
              </label>

              <select
                v-model="newItem.collection_id"
                required
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option value="1">Dog</option>
                <option value="2">Cat</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="flex w-full px-3">
          <button
            class="bg-indigo-500 text-white px-4 py-2 rounded-md"
            type="submit"
          >
            <slot name="submitText"></slot>
          </button>
          <div style="align-self: center; margin-left: 5px" v-if="loading">
            <img
              src="../../../loading-gif.gif"
              alt="loading"
              height="20"
              width="20"
            />
          </div>
          <button
            v-if="type && type === 'edit'"
            class="bg-red-500 text-white px-4 py-2 rounded-md ml-2"
            type="button"
            @click="deleteItem"
          >
            Delete
          </button>
          <button
            class="bg-gray-200 px-4 py-2 rounded-md text-indigo-600 text-white ml-2"
            type="button"
            style="color: #7f81ed"
            @click="cancle"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
