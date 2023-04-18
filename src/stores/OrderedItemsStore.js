import { defineStore } from "pinia";

export const useOrderedItemsStore = defineStore("OrderedItemsStore", {
  state: () => ({
    orderedItems: [],
  }),
  actions: {
    addToOrderedItems(item) {
      this.orderedItems.push(item);
    },
    isOrdered(item_id) {
      // check if id is already in the orderedItems ids array
      return this.orderedItems.includes(item_id);
    },
  },
  persist: {
    enabled: true,
  },
});
