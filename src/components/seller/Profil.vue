<template>
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
  created() {},
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
