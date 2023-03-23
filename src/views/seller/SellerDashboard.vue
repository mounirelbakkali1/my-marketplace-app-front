<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
import DashLink from "@/components/DashLink.vue";
import PersonalInfo from "@/components/seller/PersonalInfo.vue";
import ItemManagement from "@/components/seller/ItemManagement.vue";
import Orders from "@/components/seller/Orders.vue";
import Statistics from "@/components/seller/Statistics.vue";
import axios from "axios";
export default {
  components: {
    DashboardTemplate,
    DashLink,
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
        coverImage: "https://picsum.photos/1800",
        websiteUrl: "https://www.google.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl.",
      },
      items: null,
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
  mounted() {
    axios
      .get("http://localhost:8000/api/v1/items")
      .then((res) => (this.items = res.data.items))
      .then(() => console.table(this.items));
  },
  methods: {
    updateCurrentComponent(component) {
      this.currentComponent = component;
    },
  },
};
</script>

<template>
  <DashboardTemplate>
    <template #title>Seller Dashboard</template>
    <template #links>
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
    </template>
    <template #main>
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
    </template>
  </DashboardTemplate>
</template>
