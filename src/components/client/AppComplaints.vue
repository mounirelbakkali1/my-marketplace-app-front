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
    <BaseAlert v-if="sent">
      <template #title> Success : Complaint submitted successfully </template>
      <template #description>
        <div class="flex justify-between w-100">
          <div>We will get back to you as soon as possible.</div>
          <div>
            <router-link
              to="/"
              class="bg-blue-100 hover:bg-blue-100 text-teal-500 font-bold py-2 px-4 rounded"
            >
              Go to Home
            </router-link>
          </div>
        </div>
      </template>
    </BaseAlert>
    <form class="w-full max-w-lg mx-auto" @submit.prevent="createComplaint">
      <div class="mb-4">
        <label for="priority" class="block text-gray-700 font-medium mb-2"
          >Type:</label
        >
        <select
          id="priority"
          v-model="type"
          :class="{ 'border-red-500': typeError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          required
        >
          <option value="" disabled>Select complaint type</option>
          <option value="product_quality">Product Quality</option>
          <option value="service_quality">Service Quality</option>
          <option value="delivery_issue">Delivery Issue</option>
          <option value="other">Other</option>
        </select>
        <p v-if="typeError" class="text-red-500 mt-1">Please select a type.</p>
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-medium mb-2"
          >Complaint:</label
        >
        <textarea
          id="message"
          v-model="complaint"
          :class="{ 'border-red-500': complaintError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          placeholder="Your message"
          required
        ></textarea>
        <p v-if="complaintError" class="text-red-500 mt-1">
          Please enter a message.
        </p>
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-medium mb-2"
          >Additional info:</label
        >
        <textarea
          id="message"
          v-model="additioanl_info"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          placeholder="your phone number, email, etc."
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-indigo-500 text-white px-4 py-2 rounded-md w-full"
        :disabled="sent"
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
import { useComplaintStore } from "../../stores/complaintStore";
import BaseAlert from "../BaseAlert.vue";
export default {
  components: { BaseAlert },
  data() {
    return {
      type: "",
      complaint: "",
      additioanl_info: "",
      typeError: "",
      complaintError: "",
      complaintStore: useComplaintStore(),
      sent: false,
    };
  },
  methods: {
    async createComplaint() {
      if (!this.validateInputs()) {
        const resp = await this.complaintStore.createComplaint({
          complaint_type: this.type,
          complaint: this.complaint,
          additional_info: this.additioanl_info,
        });
        console.log(resp);
        if (resp.status === 200) {
          this.sent = true;
        }
      }
    },
    validateInputs() {
      let any = false;
      if (this.type === "") {
        this.typeError = "type must be selected";
        any = true;
      }
      if (this.complaint === "") {
        this.complaintError = "complaint must be filled";
        any = true;
      }
      return any;
    },
  },
};
</script>
