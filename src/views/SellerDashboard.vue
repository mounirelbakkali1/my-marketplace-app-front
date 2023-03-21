<template>
  <!-- position relative in tailwind -->
  <div class="flex flex-col lg:flex-row min-h-screen relative">
    <!-- Sidebar -->
    <div
      class="fixed z-50 left-0 w-0 lg:w-64 h-screen bg-indigo-500 text-gray-100 overflow-hidden sidebar transition-all duration-10"
      :class="sidebarOpen ? 'w-[70px] md:w-64' : ''"
    >
      <div class="flex items-center justify-between mt-8 mx-6">
        <h1 class="text-2xl font-bold hidden md:block">Seller Dashboard</h1>
        <button
          class="lg:hidden text-gray-300 hover:text-white focus:outline-none focus:text-white"
          @click="toggleNav"
        >
          CS
        </button>
      </div>
      <div
        class="flex flex-col justify-center md:justify-between flex-grow mt-4"
      >
        <nav>
          <DashLink
            component="personalInfo"
            @updateCurrentComponent="updateCurrentComponent"
            :currentComponent="currentComponent"
          >
            <template #label> Personal Information </template>
          </DashLink>
          <DashLink
            component="productManagement"
            @updateCurrentComponent="updateCurrentComponent"
            :currentComponent="currentComponent"
          >
            <template #label> Product Management </template>
          </DashLink>
          <DashLink
            component="ordersAndSales"
            @updateCurrentComponent="updateCurrentComponent"
            :currentComponent="currentComponent"
          >
            <template #label> Orders and Sales </template>
          </DashLink>
          <DashLink
            component="statistics"
            @updateCurrentComponent="updateCurrentComponent"
            :currentComponent="currentComponent"
          >
            <template #label> Statistics </template>
          </DashLink>
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
    <div class="flex-1 bg-gray-100 main__content sm:ml-0 min-h-full">
      <div
        class="flex items-center justify-between px-6 bg-white border-b"
      ></div>
      <div class="px-4 py-4 md:px-6 md:py-6">
        <button
          class="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          @click="toggleNav"
        >
          OP
        </button>
        <div v-if="currentComponent === 'personalInfo'">
          <PersonalInfo :seller="sellerInfo" />
        </div>
        <div v-if="currentComponent === 'productManagement'">
          <h2 class="text-lg font-bold mb-4"></h2>
          <ItemManagement :items="items" />
        </div>
        <div v-if="currentComponent === 'ordersAndSales'">
          <Orders :orders="orders" />
        </div>
        <div v-if="currentComponent === 'statistics'">
          <Statistics />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInfo from "../components/seller/PersonalInfo.vue";
import ItemManagement from "../components/seller/ItemManagement.vue";
import Orders from "../components/seller/Orders.vue";
import Statistics from "../components/seller/Statistics.vue";
import DashLink from "../components/seller/DashLink.vue";
import axios from "axios";

export default {
  components: {
    PersonalInfo,
    ItemManagement,
    Orders,
    Statistics,
    DashLink,
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
        coverImage: "https://picsum.photos/1800",
        websiteUrl: "https://www.google.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl.",
      },
      items: null,
      // items: [
      //   {
      //     name: "Cat Food",
      //     category: "Food",
      //     price: 10.99,
      //     stock: 50,
      //     image: "https://picsum.photos/200",
      //   },
      //   {
      //     name: "Cat Toy",
      //     category: "Accessories",
      //     price: 5.99,
      //     stock: 100,
      //     image: "https://picsum.photos/200",
      //   },
      //   {
      //     name: "Cat Bed",
      //     category: "Accessories",
      //     price: 20.99,
      //     stock: 20,
      //     image: "https://picsum.photos/200",
      //   },
      //   {
      //     name: "Cat Food",
      //     category: "Food",
      //     price: 10.99,
      //     stock: 50,
      //     image: "https://picsum.photos/200",
      //   },
      //   {
      //     name: "Cat Toy",
      //     category: "Accessories",
      //     price: 5.99,
      //     stock: 100,
      //     image: "https://picsum.photos/200",
      //   },
      //   {
      //     name: "Cat Bed",
      //     category: "Accessories",
      //     price: 20.99,
      //     stock: 20,
      //     image: "https://picsum.photos/200",
      //   },
      // ],
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
      navbarHeight: 0,
    };
  },
  watch: {
    sidebarOpen(val) {
      this.updateMainLeftMargin();
      // this.updateSideBarTopMargin();
    },
  },
  mounted() {
    // retreive items from backend
    axios
      .get("http://localhost:8000/api/v1/items")
      .then((res) => (this.items = res.data.items))
      .then(() => console.table(this.items));
    // eveent linstner on sidebar width
    window.addEventListener("resize", () => {
      this.updateMainLeftMargin();
      // this.updateSideBarTopMargin();
    });
    this.updateMainLeftMargin();
    // this.updateSideBarTopMargin();
  },
  methods: {
    updateMainLeftMargin() {
      const sidebar = document.querySelector(".sidebar");
      const sidebarWidth = sidebar.getBoundingClientRect().width;
      const main = document.querySelector(".main__content");
      main.style.marginLeft = `${sidebarWidth}px`;
    },
    updateCurrentComponent(component) {
      this.currentComponent = component;
    },
    // updateSideBarTopMargin() {
    //   const navbar = document.querySelector(".navbar");
    //   const navbarHeight = navbar.getBoundingClientRect().height;
    //   const sidebar = document.querySelector(".sidebar");
    //   sidebar.style.top = `${navbarHeight}px`;
    // },
    toggleNav() {
      this.sidebarOpen = !this.sidebarOpen;
      setTimeout(() => {
        this.updateMainLeftMargin();
        // this.updateSideBarTopMargin();
      }, 110);
    },
  },
};
</script>

<style>
/* .sidebar {
  top: 8%;
} */
</style>
