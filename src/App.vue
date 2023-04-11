<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import BaseLayout from "./components/BaseLayout.vue";
import BaseFooter from "./components/BaseFooter.vue";
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
      <BaseFooter />
    </template>
  </BaseLayout>
</template>

<style scoped>
.s {
  min-height: 100vh;
}
</style>
