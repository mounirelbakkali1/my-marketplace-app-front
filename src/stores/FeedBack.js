import { defineStore } from "pinia";

export const useFeedBack = defineStore("FeedBack", {
  state: () => ({
    itemsRatedByUser: [],
  }),
  actions: {
    addToItemsRatedByUser(item) {
      this.itemsRatedByUser.push(item);
    },
  },
  getters: {
    getItemsRatedByUser() {
      return this.itemsRatedByUser;
    },
  },
});
