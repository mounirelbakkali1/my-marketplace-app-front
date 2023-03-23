import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import SellerDashboard from "../views/seller/SellerDashboard.vue";
import Login from "../views/Login.vue";
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
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: SellerDashboard,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("token")) {
          next();
        } else {
          next("/login");
        }
      },
      beforeRouteEnter(to, from, next) {},
      beforeRouteUpdate(to, from, next) {
        console.log("beforeRouteUpdate");
        next();
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
      beforeEnter: (to, from, next) => {
        console.log("beforeEnter");
        next();
      },
      beforeUpdate(to, from, next) {
        console.log("beforeUpdate");
        // next();
      },
    },
  ],
});

export default router;
