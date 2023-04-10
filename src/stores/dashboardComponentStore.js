import { defineStore } from "pinia";

export const useDashComponent = defineStore("DashComponent", {
  // Data
  state: () => ({
    currentComponent: "",
  }),
  // Computed
  getters: {},
  // Methods
  actions: {
    setCurrentComponent(component) {
      this.currentComponent = component;
    },
  },
  persist: {
    enabled: true,
  },
});
