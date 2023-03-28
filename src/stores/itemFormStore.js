import { defineStore } from "pinia";

export const useItemFormStore = defineStore("ItemFormStore", {
  state: () => ({
    item: null,
    itemForm: null,
    isFormShowen: false,
    itemFormErrors: null,
    itemFormSuccess: null,
    itemFormLoading: false,
  }),
  actions: {
    setItem(item) {
      this.item = item;
    },
    setItemForm(itemForm) {
      this.itemForm = itemForm;
    },
    setFormStatus(isFormShowen) {
      this.isFormShowen = isFormShowen;
    },
  },
  getters: {
    getItem() {
      return this.item;
    },
    getFormStatus() {
      return this.isFormShowen;
    },
  },
});
