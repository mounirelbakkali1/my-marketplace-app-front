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

<style>
.s {
  min-height: 100vh;
}
body::-webkit-scrollbar {
  width: 10px;
  height: 20px;
}

body::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #edf0f7;
}

body::-webkit-scrollbar-thumb {
  background: #7979ff;
  border-radius: 100vh;
  border: 3px solid #edf2f7;
}

body::-webkit-scrollbar-thumb:hover {
  background: #75baf9;
}
body {
  overflow-x: hidden;
}
</style>
