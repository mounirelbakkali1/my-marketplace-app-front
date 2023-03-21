<script>
export default {
  name: "DashLink",
  props: {
    component: {
      type: String,
      required: true,
    },
    currentComponent: {
      type: String,
      required: true,
    },
  },
  emits: ["updateCurrentComponent"],
  methods: {
    update() {
      this.$emit("updateCurrentComponent", this.component);
    },
  },
};
</script>

<template>
  <a
    class="flex items-center justify-center md:justify-start md:px-6 py-6 text-gray-300 hover:bg-blue-500 hover:text-white"
    href="#"
    :class="{ 'bg-blue-500': currentComponent === component }"
    @click="update"
  >
    <i class="fas fa-user-circle mr-0 md:mr-3"></i>
    <span class="hidden md:block">
      <slot name="label"></slot>
    </span>
  </a>
</template>
