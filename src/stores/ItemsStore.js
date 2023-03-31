import { defineStore } from "pinia";

export const useItemsStore = defineStore("ItemsStore", {
  // state: () => ({
  //   items: null,
  //   item: null,
  // }),
  // actions: {
  //   setItems(items) {
  //     this.items = items;
  //   },
  //   setItem(item) {
  //     this.item = item;
  //   },
  //   async getItems() {
  //     try {
  //       const response = await axios.get("http://localhost:8000/items");
  //       this.items = response.data;
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   // async getItem(id) {
  //   //   try {
  //   //     const response = await axios.get(`http://localhost:8000/items/${id}`);
  //   //     this.item = response.data;
  //   //   } catch (error) {
  //   //     throw error;
  //   //   }
  //   // },
  //   async addItem(item) {
  //     try {
  //       const response = await axios.post("http://localhost:8000/items", item);
  //       this.items.push(response.data);
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   async updateItem(item) {
  //     try {
  //       const response = await axios.put(
  //         `http://localhost:8000/items/${item.id}`,
  //         item
  //       );
  //       this.items = this.items.map((i) =>
  //         i.id === item.id ? response.data : i
  //       );
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   async deleteItem(id) {
  //     try {
  //       await axios.delete(`http://localhost:8000/api/v1/items/${id}`);
  //       this.items = this.items.filter((i) => i.id !== id);
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   // async getItemsOfSeller(id) {
  //   //   try {
  //   //     const response = await axios.get(
  //   //       `http://localhost:8000/api/v1/sellers/${id}/items`,
  //   //       {
  //   //         Headers: {
  //   //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //   //         },
  //   //       }
  //   //     );
  //   //     this.setItems(response);
  //   //   } catch (error) {
  //   //     throw error;
  //   //   }
  //   // },
  // },
  // getters: {
  //   getItems() {
  //     return this.items;
  //   },
  //   getItem() {
  //     return this.item;
  //   },
  // },
});
