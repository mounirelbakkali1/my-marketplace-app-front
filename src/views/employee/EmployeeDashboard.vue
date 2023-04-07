<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
import DashLink from "@/components/DashLink.vue";
import ManageSellers from "../../components/employee/ManageSellers.vue";
import History from "../../components/employee/LogsForEmployee.vue";
import ManageComplaints from "../../components/employee/ManageComplaints.vue";
export default {
  components: {
    DashboardTemplate,
    DashLink,
    ManageSellers,
    History,
    ManageComplaints,
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

<template>
  <DashboardTemplate>
    <template #title>employee Dashboard</template>
    <template #links>
      <DashLink
        component="manage employees"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label> manage employees </template>
      </DashLink>
      <DashLink
        component="manage complaints"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label>manage complaints</template>
      </DashLink>
      <DashLink
        component="consult history"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label>consult history</template>
      </DashLink>
    </template>
    <template #main>
      <div v-if="currentComponent === 'manage employees'">
        <ManageSellers />
      </div>
      <div v-if="currentComponent === 'manage complaints'">
        <ManageComplaints />
      </div>
      <div v-if="currentComponent === 'consult history'">
        <History />
      </div>
    </template>
  </DashboardTemplate>
</template>
