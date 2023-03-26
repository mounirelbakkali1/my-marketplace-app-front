import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SellerDashboard from "../views/seller/SellerDashboard.vue";
import Login from "../views/Login.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import EmployeeDashboard from "../views/employee/EmployeeDashboard.vue";
import Logout from "../views/Logout.vue";
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
      path: "/seller/dashboard",
      name: "sellerDashboard",
      component: SellerDashboard,
      meta: {
        requiresAuth: true,
      },
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
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
