<script>
import { useAuthStore } from "@/stores/index";
const sellerDefault = {
  name: "",
  email: "",
  created_at: "",
  role: "",
  image: null,
  additional_info: {
    phone: "",
    intro: null,
    coverImage: null,
    websiteUrl: "",
    address: {
      city: "",
      street: "",
      zip_code: "",
    },
  },
};
export default {
  name: "Profil",
  data() {
    return {
      seller: new Proxy(sellerDefault, {
        get: function (target, prop) {
          return prop in target ? target[prop] : "";
        },
      }),
    };
  },
  mounted() {
    this.seller = JSON.parse(localStorage.getItem("user"));
  },
};
</script>
<template>
  <div class="flex flex-col md:flex-row items-start justify-between mt-8">
    <div class="w-full md:w-1/2 md:pr-4">
      <h3 class="text-xl font-bold mb-4">Contact Information</h3>
      <div class="flex flex-col space-y-4">
        <div>
          <h4 class="text-lg font-bold mb-2">Address</h4>
          <p>{{ seller.additional_info.address.street }}</p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-2">Email</h4>
          <p>{{ seller.email }}</p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-2">Phone Number</h4>
          <p>{{ seller.additional_info.phone }}</p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-2">City</h4>
          <p>{{ seller.additional_info.address.city }}</p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-2">Zip Code</h4>
          <p>{{ seller.additional_info.address.zip_code }}</p>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 md:pl-4">
      <h3 class="text-xl font-bold mb-4">About</h3>
      <div class="flex flex-col space-y-4">
        <div>
          <h4 class="text-lg font-bold mb-2">Bio</h4>
          <p>
            {{
              [null, ""].includes(seller.additional_info.intro)
                ? "no bio"
                : seller.additional_info.intro
            }}
          </p>
        </div>
        <div>
          <h4 class="text-lg font-bold mb-2">Website</h4>
          <a
            class="text-blue-500 hover:text-blue-600"
            :href="seller.websiteUrl"
            >{{ seller.additional_info.websiteUrl }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
