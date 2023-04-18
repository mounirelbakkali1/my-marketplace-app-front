<script>
import axiosInstance from "@/api/axios";
import ItemRating from "@/components/ItemRating.vue";
import { useOrderedItemsStore } from "../stores/OrderedItemsStore";
export default {
  props: {
    itemId: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Array,
      required: true,
    },
  },
  components: {
    ItemRating,
  },
  data() {
    return {
      rating: 0,
      comment: "",
      displayed: [],
      orderedItemsStore: useOrderedItemsStore(),
    };
  },
  computed: {
    canRate() {
      return this.orderedItemsStore.isOrdered(parseInt(this.itemId));
    },
  },
  emits: ["FeedBackSubmited"],
  mounted() {
    this.displayed = this.ratings.slice(0, 2);
  },
  methods: {
    setRating(n) {
      this.rating = n;
    },
    viewAll() {
      this.displayed = this.ratings;
    },
    viewLess() {
      this.displayed = this.ratings.slice(0, 2);
    },
    submitRating: async function () {
      // axios to send rating

      try {
        const response = await axiosInstance.post(
          `/v1/items/${this.itemId}/rate`,
          {
            rating: this.rating,
            comment: this.comment,
          }
        );
        this.$emit("FeedBackSubmited", true);
        this.comment = "";
        this.rating = 0;
      } catch (error) {
        console.log(error);
        // if (error.response.status === 401) {
        // this.$router.push("/login");
        // }
      }
    },
  },
};
</script>

<template>
  <div class="rating-section shadow-md p-4">
    <div class="bg-white p-4 rounded-lg">
      <h3 class="text-lg font-semibold mb-4">Ratings & Comments</h3>
      <div v-if="ratings.length === 0" class="text-gray-600">
        No ratings and comments available.
      </div>
      <ul v-else class="space-y-4 mb-4">
        <li v-for="rating in displayed" :key="rating.id" class="flex">
          <div class="flex-shrink-0">
            <img
              :src="rating.user.image"
              alt="Avatar"
              class="w-12 h-12 object-cover rounded-full"
            />
          </div>
          <div class="flex-grow pl-4">
            <div class="flex justify-between items-center">
              <div class="text-lg font-semibold">{{ rating.user.name }}</div>
              <div class="text-sm text-gray-500">
                {{ rating.created_at.split("T")[0] }}
              </div>
            </div>
            <div class="mt-1">
              <ItemRating :rating="rating.rating" />
            </div>
            <div class="text-gray-600 mt-1">{{ rating.comment }}</div>
          </div>
        </li>
      </ul>
      <div
        v-if="ratings.length > 3 && displayed.length < 3"
        class="text-center"
      >
        <button class="text-blue-500 hover:text-blue-600" @click="viewAll">
          View all
        </button>
      </div>
      <div
        v-if="ratings.length > 3 && displayed.length > 2"
        class="text-center"
      >
        <button class="text-blue-500 hover:text-blue-600" @click="viewLess">
          View less
        </button>
      </div>
    </div>
    <div v-if="canRate">
      <h3 class="text-lg font-medium mb-2">Rate this product</h3>
      <div class="flex items-center mb-4">
        <span
          class="text-2xl mr-2"
          v-for="n in 5"
          :key="n"
          @click="setRating(n)"
          :class="{
            'text-yellow-400': rating >= n,
            'text-gray-300': rating < n,
          }"
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
  </div>
</template>

<style scoped>
.rating-section {
  margin: 2%;
}
</style>
