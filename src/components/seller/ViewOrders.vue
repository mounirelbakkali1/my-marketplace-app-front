<template>
  <div class="flex flex-col md:flex-row justify-between w-full h-full">
    <div class="w-full md:w-1/4 bg-gray-100 py-6 px-4">
      <h2 class="text-2xl font-bold mb-4">Orders and Sales</h2>
      <div class="mb-4">
        <button
          class="px-4 py-2 w-full rounded-full bg-blue-500 text-white font-bold"
        >
          All Orders
        </button>
      </div>
      <div class="mb-4">
        <button
          class="px-4 py-2 w-full rounded-full bg-yellow-200 text-white font-bold"
        >
          Pending Orders
        </button>
      </div>
      <div class="mb-4">
        <button
          class="px-4 py-2 w-full rounded-full bg-green-500 text-white font-bold"
        >
          Confirmed Orders
        </button>
      </div>
      <div class="mb-4">
        <button
          class="px-4 py-2 w-full rounded-full bg-indigo-600 text-white font-bold"
        >
          Delivered Orders
        </button>
      </div>
    </div>
    <div class="w-full md:w-3/4 p-4">
      <h2 class="text-2xl font-bold mb-4">Ordered Items</h2>
      <div class="overflow-x-auto">
        <div class="p-5" v-if="order">
          <div class="flex justify-between">
            <div class="flex">
              <div class="w-10 h-10 mr-3">
                <img
                  class="w-full h-full rounded-full"
                  :src="getImage(order.user.image)"
                  alt="complaint img"
                />
              </div>
              <div>
                <p class="text-gray-900 font-bold text-xl leading-none mb-2">
                  {{ order.shipping_info.name }}
                </p>
                <p class="text-gray-600 text-sm font-bold">
                  {{ order.user.email }}
                </p>
                <p class="text-gray-600 text-sm">
                  <b>street &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; :</b>
                  {{ order.shipping_info.address.street }}
                </p>
                <p class="text-gray-600 text-sm">
                  <b
                    >city
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b
                  >
                  {{ order.shipping_info.address.city }}
                </p>
                <p class="text-gray-600 text-sm">
                  <b>zip code&nbsp;&nbsp; :</b>
                  {{ order.shipping_info.address.zip_code }}
                </p>
              </div>
            </div>
            <div class="flex h-10">
              <button
                class="px-4 py-1 rounded-full bg-green-500 text-white"
                @click="confirm(order.id)"
                v-if="order.status === 'pending'"
              >
                Confirm
              </button>
              <button
                v-if="order.status === 'confirmed'"
                class="px-4 py-1 rounded-full bg-red-500 text-white"
                @click="cancel(order.id)"
              >
                Cancel
              </button>
              <button
                class="px-4 py-1 rounded-full bg-indigo-600 text-white"
                v-if="order.status === 'confirmed'"
                @click="makeDelivered(order.id)"
              >
                delivered
              </button>
              <button
                class="px-4 py-1 rounded-full bg-blue-600 text-white"
                v-if="
                  order.status === 'delivered' || order.status === 'cancelled'
                "
                @click="viewStock(order.id)"
              >
                view stock
              </button>
            </div>
          </div>
          <div class="mt-4">additional note:</div>
        </div>
        <table class="table-auto border-collapse w-full">
          <thead>
            <tr class="text-left bg-gray-100">
              <th class="py-2 px-4 border">Order ID</th>
              <th class="py-2 px-4 border">Item Name</th>
              <th class="py-2 px-4 border">Quantity</th>
              <th class="py-2 px-4 border">Date</th>
              <th class="py-2 px-4 border">Status</th>
              <th class="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="hover:bg-gray-200" v-for="order in orders">
              <td class="py-2 px-4 border">00{{ order.id }}</td>
              <td class="py-2 px-4 border">
                {{ order.order_items[0].item.name }}
              </td>
              <td class="py-2 px-4 border">
                {{ order.order_items[0].quantity }}
              </td>
              <td class="py-2 px-4 border">
                {{ order.create_at_for_humman }}
              </td>
              <td class="py-2 px-4 border">
                <AccountStatus :status="order.status" />
              </td>
              <td class="py-2 px-4 border flex justify-center">
                <button @click="viewOrder(order)">
                  <img src="../../../view.png" alt="" width="20" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { useOrderStore } from "@/stores/OrderStore";
import AccountStatus from "../AccountStatus.vue";
export default {
  name: "Orders",
  components: { AccountStatus },
  data() {
    return {
      isChecked: false,
      orderStore: useOrderStore(),
      orders: [],
      order: null,
    };
  },
  methods: {
    async getOrders() {
      const id = JSON.parse(localStorage.getItem("user")).id;
      await this.orderStore.retreiveOrdersOfSeller(id);
      this.orders = this.orderStore.orders;
    },
    viewOrder(order) {
      this.order = order;
    },
    async confirm(id) {
      await this.orderStore.confirmOrder(id);
      this.order = null;
      this.getOrders();
    },
    async cancel(id) {
      await this.orderStore.cancelOrder(id);
      this.order = null;
      this.getOrders();
    },
    async makeDelivered(id) {
      await this.orderStore.deliverOrder(id);
      this.order = null;
      this.getOrders();
    },
    getImage(image) {
      return `../../../client.png`;
    },
  },
  mounted() {
    this.getOrders();
  },
  components: { AccountStatus },
};
</script>
