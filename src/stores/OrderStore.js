import { defineStore } from "pinia";
import axiosInstance from "../api/axios";
import { useAuthStore } from "./AuthStore";

export const useOrderStore = defineStore("OrderStore", {
  state: () => ({
    orders: [],
    order: {},
    orderErrors: {},
    orderSuccess: false,
    orderLoading: false,
  }),
  actions: {
    async retreiveOrders() {
      try {
        const response = await axiosInstance.get("/v1/orders");
        this.orders = response.data.orders;
      } catch (error) {
        throw error;
      }
    },
    async retreiveOrder(id) {
      try {
        const response = await axiosInstance.get(`/v1/orders/${id}`);
        this.order = response.data.order;
        return this.order;
      } catch (error) {
        throw error;
      }
    },
    async retreiveOrdersOfSeller(id) {
      try {
        const response = await axiosInstance.get(`/v1/sellers/${id}/commandes`);
        this.orders = response.data.orders;
      } catch (error) {
        throw error;
      }
    },
    async retreiveOrdersOfBuyer(id) {
      try {
        const response = await axiosInstance.get(`/v1/customer/${id}/orders`);
        this.orders = response.data.orders;
      } catch (error) {
        throw error;
      }
    },
    async confirmOrder(id) {
      try {
        await axiosInstance.post(`/v1/sellers/commandes/${id}/confirm`);
        this.orderErrors = {};
        this.orderSuccess = true;
      } catch (error) {
        this.orderErrors = error.response.data;
        this.orderSuccess = false;
      }
    },
    async cancelOrder(id) {
      try {
        await axiosInstance.post(`/v1/sellers/commandes/${id}/cancel`);
        this.orderErrors = {};
        this.orderSuccess = true;
      } catch (error) {
        this.orderErrors = error.response.data;
        this.orderSuccess = false;
      }
    },
    async deliverOrder(id) {
      try {
        await axiosInstance.post(`/v1/sellers/commandes/${id}/deliver`);
        this.orderErrors = {};
        this.orderSuccess = true;
      } catch (error) {
        this.orderErrors = error.response.data;
        this.orderSuccess = false;
      }
    },
  },
  modules: {
    useAuthStore,
  },
});
