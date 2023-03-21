<template>
  <div class="flex flex-col items-center">
    <div
      class="w-full h-40 bg-cover bg-center"
      :style="{ backgroundImage: `url(${seller.coverImage})` }"
    ></div>
    <div class="w-full max-w-4xl py-4 px-6">
      <div
        class="flex flex-col md:flex-row items-center md:items-start justify-between"
      >
        <div class="flex items-center mb-4 md:mb-0">
          <img
            class="w-20 h-20 rounded-full border-2 border-white mr-4"
            :src="seller.image"
            alt="Seller profile image"
          />
          <div>
            <h2 class="text-2xl font-bold">{{ seller.name }}</h2>
            <p class="text-gray-600 text-sm">{{ seller.email }}</p>
          </div>
        </div>
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Edit Profile
        </button>
      </div>
      <div class="flex flex-col md:flex-row items-start justify-between mt-8">
        <div class="w-full md:w-1/2 md:pr-4">
          <h3 class="text-xl font-bold mb-4">Contact Information</h3>
          <div class="flex flex-col space-y-4">
            <div>
              <h4 class="text-lg font-bold mb-2">Address</h4>
              <p>{{ seller.address }}</p>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Email</h4>
              <p>{{ seller.email }}</p>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Phone Number</h4>
              <p>{{ seller.phone }}</p>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">City</h4>
              <p>{{ seller.city }}</p>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Zip Code</h4>
              <p>{{ seller.zipCode }}</p>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2 md:pl-4">
          <h3 class="text-xl font-bold mb-4">About</h3>
          <div class="flex flex-col space-y-4">
            <div>
              <h4 class="text-lg font-bold mb-2">Bio</h4>
              <p>{{ seller.bio }}</p>
            </div>
            <div>
              <h4 class="text-lg font-bold mb-2">Website</h4>
              <a
                class="text-blue-500 hover:text-blue-600"
                :href="seller.websiteUrl"
                >{{ seller.websiteUrl }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      required: true,
    },
  },
};
</script>
