<template>
  <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 lg:p-3 main">
    <div class="max-w-md mx-auto">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create Your Seller Account
      </h2>

      <!-- loop throught errors if exist -->
      <div v-if="errors" class="mt-4">
        <ul class="list-disc list-inside text-sm text-red-600">
          <li v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </div>
      <div class="mt-8">
        <form @submit.prevent="submit">
          <div class="grid grid-cols-2 gap-6">
            <div>
              <!-- Contact Info -->
              <div class="gap grid grid-cols-1">
                <label
                  for="street_address"
                  class="block text-sm font-medium text-gray-700"
                >
                  Street Address
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="street"
                    id="street_address"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.street"
                  />
                </div>
              </div>
              <div>
                <label
                  for="city"
                  class="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.city"
                  />
                </div>
              </div>
              <div>
                <label
                  for="zipcode"
                  class="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="zip_code"
                    id="zipcode"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.zip_code"
                  />
                </div>
              </div>
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div class="mt-1">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.phone"
                  />
                </div>
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div class="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.email"
                    autocomplete="username"
                  />
                </div>
              </div>
              <div>
                <label
                  for="website"
                  class="block text-sm font-medium text-gray-700"
                >
                  Website URL
                </label>
                <div class="mt-1">
                  <input
                    type="url"
                    name="websiteUrl"
                    id="website"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.websiteUrl"
                  />
                </div>
              </div>
            </div>
            <!-- Personal Info -->
            <div class="gap grid grid-cols-1">
              <label>Your personal photo</label>
              <!-- image uploaded preview -->
              <div
                class="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative"
              >
                <div v-if="imagePreview" class="absolute w-full h-full z-50">
                  <img :src="imagePreview" alt="Selected Image Preview" />
                </div>
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M14 14h20v20H14V14z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 14h24M12 18h24M12 22h24M12 26h24M12 30h24M12 34h24M12 38h24"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="image"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload now</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        class="sr-only"
                        required
                        v-on:change="previewImage"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">PNG, JPG, up to 1MB</p>
                </div>
              </div>
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.name"
                  />
                </div>
              </div>
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div class="mt-1">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.password"
                    autocomplete="new-password"
                  />
                </div>
              </div>
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div class="mt-1">
                  <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.password_confirmation"
                    autocomplete="new-password"
                  />
                </div>
              </div>
              <div>
                <label
                  for="dob"
                  class="block text-sm font-medium text-gray-700"
                >
                  Date of Birth
                </label>
                <div class="mt-1">
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    v-model="form.dob"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between p-5">
            <div class="flex items-center">
              <input
                id="agree-terms"
                name="agree"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                v-model="form.agree"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                agree to
                <a href="" class="text-indigo">terms and conditions</a>
              </label>
            </div>

            <div class="text-sm">
              <a
                href="#"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const imagePreview = ref(null);
const selectedFile = ref(null);
const errors = ref([]);
let form = reactive({
  street: "",
  city: "",
  zip_code: "",
  phone: "",
  email: "",
  websiteUrl: "",
  name: "",
  password: "",
  password_confirmation: "",
  dob: "",
  agree: false,
  image: new File([""], "filename"),
});
const submit = async () => {
  try {
    await axios
      .post("http://localhost:8000/api/v1/sellers", form)
      .then((res) => {
        if (res.data.status === "success") {
          router.push({ name: "login" });
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        errors.value = error.response.data.errors;
      });
  } catch (error) {
    console.log(error);
  }
};
const previewImage = (event) => {
  const fileUploadErrors = [];
  let file = event.target.files[0];
  selectedFile.value = file;
  if (!file.type.startsWith("image/")) {
    fileUploadErrors.push("Please select an image file");
    errors.value = fileUploadErrors;
    return;
  } else {
    errors.value = [];
  }
  form.image = selectedFile.value;
  // Read the image file and set the preview
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile.value);
  reader.onload = () => {
    imagePreview.value = reader.result;
  };
};
</script>

<style scoped>
.main {
  padding: 20px;
}
</style>
