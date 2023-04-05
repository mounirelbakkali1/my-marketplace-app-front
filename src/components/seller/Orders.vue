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
          class="px-4 py-2 w-full rounded-full bg-blue-500 text-white font-bold"
        >
          Pending Orders
        </button>
      </div>
      <div class="mb-4">
        <button
          class="px-4 py-2 w-full rounded-full bg-blue-500 text-white font-bold"
        >
          Completed Orders
        </button>
      </div>
    </div>
    <div class="w-full md:w-3/4 p-4">
      <h2 class="text-2xl font-bold mb-4">Ordered Items</h2>
      <div class="overflow-x-auto">
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
              <td class="py-2 px-4 border">001</td>
              <td class="py-2 px-4 border">Pet Food</td>
              <td class="py-2 px-4 border">2</td>
              <td class="py-2 px-4 border">2</td>
              <td class="py-2 px-4 border">Pending</td>
              <td class="py-2 px-4 border">
                <input
                  type="checkbox"
                  class="form-checkbox h-5 w-5 text-blue-600"
                  v-model="isChecked"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
let orders = [
  {
    id: 1,
    name: "John Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  // add more orders here
  {
    id: 2,
    name: "Jane Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 3,
    name: "John Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 4,
    name: "Jane Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 5,
    name: "John Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 6,
    name: "Jane Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 7,
    name: "John Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 8,
    name: "Jane Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 9,
    name: "John Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 10,
    name: "Jane Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 11,
    name: "John Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 12,
    name: "Jane Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
  {
    id: 13,
    name: "John Doe",
    date: "2020-01-01",
    status: "Pending",
    quantity: 1,
  },
];
export default {
  name: "Orders",
  props: {
    orders: Object,
    required: true,
    default: orders,
  },
  data() {
    return {
      isChecked: false,
    };
  },
};
</script>
