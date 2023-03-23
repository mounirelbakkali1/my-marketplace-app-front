import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SellerDashboard from "../views/seller/SellerDashboard.vue";
import AdminDashboard from "../views/admin/AdminDashboard.vue";

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
      path: "/dashboard",
      name: "Dashboard",
      component: SellerDashboard,
    },
    {
      path: "/admin/dashboard",
      name: "AdminDashboard",
      component: AdminDashboard,
    },
    {
      path: "/chat",
      name: "chat",
      component: () => import("../views/ChatFrame.vue"),
    },
    {
      path: "/details/:id",
      name: "details",
      component: () => import("../views/Details.vue"),
    },
  ],
});

export default router;
