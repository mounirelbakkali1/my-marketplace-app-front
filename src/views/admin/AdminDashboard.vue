<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
import DashLink from "@/components/DashLink.vue";
import Profil from "@/components/seller/Profil.vue";
export default {
  components: {
    DashboardTemplate,
    DashLink,
    Profil,
  },
  data() {
    return {
      currentComponent: "manage employees",
      sidebarOpen: false,
      sidebarWidth: 0,
      navbarHeight: 0,
    };
  },
  methods: {
    updateCurrentComponent(component) {
      this.currentComponent = component;
    },
  },
};
</script>

<template></template>
