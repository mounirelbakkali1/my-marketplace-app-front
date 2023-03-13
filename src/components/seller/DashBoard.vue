<template>
  <div class="flex flex-row h-screen">
    <div class="bg-gray-200 w-1/4 p-4">
      <h2 class="text-lg font-bold mb-4">Seller Dashboard</h2>
      <div class="flex flex-col">
        <button
          class="py-2 px-4 mb-2 rounded-lg bg-white hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-300': currentComponent === 'personalInfo' }"
          @click="currentComponent = 'personalInfo'"
        >
          Personal Information
        </button>
        <button
          class="py-2 px-4 mb-2 rounded-lg bg-white hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-300': currentComponent === 'productManagement' }"
          @click="currentComponent = 'productManagement'"
        >
          Product Management
        </button>
        <button
          class="py-2 px-4 mb-2 rounded-lg bg-white hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-300': currentComponent === 'ordersAndSales' }"
          @click="currentComponent = 'ordersAndSales'"
        >
          Orders and Sales
        </button>
        <button
          class="py-2 px-4 mb-2 rounded-lg bg-white hover:bg-gray-300 focus:outline-none"
          :class="{ 'bg-gray-300': currentComponent === 'statistics' }"
          @click="currentComponent = 'statistics'"
        >
          Statistics
        </button>
      </div>
    </div>
    <div class="flex-1 p-4">
      <div v-if="currentComponent === 'personalInfo'">
        <!-- Personal Information component content -->
        <PersonalInfo :seller="sellerInfo" />
      </div>
      <div v-if="currentComponent === 'productManagement'">
        <h2 class="text-lg font-bold mb-4"></h2>
        <!-- Product Management component content -->
        <ItemManagement :items="items" />
      </div>
      <div v-if="currentComponent === 'ordersAndSales'">
        <!-- Orders and Sales component content -->
        <Orders :orders="orders" />
      </div>
      <div v-if="currentComponent === 'statistics'">
        <!-- Statistics component content -->
        <Statistics />
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInfo from "./PersonalInfo.vue";
import ItemManagement from "./ItemManagement.vue";
import Orders from "./Orders.vue";
import Statistics from "./Statistics.vue";
export default {
  components: {
    PersonalInfo,
    ItemManagement,
    Orders,
    Statistics,
  },
  data() {
    return {
      currentComponent: "personalInfo",
      sellerInfo: {
        id: "ET1234",
        name: "John Doe",
        email: "joh-doe@gmail.com",
        phone: "123456789",
        address: "1234 Main St",
        city: "San Francisco",
        state: "CA",
        zipCode: "94111",
        image: "https://picsum.photos/200",
        joinDate: "2020-01-01",
        otherInfo:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl.",
        coverImage: "https://picsum.photos/200",
        websiteUrl: "https://www.google.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl.",
      },
      items: [
        {
          name: "Cat Food",
          category: "Food",
          price: 10.99,
          stock: 50,
          image: "https://picsum.photos/200",
        },
        {
          name: "Cat Toy",
          category: "Accessories",
          price: 5.99,
          stock: 100,
          image: "https://picsum.photos/200",
        },
        {
          name: "Cat Bed",
          category: "Accessories",
          price: 20.99,
          stock: 20,
          image: "https://picsum.photos/200",
        },
        {
          name: "Cat Food",
          category: "Food",
          price: 10.99,
          stock: 50,
          image: "https://picsum.photos/200",
        },
        {
          name: "Cat Toy",
          category: "Accessories",
          price: 5.99,
          stock: 100,
          image: "https://picsum.photos/200",
        },
        {
          name: "Cat Bed",
          category: "Accessories",
          price: 20.99,
          stock: 20,
          image: "https://picsum.photos/200",
        },
      ],
      orders: [
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
      ],
    };
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
