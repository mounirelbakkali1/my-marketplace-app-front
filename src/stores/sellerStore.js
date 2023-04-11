import { defineStore } from "pinia";
import axiosInstance from "../api/axios";

export const useSellerStore = defineStore({
  id: "seller",
  state: () => ({
    sellers: [],
    seller: null,
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
        const response = await axiosInstance.get(`/v1/sellers`);
        this.sellers = response.data.sellers;
        return this.sellers;
      } catch (error) {
        this.sellerFormErrors = error.response.data;
      }
    },
    async suspendSeller(id) {
      try {
        await axiosInstance.post(`/v1/management/sellers/${id}/suspend`);
        // this.sellers = this.sellers.filter((s) => s.id !== id);
      } catch (error) {
        this.sellerFormErrors = error.response.data;
      }
    },
    async getSeller(id) {
      // get a seller from the base-end
      try {
        const response = await axiosInstance.get(`/v1/sellers/${id}/info`);
        this.seller = response.data.seller;
        return this.seller;
      } catch (error) {
        this.sellerFormErrors = error.response.data;
      }
    },
  },
});
