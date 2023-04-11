<template>
  <div class>
    <button @mouseover="showMenu = true" @mouseleave="showMenu = false">
      <slot name="main">
        <img
          src="../../assets/images/icons8-gear-94.png"
          alt="edit"
          class="abs-img"
        />
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style scoped>
/* Add any custom styles for the component here */
</style>
