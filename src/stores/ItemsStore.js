import { defineStore } from "pinia";
import axiosInstance from "../api/axios";

export const useItemsStore = defineStore("ItemsStore", {
  state: () => ({
    items: [],
    item: {},
    itemsOfSeller: [],
    errors: {},
  }),
  actions: {
    async getRecentItems() {
      try {
        const response = await axiosInstance.get("/v1/management/items");
        console.log("response from store", response);
        this.items = response.data.items;
        console.log("recent items from store", this.items);
      } catch (error) {
        throw error;
      }
    },
    async retreiveItem(id) {
      try {
        const response = await axiosInstance.get(`/v1/items/${id}/details`);
        this.item = response.data.item;
        return this.item;
      } catch (error) {
        throw error;
      }
    },
    async blockItem(id) {
      try {
        await axiosInstance.post(`/v1/management/items/${id}/suspend`);
        this.errors = {};
      } catch (error) {
        this.errors = error.response.data;
      }
    },
    async unblockItem(id) {
      try {
        await axiosInstance.post(`/v1/management/items/${id}/unsuspend`);
        this.errors = {};
      } catch (error) {
        this.errors = error.response.data;
      }
    },
    async getItemsOfSeller(id) {
      try {
        const response = await axiosInstance.get(`/v1/sellers/${id}/items`);
        this.itemsOfSeller = response.data.items;
      } catch (error) {
        throw error;
      }
    },
  },
});
