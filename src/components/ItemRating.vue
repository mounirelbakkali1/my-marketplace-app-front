<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
      default: 1,
    },
    reviews: {
      type: Number,
      required: false,
      default: 0,
    },
  },
};
</script>

<template>
  <div class="flex items-center mt-2">
    <svg
      class="h-5 w-5 text-yellow-500 fill-current"
      viewBox="0 0 24 24"
      v-for="n in rating"
    >
      <path
        d="M12 2l2.45 7.03h7.55l-6.27 4.47 2.45 7.03-6.27-4.47-6.27 4.47 2.45-7.03-6.27-4.47h7.55z"
      />
    </svg>
    <svg
      class="h-5 w-5 text-gray-400 fill-current"
      viewBox="0 0 24 24"
      v-for="n in 5 - rating"
    >
      <path
        d="M12 2l2.45 7.03h7.55l-6.27 4.47 2.45 7.03-6.27-4.47-6.27 4.47 2.45-7.03-6.27-4.47h7.55z"
      />
    </svg>
    <span class="text-gray-600 text-xs mt-2 ml-2" v-if="reviews">
      ({{ reviews }} reviews)</span
    >
  </div>
</template>
