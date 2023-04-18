<template>
  <div class="lg:w-1/2 bg-gray-100 flex flex-col justify-center p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">
        Complaint Customer Service
      </h1>
      <p class="text-gray-500 mt-2">
        We're here to help you with any issues you may have.
      </p>
    </div>
    <form class="w-full max-w-lg mx-auto">
      <div class="mb-4">
        <label for="priority" class="block text-gray-700 font-medium mb-2"
          >Type:</label
        >
        <select
          id="priority"
          v-model="priority"
          :class="{ 'border-red-500': priorityError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          required
        >
          <option value="" disabled>Select complaint type</option>
          <option value="product_quality">Product Quality</option>
          <option value="service_quality">Service Quality</option>
          <option value="delivery_issue">Delivery Issue</option>
          <option value="other">Other</option>
        </select>
        <p v-if="priorityError" class="text-red-500 mt-1">
          Please select a priority.
        </p>
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-medium mb-2"
          >Complaint:</label
        >
        <textarea
          id="message"
          v-model="message"
          :class="{ 'border-red-500': messageError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          placeholder="Your message"
          required
        ></textarea>
        <p v-if="messageError" class="text-red-500 mt-1">
          Please enter a message.
        </p>
      </div>

      <button
        type="submit"
        @click.prevent="submitForm"
        class="bg-indigo-500 text-white px-4 py-2 rounded-md w-full"
        :disabled="canSubmit"
      >
        Submit
      </button>
      <p class="text-gray-400 hover:text-gray-500 mt-3 font-bold">
        <router-link to="/customer-service/contact">Contact us</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      message: "",
      priority: "",
      nameError: false,
      emailError: false,
      subjectError: false,
      messageError: false,
      priorityError: false,
    };
  },
  methods: {
    submitForm() {},
  },
};
</script>
