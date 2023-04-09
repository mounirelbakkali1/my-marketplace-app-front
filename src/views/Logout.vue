<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";
let router = useRouter();

let error = ref(null);
let logout = async () => {
  let authStore = useAuthStore();
  try {
    await authStore.logout();
  } catch (e) {
    error.value = e.response.data.message;
  }
  router.push("/");
};

onMounted(() => {
  setTimeout(() => {
    logout();
  }, 1000);
});
</script>

<template>
  <!-- a loader and a message -->
  <div class="flex flex-col items-center justify-center h-screen">
    <!-- display error -->
    <div v-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>
    <div
      class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"
    ></div>
    <h2 class="text-center text-gray-500 text-xl font-medium mt-4">
      Logging out...
    </h2>
  </div>
</template>
