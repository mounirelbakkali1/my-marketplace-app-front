<template>
  <div class="bg-gray-200 text-gray-900 py-3">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap items-center justify-between">
        <!-- Company Logo -->
        <div class="w-full sm:w-1/2 md:w-auto mb-6 sm:mb-0">
          <img
            src="../assets/images/logo.png"
            alt="Company Logo"
            class="w-24 h-auto"
          />
          <p class="text-sm mt-2">
            Connecting pet seekers with reputable sellers and adoption agencies
            for a seamless adoption process
          </p>
        </div>

        <!-- Links -->
        <div class="w-full sm:w-1/2 md:w-auto mb-6 sm:mb-0">
          <h3 class="text-sm font-bold uppercase">Links</h3>
          <ul class="mt-2">
            <li class="mb-2">
              <a href="/become-seller" class="text-gray-400 hover:text-white"
                >Become a Seller</a
              >
            </li>
            <li class="mb-2">
              <p class="text-gray-400 hover:text-white">
                <router-link :to="{ name: 'customer-service' }">
                  Customer Support
                </router-link>
              </p>
            </li>
            <li class="mb-2">
              <a href="/terms-and-policy" class="text-gray-400 hover:text-white"
                >Terms and Policy</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact Us -->
        <div class="w-full sm:w-1/2 md:w-auto mb-6 sm:mb-0">
          <h3 class="text-sm font-bold uppercase">Contact Us</h3>
          <ul class="mt-2">
            <li class="mb-2">
              <a
                href="mailto:info@example.com"
                class="text-gray-400 hover:text-white"
                >info@example.com</a
              >
            </li>
            <li class="mb-2">
              <a href="tel:+1234567890" class="text-gray-400 hover:text-white"
                >+123-456-7890</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
/* Add custom styles for the footer here */
</style>
