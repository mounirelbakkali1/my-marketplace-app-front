<script>
export default {
  name: "RelatedItems",
  props: {
    relatedItems: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<template>
  <!-- Product display area -->
  <div class="md:w-3/4 px-4 py-8">
    <h2 class="text-2xl font-bold mb-4">Related Items</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <!-- Product card -->
      <div
        class="bg-white rounded-lg shadow-md overflow-hidden"
        v-for="product in relatedItems"
      >
        <img
          :src="product.primary_image"
          alt="Product image"
          class="w-full h-48 object-cover"
        />
        <div class="px-4 py-2">
          <!-- product and price in the same line -->
          <div class="flex justify-between items-center">
            <h3 class="text-gray-700 uppercase">{{ product.name }}</h3>
            <span class="text-gray-500 mt-2">{{ product.price }}</span>
          </div>
          <!-- product rating -->
          <ItemRating
            :rating="parseInt(product.rating_average)"
            :reviews="product.reviews"
          />
          <p class="text-gray-700 mb-2">
            {{ product.description }}
          </p>
          <!-- seller name and image and order button in the right -->
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img
                class="h-8 w-8 rounded-full object-cover"
                :src="product.seller_image"
                alt="Seller image"
                :fallback="fallbackImage"
              />
              <span class="text-gray-700 text-sm ml-2">{{
                product.seller_name
              }}</span>
            </div>
            <!-- add to card with outline and background color took on hover like btn-outline of bootstrap and not fully rounded -->
            <RouterLink
              class="bg-blue-500 hover:bg-blue-600 text-white py-1 text-xs px-2 rounded"
              :to="{ name: 'related-details', params: { id: product.id } }"
              >view
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
