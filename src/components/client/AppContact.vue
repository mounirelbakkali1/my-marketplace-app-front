<template>
  <div class="lg:w-1/2 bg-gray-100 flex flex-col justify-center p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Contact Customer Service</h1>
      <p class="text-gray-500 mt-2">
        We're here to help you with any issues you may have.
      </p>
    </div>
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
        :disabled="canSubmit"
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
