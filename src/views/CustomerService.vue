<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <div
      class="lg:w-1/2 bg-cover bg-center bg-gray-300 img"
      style="background-image: url('../../customer-support.jpg')"
    ></div>
    <router-view></router-view>
  </div>
</template>
<script></script>

<style scoped>
.img {
  background-size: contain;
}
</style>
