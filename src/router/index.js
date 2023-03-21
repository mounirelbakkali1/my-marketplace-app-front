import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SellerDashboard from "../views/SellerDashboard.vue";
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

    // {
    //   path: "/item/4/detail",
    //   name: "item-detail",
    //   component: () => import("../views/itemDetails.vue"),
    // },
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
