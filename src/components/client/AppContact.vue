<template>
  <div class="lg:w-1/2 bg-gray-100 flex flex-col justify-center p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Contact Customer Service</h1>
      <p class="text-gray-500 mt-2">
        We're here to help you with any issues you may have.
      </p>
    </div>
    <BaseAlert v-if="sent">
      <template #title> Success : Contact submitted successfully </template>
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
    <form class="w-full max-w-lg mx-auto">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2"
          >Your Name:</label
        >
        <input
          id="name"
          type="text"
          v-model="name"
          :class="{ 'border-red-500': nameError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          placeholder="John Doe"
          required
        />
        <p v-if="nameError" class="text-red-500 mt-1">
          Please enter your name.
        </p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-medium mb-2"
          >Your Email:</label
        >
        <input
          id="email"
          type="email"
          v-model="email"
          :class="{ 'border-red-500': emailError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          placeholder="johndoe@example.com"
          required
        />
        <p v-if="emailError" class="text-red-500 mt-1">
          Please enter a valid email address.
        </p>
      </div>
      <div class="mb-4">
        <label for="subject" class="block text-gray-700 font-medium mb-2"
          >Subject:</label
        >
        <input
          id="subject"
          type="text"
          v-model="subject"
          :class="{ 'border-red-500': subjectError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          placeholder="Subject"
          required
        />
        <p v-if="subjectError" class="text-red-500 mt-1">
          Please enter a subject.
        </p>
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-medium mb-2"
          >Message:</label
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
      <div class="mb-4">
        <label for="priority" class="block text-gray-700 font-medium mb-2"
          >Priority:</label
        >
        <select
          id="priority"
          v-model="priority"
          :class="{ 'border-red-500': priorityError }"
          class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none"
          required
        >
          <option value="" disabled>Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <p v-if="priorityError" class="text-red-500 mt-1">
          Please select a priority.
        </p>
      </div>
      <button
        type="submit"
        @click.prevent="submitForm"
        class="bg-indigo-500 text-white px-4 py-2 rounded-md w-full"
        :disabled="sent"
      >
        Submit
      </button>
      <p class="text-gray-400 hover:text-gray-500 mt-3 font-bold">
        <router-link to="/customer-service/complaints"
          >I have a complaint?</router-link
        >
      </p>
    </form>
  </div>
</template>

<script>
import axiosInstance from "@/api/axios";
import BaseAlert from "../BaseAlert.vue";
export default {
  components: {
    BaseAlert,
  },
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
      sent: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.validateInputs()) {
        return;
      }
      try {
        const resp = await axiosInstance.post("v1/contact", {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.message,
          priority: this.priority,
        });
        console.log(resp.status);
        if (resp.status === 200) {
          this.sent = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    validateInputs() {
      let any = false;
      if (this.name === "") {
        this.nameError = true;
        any = true;
      } else {
        this.nameError = false;
      }
      if (this.email === "") {
        this.emailError = true;
        any = true;
      } else {
        this.emailError = false;
      }
      if (this.subject === "") {
        this.subjectError = true;
        any = true;
      } else {
        this.subjectError = false;
      }
      if (this.message === "") {
        this.messageError = true;
        any = true;
      } else {
        this.messageError = false;
      }
      if (this.priority === "") {
        this.priorityError = true;
        any = true;
      } else {
        this.priorityError = false;
      }
      return any;
    },
  },
};
</script>
