<script>
import DashboardTemplate from "@/components/DashboardTemplate.vue";
import DashLink from "@/components/DashLink.vue";
export default {
  components: {
    DashboardTemplate,
    DashLink,
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
        component="consult statistics"
        @updateCurrentComponent="updateCurrentComponent"
        :currentComponent="currentComponent"
      >
        <template #label> consult statistics </template>
      </DashLink>
    </template>
    <template #main>
      <div v-if="currentComponent === 'manage employees'">
        <p>manage employees</p>
      </div>
      <div v-if="currentComponent === 'consult statistics'">
        <h2 class="text-lg font-bold mb-4"></h2>
        consult statistics
      </div>
    </template>
  </DashboardTemplate>
</template>
