<template>
  <div class="flex flex-col items-center">
    <div
      class="w-full h-40 bg-cover bg-center"
      :style="{ backgroundImage: `url(${seller.coverImage})` }"
    ></div>
    <div class="w-full py-4 px-6">
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
      <!-- links to dashboard profil in flex -->
      <div
        class="flex items-center justify-center md:justify-start mt-4 bg-indigo-500"
      >
        <router-link
          to="/seller/profile"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-current">
            Profile
          </p></router-link
        >
        <router-link
          to="/seller/dashboard"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-current">
            Dashboard
          </p></router-link
        >
        <router-link
          to="/seller/products"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-current">
            Products
          </p></router-link
        >
        <router-link
          to="/seller/orders"
          class="font-semibold p-2 text-gray-100 hover:bg-gray-200 hover:text-indigo-500"
          ><p class="font-semibold p-2 text-gray-100 text-current">
            Orders
          </p></router-link
        >
      </div>
      <div class="p-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
const sellerDefault = {
  id: "ET1234",
  name: "John Doe",
  email: "joh-doe@gmail.com",
  phone: "123456789",
  address: "1234 Main St",
  city: "San Francisco",
  state: "CA",
  zipCode: "94111",
  image: "https://picsum.photos/200",
  joinDate: "2020-01-01",
  otherInfo:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl.",
  coverImage: "https://picsum.photos/1800",
  websiteUrl: "https://www.google.com",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl. Sed euismod, nisl vitae ultricies lacinia, nunc nisl aliquam massa, eget aliquet nisl nunc vel nisl.",
};
export default {
  props: {
    seller: {
      type: Object,
      required: false,
      // default sellerDefault
      default: function () {
        return sellerDefault;
      },
    },
  },
};
</script>
