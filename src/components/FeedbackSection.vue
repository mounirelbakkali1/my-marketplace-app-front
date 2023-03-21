<template>
  <div class="rating-section">
    <h3 class="text-lg font-medium mb-2">Rate this product</h3>
    <div class="flex items-center mb-4">
      <span
        class="text-2xl mr-2"
        v-for="n in 5"
        :key="n"
        @click="setRating(n)"
        :class="{ 'text-yellow-400': rating >= n, 'text-gray-300': rating < n }"
        >&#9733;</span
      >
      <span class="ml-2">{{ rating }}/5</span>
    </div>
    <div>
      <label for="comment" class="text-sm font-medium mb-2 block"
        >Comment (optional)</label
      >
      <textarea
        id="comment"
        class="border rounded-lg px-4 py-2 w-full"
        rows="4"
        v-model="comment"
      ></textarea>
    </div>
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 mt-4"
      @click="submitRating"
    >
      Submit Rating
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating: 0,
      comment: "",
    };
  },
  methods: {
    setRating(n) {
      this.rating = n;
    },
    submitRating() {
      // Send the rating and comment to the server
      console.log("Rating:", this.rating);
      console.log("Comment:", this.comment);
      // Reset the rating and comment fields
      this.rating = 0;
      this.comment = "";
    },
  },
};
</script>

<style scoped>
.rating-section {
  max-width: 500px;
  margin: 0 auto;
}
</style>
