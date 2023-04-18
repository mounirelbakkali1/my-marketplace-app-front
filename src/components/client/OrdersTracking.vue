<script>
import { useOrderStore } from "@/stores/OrderStore";
import AccountStatus from "../AccountStatus.vue";
export default {
  data() {
    return {
      orderStore: useOrderStore(),
      orderedItems: [],
    };
  },
  methods: {
    async getOrderedItems() {
      const id = JSON.parse(localStorage.getItem("user")).id;
      await this.orderStore.retreiveOrdersOfBuyer(id);
      this.orderedItems = this.orderStore.orders;
    },
    itemImage(image) {
      // if source starts with https, return source
      if (image != null && image.startsWith("https")) {
        return image;
      } else {
        return `http://localhost:8000/images/${image}`;
      }
    },
  },
  mounted: async function () {
    await this.getOrderedItems();
  },
  components: { AccountStatus },
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="w-full max-w-screen-lg mx-auto mt-8"
      v-if="orderedItems.length != 0"
    >
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Orders #{{ orderId }}
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            last order placed on {{ orderedItems[0]?.create_at_for_humman }}
          </p>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0 overflow-auto h-100 scroll">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div
              v-for="(order, index) in orderedItems"
              :key="index"
              class="px-6"
            >
              <div class="flex items-center mb-4">
                <img
                  :src="itemImage(order.order_items[0]?.item?.primary_image)"
                  alt="Product Image"
                  class="w-16 h-16 object-cover mr-4"
                />
                <div class="px-4 py-4 sm:px-6 flex justify-between flex-1">
                  <div>
                    <dt class="text-sm text-gray-500 font-bold">
                     {{ order.order_items[0]?.item?.name }}
                    </dt>
                    <dd class="mt-1 text-sm text-green-400">
                      {{ order.create_at_for_humman }}
                    </dd>
                    <dd class="mt-1 text-sm text-gray-900">
                       Delivered To : {{ order.shipping_info.name }}
                    </dd>
                </div>
                <dd class="mt-1 text-sm text-gray-900">
                      <dd class="mt-1 text-sm text-gray-900 mb-3">
                        <p>Total to pay :</p>
                        <p class="font-bold">{{ order.order_items[0].item.price }} DH</p> 
                      </dd>
                    <AccountStatus :status="order.status" />
                  </dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll{
    max-height: 70vh;
}
  .scroll::-webkit-scrollbar {
    width: 10px;
    height: 20px;
  }

  .scroll::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #edf0f7;
  }

  .scroll::-webkit-scrollbar-thumb {
    background: #7ba6eb;
    border-radius: 100vh;
    border: 3px solid #edf2f7;
  }

  .scroll::-webkit-scrollbar-thumb:hover {
    background: #75baf9;
  }

</style>
