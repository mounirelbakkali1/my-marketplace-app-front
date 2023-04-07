<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import BaseLayout from "./components/BaseLayout.vue";
</script>

<template>
  <BaseLayout>
    <template #navigation>
      <NavBar />
    </template>
    <template #main>
      <div class="s">
        <RouterView />
      </div>
    </template>
    <template #footer>
      <div class="bg-gray-800 text-white text-center py-4">
        <p class="p-2">&copy; PetsPlaza 20221</p>
      </div>
    </template>
  </BaseLayout>
</template>

<style scoped>
.s {
  min-height: 100vh;
}
</style>
