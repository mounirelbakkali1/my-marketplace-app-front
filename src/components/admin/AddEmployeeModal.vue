<template>
  add scroll to the modal
  <div
    class="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 overflow-auto"
  >
    <div
      class="bg-white sm:w-1/2 mx-auto rounded shadow-lg mt-20 p-6"
      @click.stop
    >
      <h2 class="text-2xl font-bold mb-4">Add new employee</h2>
      <form @submit.prevent="addNewEmployee">
        <div
          v-if="errors.length != 0"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">Please fix the following errors:</span>
          <ul class="list-disc list-inside">
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Name"
            v-model="newEmployee.name"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            v-model="newEmployee.email"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            v-model="newEmployee.password"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm Password"
            v-model="newEmployee.password_confirmation"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="newEmployee.role"
          >
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Permissions
          </label>
          <!-- select multiple -->
          <select
            multiple
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="newEmployee.permissions"
          >
            <option value="manage complains">manage complains</option>
            <option value="quality control">quality control</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-200 text-base font-medium hover:bg-gray-300 mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grey-300 sm:text-sm"
            @click="closeModal"
          >
            Close
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white py-3 text-xs px-4 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useEmployee } from "@/stores/employeeStore.js";
export default {
  data() {
    return {
      newEmployee: {},
      errors: [],
      employeeStore: useEmployee(),
    };
  },
  emits: ["close"],
  mounted() {
    this.newEmployee = this.employeeStore.employee;
  },
  methods: {
    async addNewEmployee() {
      this.errors = [];
      await this.employeeStore.createEmployee(this.newEmployee);
      this.errors = this.employeeStore.errors;
      if (this.errors.length == 0) {
        this.closeModal();
      }
    },
    closeModal() {
      this.employeeStore.employee = null;
      this.$emit("close", false);
    },
  },
};
</script>
