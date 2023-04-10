<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
import DashLink from "@/components/DashLink.vue";
import Profil from "@/components/seller/Profil.vue";
import Statistics from "@/components/seller/Statistics.vue";
import EmployeeManagement from "@/components/admin/EmployeeManagement.vue";
import RolesAndPermissions from "@/components/admin/RolesAndPermissions.vue";
import { useDashComponent } from "@/stores/dashboardComponentStore.js";

export default {
  components: {
    DashboardTemplate,
    DashLink,
    Profil,
    Statistics,
    EmployeeManagement,
    RolesAndPermissions,
  },
  data() {
    return {
      dashComponent: useDashComponent(),
      sidebarOpen: false,
      sidebarWidth: 0,
      navbarHeight: 0,
    };
  },
  computed: {
    currentComponent() {
      return this.dashComponent.currentComponent;
    },
  },
  methods: {
    updateCurrentComponent(component) {
      this.dashComponent.setCurrentComponent(component);
    },
  },
};
</script>

<template>
  <DashboardTemplate>
    <template #title>Admin Dashboard</template>
    <template #links>
      <DashLink
        component="manage employees"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label> manage employees </template>
      </DashLink>
      <DashLink
        component="manage roles & permissions"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label> manage roles & permissions </template>
      </DashLink>
      <DashLink
        component="consult statistics"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label> consult statistics </template>
      </DashLink>
      <DashLink
        component="Settings"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label> Settings </template>
      </DashLink>
    </template>
    <template #main>
      <div v-if="currentComponent === 'manage employees'">
        <EmployeeManagement />
      </div>
      <div v-if="currentComponent === 'manage roles & permissions'">
        <h2 class="text-lg font-bold mb-4"></h2>
        <RolesAndPermissions />
      </div>
      <div v-if="currentComponent === 'consult statistics'">
        <h2 class="text-lg font-bold mb-4"></h2>
        <Statistics />
      </div>
      <div v-if="currentComponent === 'Settings'">
        <h2 class="text-lg font-bold mb-4">Settings</h2>
      </div>
    </template>
  </DashboardTemplate>
</template>
