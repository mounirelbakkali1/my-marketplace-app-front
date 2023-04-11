<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
import DashLink from "@/components/DashLink.vue";
import ManageSellers from "@/components/employee/ManageSellers.vue";
import History from "@/components/employee/LogsForEmployee.vue";
import ManageComplaints from "@/components/employee/ManageComplaints.vue";
import QualityControl from "@/components/employee/QualityControl.vue";
import { useDashComponent } from "@/stores/dashboardComponentStore.js";

export default {
  components: {
    DashboardTemplate,
    DashLink,
    ManageSellers,
    History,
    ManageComplaints,
    QualityControl,
  },
  data() {
    return {
      sidebarOpen: false,
      sidebarWidth: 0,
      navbarHeight: 0,
      dashComponent: useDashComponent(),
    };
  },
  methods: {
    updateCurrentComponent(component) {
      this.dashComponent.setCurrentComponent(component);
    },
  },
  computed: {
    currentComponent() {
      return this.dashComponent.currentComponent;
    },
  },
};
</script>

<template>
  <DashboardTemplate>
    <template #title>employee Dashboard</template>
    <template #links>
      <DashLink
        component="manage sellers"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label> manage sellers </template>
      </DashLink>
      <DashLink
        component="manage complaints"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label>manage complaints</template>
      </DashLink>
      <DashLink
        component="quality control"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label>quality control</template>
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
      <div v-if="currentComponent === 'manage sellers'">
        <ManageSellers />
      </div>
      <div v-if="currentComponent === 'manage complaints'">
        <ManageComplaints />
      </div>
      <div v-if="currentComponent === 'consult history'">
        <History />
      </div>
      <div v-if="currentComponent === 'quality control'">
        <QualityControl />
      </div>
    </template>
  </DashboardTemplate>
</template>
