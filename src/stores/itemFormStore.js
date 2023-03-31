import { defineStore } from "pinia";
import axios from "axios";
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
    addItem(item) {
      this.itemFormLoading = true;
      // set axios headers
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      axios
        .post("http://localhost:8000/api/v1/items", item, {
          headers: {
            "Content-Type": "multipart/form-data", // this is the important part
          },
        })
        .then((response) => {
          console.log(response);
          this.itemFormSuccess = response.data;
          this.itemFormLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.itemFormErrors = error.response.data;
          this.itemFormLoading = false;
        });
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
