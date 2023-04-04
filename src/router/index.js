import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SellerDashboard from "../components/seller/SellerDashboard.vue";
import PersonalInfo from "../components/seller/PersonalInfo.vue";
import Login from "../views/Login.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import EmployeeDashboard from "../views/employee/EmployeeDashboard.vue";
import Logout from "../views/Logout.vue";
import Profil from "../components/seller/Profil.vue";
import ItemManagement from "../components/seller/ItemManagement.vue";
import Orders from "../components/seller/Orders.vue";
import EditProfil from "../components/seller/EditProfil.vue";
import axios from "axios";
const router = createRouter({
  // Html 5 mode
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      // optional parameter
      path: "/login",
      name: "login",
      component: Login,
      params: true,
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/seller",
      name: "seller",
      component: PersonalInfo,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "sellerDefault",
          redirect: { name: "sellerProfile" },
        },
        {
          path: "dashboard",
          name: "sellerDashboard",
          component: SellerDashboard,
        },
        {
          path: "profile",
          name: "sellerProfile",
          component: Profil,
        },
        {
          path: "profile/edit",
          name: "sellerProfileEdit",
          component: EditProfil,
        },
        {
          path: "products",
          name: "sellerProducts",
          component: ItemManagement,
        },
        {
          path: "orders",
          name: "sellerOrders",
          component: Orders,
        },
      ],
    },
    {
      path: "/seller/join",
      name: "create-seller",
      component: () => import("../views/CreateSellerAccount.vue"),
    },
    {
      path: "/admin/dashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/employee/dashboard",
      name: "EmployeeDashboard",
      component: EmployeeDashboard,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/ChatFrame.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/details/:id",
      name: "details",
      component: () => import("../views/Details.vue"),
    },
    {
      path: "/related/details/:id",
      name: "related-details",
      redirect: { name: "details" },
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    // try {
    //   const response = await axios.post("http://localhost:8000/api/ping", "", {
    //     headers: {
    //       "X-Requested-With": "XMLHttpRequest",
    //     },
    //     withCredentials: true,
    //   });
    //   console.log(response);
    //   if (!response.data) {
    //     return {
    //       name: "login",
    //       query: { redirect: to.fullPath },
    //     };
    //   }
    // } catch (error) {
    //   return {
    //     name: "login",
    //     query: { redirect: to.fullPath },
    //   };
    // }
  }
});

export default router;
