<template>
  <div class="fixed top-5 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50">
    <div class="bg-white w-1/2 mx-auto rounded shadow-lg mt-20 p-6" @click.stop>
      <h2 class="text-2xl font-bold mb-4">Add new employee</h2>
      <form @submit.prevent="addNewEmployee">
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
      newEmployee: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        permissions: [],
      },
      employeeStore: useEmployee(),
    };
  },
  methods: {
    addNewEmployee() {
      this.employeeStore.createEmployee(this.newEmployee);
    },
  },
};
</script>
