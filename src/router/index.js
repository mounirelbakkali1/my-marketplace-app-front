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
import Orders from "../components/seller/ViewOrders.vue";
import EditProfil from "../components/seller/EditProfil.vue";
import SellerActivities from "../components/seller/SellerActivities.vue";
import OrdersTracking from "../components/client/OrdersTracking.vue";
import { useAuthStore } from "../stores/AuthStore";
import AppOrderItem from "../components/AppOrderItem.vue";
import CustomerService from "../views/CustomerService.vue";
import Complaints from "../components/client/AppComplaints.vue";
import Contact from "../components/client/AppContact.vue";
import Signup from "../views/Signup.vue";

let currentUser = null;

const router = createRouter({
  // Html 5 mode
  history: createWebHistory("/"),
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
      path: "/signup",
      name: "signup",
      component: Signup,
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
      path: "/order/:id",
      name: "order",
      component: AppOrderItem,
      params: true,
      meta: {
        requiresAuth: true,
        forGuest: true,
      },
    },
    {
      path: "/my-orders",
      name: "my-orders",
      component: OrdersTracking,
      meta: {
        requiresAuth: true,
        forGuest: true,
      },
    },
    {
      path: "/customer-service",
      name: "customer-service",
      component: CustomerService,
      meta: {
        requiresAuth: true,
        forGuest: true,
      },
      children: [
        {
          path: "",
          name: "customer-service-default",
          redirect: { name: "customer-service-contact" },
        },
        {
          path: "complaints",
          name: "customer-service-complaints",
          component: Complaints,
        },
        {
          path: "contact",
          name: "customer-service-contact",
          component: Contact,
        },
      ],
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
        forGuest: true,
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
  return currentUser.isAuthenticated;
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
  console.log(
    "can access as guest: ",
    to.meta.requiresAuth && to.meta.forGuest && isGuest()
  );
  console.log(to);
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
    next("/");
  } else if (
    to.meta.requiresAuth &&
    !to.path.startsWith("/logout") &&
    !to.meta.forGuest
  ) {
    console.log("debug");
    next("/login");
  } else if (to.meta.requiresAuth && to.meta.forGuest && isGuest()) {
    next();
  } else if (to.meta.requiresAuth && to.meta.forGuest && !isGuest()) {
    next("/login");
  } else {
    next();
  }
});

export default router;
