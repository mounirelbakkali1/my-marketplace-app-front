import { defineStore } from "pinia";
import axiosInstance from "../api/axios";

export const useItemsStore = defineStore("ItemsStore", {
  state: () => ({
    items: [],
    item: {},
    itemsOfSeller: [],
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
        this.item = response.data;
      } catch (error) {
        throw error;
      }
    },
    async suspendAnItem(id) {
      try {
        await axiosInstance.post(`/v1/management/items/${id}/suspend`);
        this.items = this.items.filter((i) => i.id !== id);
      } catch (error) {
        throw error;
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
