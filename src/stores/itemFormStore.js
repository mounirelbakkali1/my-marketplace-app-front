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
    EditFormStatus: false,
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
    setEditFormStatus(FormStatus) {
      this.EditFormStatus = FormStatus;
    },
    reset() {
      this.item = null;
      this.itemForm = null;
      this.isFormShowen = false;
      this.itemFormErrors = null;
      this.itemFormSuccess = null;
      this.itemFormLoading = false;
    },
    addItem() {
      this.itemFormLoading = true;
      // set axios headers
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      axios
        .post("http://localhost:8000/api/v1/items", this.item, {
          headers: {
            "Content-Type": "multipart/form-data", // this is the important part
          },
        })
        .then((response) => {
          console.log(response);
          this.itemFormSuccess = response.data;
          this.itemFormLoading = false;
          this.reset();
        })
        .catch((error) => {
          console.log(error);
          this.itemFormErrors = error.response.data;
          this.itemFormLoading = false;
        });
    },
    updateItem() {
      this.itemFormLoading = true;
      // set axios headers
      console.log("updated ", this.item);

      axios
        .put(`http://localhost:8000/api/v1/items/${this.item.id}`, this.item, {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          this.itemFormSuccess = response.data;
          this.itemFormLoading = false;
          this.reset();
        })
        .catch((error) => {
          console.log(error);
          this.itemFormErrors = error.response.data;
          this.itemFormLoading = false;
        });
    },
    async retreiveItem(id) {
      // set axios headers
      const response = await axios
        .get(
          `http://localhost:8000/api/v1/items/${id}/details`,
          {},
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data", // this is the important part
            },
          }
        )
        .catch((error) => {
          console.log(error);
        });
      this.item = response.data.item;
      // console.log(this.item);
      return response.data.item;
    },
  },
  getters: {
    getItem() {
      return this.item;
    },
    getFormStatus() {
      return this.isFormShowen;
    },
    getEditFormStatus() {
      return this.EditFormStatus;
    },
  },
});
