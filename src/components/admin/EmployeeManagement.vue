<template>
  <!-- add new employee  -->
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-4">Manage Employees</h2>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white py-2 text-xs px-3 rounded"
        @click="showModal = true"
      >
        Add new employee
      </button>
    </div>
    <!-- add new employee modal -->
    <AddEmployeeModal v-if="showModal" @close="showModal = false" />
    <ManageEmployeePermissions v-if="manageForm" :employee_id="employee_id" />
    <!-- end of add new employee modal -->
    <!-- table -->
    <div
      v-if="success"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline ml-2">{{ success }}</span>
    </div>
  </div>
  <div class="bg-white shadow-md rounded my-6">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">Name</th>
            <th class="py-3 px-6 text-left">Email</th>
            <th class="py-3 px-6 text-center">Image</th>
            <th class="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="(user, index) in employees"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-left whitespace-nowrap">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">{{ user.name }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-left">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">{{ user.email }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex justify-center items-center">
                <div class="w-10 h-10">
                  <img
                    class="w-full h-full rounded-full"
                    :src="default_image"
                    alt="user image"
                  />
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-right whitespace-nowrap">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      @click="manageEmployee(user)"
                    >
                      Manage permissions
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AddEmployeeModal from "./AddEmployeeModal.vue";
import { useEmployee } from "@/stores/employeeStore.js";
import { useRolesAndPermissionsStore } from "../../stores/rolesAndPermissionsStore";
import ManageEmployeePermissions from "./ManageEmployeePermissions.vue";

export default {
  components: {
    AddEmployeeModal,
    ManageEmployeePermissions,
  },
  data() {
    return {
      showModal: false,
      employees: [],
      default_image: "https://picsum.photos/200/300",
      employeeStore: useEmployee(),
      success: null,
      employee_id: null,
    };
  },
  mounted() {
    this.uploadEmployeeData();
    this.success = this.employeeStore.permissionFormSuccess;
  },
  computed: {
    manageForm() {
      return this.employeeStore.manageForm;
    },
  },
  methods: {
    async uploadEmployeeData() {
      await this.employeeStore.getEmployees();
      this.employees = this.employeeStore.employees;
    },
    manageEmployee(employee) {
      this.employeeStore.manageForm = true;
      this.employeeStore.employee = employee;
      this.employee_id = employee.id;
    },
  },
  created() {
    const rolesAndPermissionsStore = useRolesAndPermissionsStore();
    // subscribe to the store
    rolesAndPermissionsStore.$subscribe(
      (state) => (this.success = state.permissionFormSuccess)
    );
  },
};
</script>

<style>
/* No additional styles needed for this component */
</style>
