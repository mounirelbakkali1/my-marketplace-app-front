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
import SellerActivities from "../components/seller/SellerActivities.vue";
import axiosInstance from "../api/axios";
import { useAuthStore } from "../stores/AuthStore";
import { nextTick } from "vue";

let currentUser = null;

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
        {
          path: "my-activities",
          name: "sellerActivities",
          component: SellerActivities,
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
      component: () => import("../views/ItemDetails.vue"),
    },
    {
      path: "/related/details/:id",
      name: "related-details",
      redirect: { name: "details" },
    },
  ],
});

const isAdmin = () => {
  return currentUser.role === "admin";
};

const isSeller = () => {
  return currentUser.role === "seller";
};

const isEmployee = () => {
  return currentUser.role === "employee";
};

const isGuest = () => {
  return !currentUser.isAuthenticated;
};
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  currentUser = auth.currentUser;
  console.log("Current user: ", currentUser);
  console.log("is admin: ", isAdmin());
  console.log("is seller: ", isSeller());
  console.log("is employee: ", isEmployee());
  console.log("is guest: ", isGuest());
  console.log("to: ", to.path.startsWith("/admin"));
  console.log("is admin: ", isAdmin() && to.path.startsWith("/admin"));

  if (to.meta.requiresAuth && isAdmin() && to.path.startsWith("/admin")) {
    console.log("from 1");
    next();
  } else if (
    to.meta.requiresAuth &&
    isSeller() &&
    to.path.startsWith("/seller")
  ) {
    next();
  } else if (
    to.meta.requiresAuth &&
    isEmployee() &&
    to.path.startsWith("/employee")
  ) {
    next();
  } else if (isGuest() && to.path.startsWith("/login")) {
    next();
  } else if (to.meta.requiresAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
