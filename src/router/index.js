import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SellerDashboard from "../views/SellerDashboard.vue";
import itemDetails from "../views/itemDetails.vue";
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
      path: "/item/:id/details",
      name: "item-details",
      component: itemDetails,
    },
  ],
});

export default router;
