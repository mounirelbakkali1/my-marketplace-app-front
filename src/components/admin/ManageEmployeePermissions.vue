<template>
  <!---display success message-->
  <div
    v-if="successMessage"
    class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong class="font-bold">Success!</strong>
    <span class="block sm:inline">{{ successMessage }}</span>
  </div>
  <div class="flex flex-col w-full p-4">
    <div class="flex flex-row items-center mb-4">
      <img
        class="h-8 w-8 mr-2 rounded-full"
        :src="default_image"
        :alt="employee.name"
      />
      <h2 class="text-lg font-bold">{{ employee.name }}</h2>
    </div>
    <div class="flex flex-col space-y-4">
      <div v-for="(permission, index) in roleBasedPermissions" :key="index">
        <label :for="permission.id" class="inline-flex items-center">
          <input
            type="checkbox"
            :id="permission.id"
            v-model="permission.selected"
            class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
          />
          <span class="ml-2 text-gray-700">{{ permission.name }}</span>
        </label>
      </div>
      <button
        @click="saveChanges"
        class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-150 ease-in-out"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script>
import { useEmployee } from "@/stores/employeeStore.js";
import { useRolesAndPermissionsStore } from "@/stores/rolesAndPermissionsStore.js";
export default {
  props: {
    employee_id: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    employeeStore: useEmployee(),
    rolesAndPermissions: useRolesAndPermissionsStore(),
    employee: {},
    permissions: [],
    roleBasedPermissions: [],
    default_image: "https://picsum.photos/200",
  }),
  computed: {
    successMessage() {
      return this.rolesAndPermissions.employeePermissionsSuccess;
    },
  },
  watch: {
    employee_id: async function () {
      await this.fetchEmployeePermissions();
    },
  },
  methods: {
    async saveChanges() {
      let selectedPermissions = this.roleBasedPermissions.filter(
        (permission) => permission.selected
      );
      selectedPermissions = selectedPermissions.map((permission) => {
        return permission.name;
      });
      await this.rolesAndPermissions.updateEmployeePermissions(
        this.employee.id,
        selectedPermissions
      );
      this.employeeStore.manageForm = false;
    },
    async fetchEmployeePermissions() {
      this.employee = this.employeeStore.employee;
      await this.rolesAndPermissions.getEmployeePermissions(this.employee.id);
      this.permissions = this.rolesAndPermissions.permissions;
      this.roleBasedPermissions = this.rolesAndPermissions.roleBasedPermissions;
      for (let rolePermission of this.roleBasedPermissions) {
        // Find the matching permission in the permissions array by name
        let permission = this.permissions.find(
          (p) => p.name === rolePermission.name
        );
        // If a matching permission exists, set the selected property to true
        if (permission) {
          rolePermission.selected = true;
        }
      }
    },
  },
  mounted: async function () {
    await this.fetchEmployeePermissions();
  },
};
</script>

<style>
/* Add your own custom styles here, or use Tailwind classes */
</style>
