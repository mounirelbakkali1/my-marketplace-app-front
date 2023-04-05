import { defineStore } from "pinia";
import axios from "axios";
export const useSellerStore = defineStore({
  id: "seller",
  state: () => ({
    sellers: [],
    seller: {},
    sellerFormSuccess: false,
    sellerFormErrors: [],
    sellerFormLoading: false,
    sellerFormSuccessMessage: "",
    sellerFormErrorMessage: "",
  }),
  getters: {},
  actions: {
    async retreiveSellers(page) {
      // get all sellers from the base-end
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/sellers`
        );
        this.sellers = response.data.sellers;
        return this.sellers;
      } catch (error) {
        this.sellerFormErrors = error.response.data;
      }
    },
    async getSeller(id) {
      // get a seller from the base-end
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/sellers/${id}`
        );
        this.seller = response.data.seller;
      } catch (error) {
        this.sellerFormErrors = error.response.data;
      }
    },
  },
});
