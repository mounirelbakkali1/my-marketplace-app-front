<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import BaseLayout from "./components/BaseLayout.vue";
import MainPage from "./components/MainPage.vue";
import DashboardV2 from "./views/SellerDashboard.vue";
let products = [
  {
    id: 1,
    name: "Dog Food",
    description: "A bag of dog food",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "mounir",
    sellerImage: "https://picsum.photos/200/300",
    rating: 4,
    reviews: 10,
  },
  {
    id: 2,
    name: "Cat Food",
    description: "A bag of cat food",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "ahmed",
    sellerImage: "https://picsum.photos/200/300",
    rating: 1,
    reviews: 22,
  },
  {
    id: 3,
    name: "Bird Food",
    description: "A bag of bird food",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "mostapha",
    sellerImage: "https://picsum.photos/200/300",
    rating: 2,
    reviews: 16,
  },
  {
    id: 4,
    name: "Dog Toy",
    description: "A dog toy",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "rachid",
    sellerImage: "https://picsum.photos/200/300",
    rating: 3,
    reviews: 17,
  },
  {
    id: 5,
    name: "Cat Toy",
    description: "A cat toy",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "anas",
    sellerImage: "https://picsum.photos/200/300",
    rating: 4,
    reviews: 12,
  },
  {
    id: 6,
    name: "Bird Toy",
    description: "A bird toy",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "jamal",
    sellerImage: "https://picsum.photos/200/300",
    rating: 5,
    reviews: 10,
  },
  {
    id: 7,
    name: "Dog Collar",
    description: "A dog collar",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "saad",
    sellerImage: "https://picsum.photos/200/300",
    rating: 4,
    reviews: 19,
  },
  {
    id: 8,
    name: "Cat Collar",
    description: "A cat collar",
    price: 10.99,
    image: "https://picsum.photos/200/300",
    sellerName: "youssed",
    sellerImage: "https://picsum.photos/200/300",
    rating: 2,
    reviews: 44,
  },
];
</script>

<template>
  <BaseLayout>
    <template #navigation>
      <NavBar />
    </template>
    <template #main>
      <div>
        <RouterView />
      </div>
    </template>
    <template #footer>
      <!-- <div class="bg-gray-800 text-white text-center py-4">
        <p class="p-2">&copy; PetsPlaza 20221</p>
      </div> -->
    </template>
  </BaseLayout>
</template>

<style scoped></style>
