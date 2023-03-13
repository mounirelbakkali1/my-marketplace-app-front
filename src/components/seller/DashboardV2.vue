<template>
  <!-- position relative in tailwind -->
  <div class="flex flex-col lg:flex-row min-h-screen">
    <!-- Sidebar -->
    <div
      class="fixed z-50 left-0 w-0 lg:w-64 h-screen bg-indigo-500 text-gray-100 overflow-hidden transition-all duration-300 sidebar"
      :class="sidebarOpen ? 'w-[70px] md:w-64' : ''"
    >
      <div class="flex items-center justify-between mt-8 mx-6">
        <h1 class="text-2xl font-bold hidden md:block">Seller Dashboard</h1>
        <button
          class="lg:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white"
          @click="sidebarOpen = !sidebarOpen"
        >
          CS
        </button>
      </div>
      <div
        class="flex flex-col justify-center md:justify-between flex-grow mt-4"
      >
        <nav>
          <a
            class="flex items-center justify-center md:justify-start md:px-6 py-6 text-gray-300 hover:bg-blue-500 hover:text-white"
            href="#"
            :class="{ 'bg-blue-500': currentComponent === 'personalInfo' }"
            @click="currentComponent = 'personalInfo'"
          >
            <i class="fas fa-user-circle mr-0 md:mr-3"></i>
            <span class="hidden md:block">Personal Information</span>
          </a>
          <a
            class="flex items-center justify-center md:justify-start md:px-6 py-6 text-gray-300 hover:bg-blue-500 hover:text-white"
            href="#"
            :class="{
              'bg-blue-500': currentComponent === 'productManagement',
            }"
            @click="currentComponent = 'productManagement'"
          >
            <i class="fas fa-user-circle mr-0 md:mr-3"></i>
            <span class="hidden md:block">Product Management</span>
          </a>
          <a
            class="flex items-center justify-center md:justify-start md:px-6 py-6 text-gray-300 hover:bg-blue-500 hover:text-white"
            href="#"
            :class="{ 'bg-blue-500': currentComponent === 'ordersAndSales' }"
            @click="currentComponent = 'ordersAndSales'"
          >
            <i class="fas fa-user-circle mr-0 md:mr-3"></i>
            <span class="hidden md:block">Orders and Sales</span>
          </a>
          <a
            class="flex items-center justify-center md:justify-start md:px-6 py-6 text-gray-300 hover:bg-blue-500 hover:text-white"
            href="#"
            :class="{ 'bg-blue-500': currentComponent === 'statistics' }"
            @click="currentComponent = 'statistics'"
          >
            <i class="fas fa-user-circle mr-0 md:mr-3"></i>
            <span class="hidden md:block">Statistics</span>
          </a>
        </nav>
        <div class="flex items-center p-4 justify-center md:justify-around">
          <button
            class="flex items-center justify-center p-2 md:px-6 py-2 bg-blue-500 bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-blue-500"
          >
            <i class="fas fa-user-circle mr-0 md:mr-3"></i>
            <span class="hidden md:block">Log Out</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div class="flex-1 bg-gray-100 mt-[75px] main__content sm:ml-0 min-h-full">
      <div
        class="flex items-center justify-between px-6 bg-white border-b"
      ></div>
      <div class="px-4 py-4 md:px-6 md:py-6">
        <button
          class="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600 relative z-[100]"
          @click="sidebarOpen = !sidebarOpen"
        >
          OP
        </button>
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
      sidebarOpen: false,
      sidebarWidth: 0,
    };
  },
  watch: {
    sidebarWidth(value) {
      this.updateWidth(value);
    },
  },
  mounted() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth);
  },
  methods: {
    updateWidth() {
      const sidebar = document.querySelector(".sidebar");
      const sidebarWidth = sidebar.getBoundingClientRect().width;
      const main = document.querySelector(".main__content");
      main.style.marginLeft = `${sidebarWidth}px`;
    },
  },
};
</script>

<style>
.sidebar {
  top: 8%;
}
</style>
