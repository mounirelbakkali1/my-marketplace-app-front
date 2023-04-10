<script>
import { useRolesAndPermissionsStore } from "@/stores/rolesAndPermissionsStore.js";
export default {
  data() {
    return {
      roles: [],
      permissions: [],
      newRole: {
        name: "",
        description: "",
      },
      newPermission: {
        name: "",
        description: "",
      },
      successRoleOperation: null,
      successPermissionOperation: null,
      currentPage: 1,
      itemsPerPage: 5,
      rolesAndPermissions: useRolesAndPermissionsStore(),
    };
  },
  mounted() {
    this.getRoles();
    this.getPermissions();
  },
  computed: {
    pageCount() {
      return Math.ceil(this.permissions.length / this.itemsPerPage);
    },
    displayedPermissions() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.permissions.slice(start, end);
    },
  },
  methods: {
    async getRoles() {
      await this.rolesAndPermissions.fetchRoles();
      this.roles = this.rolesAndPermissions.roles;
    },
    async createRole() {
      await this.rolesAndPermissions.createRole(this.newRole);
      this.resetForm();
      this.getRoles();
      this.successRoleOperation = this.rolesAndPermissions.roleFormSuccess;
    },
    editRole(role) {
      this.newRole = role;
    },
    deleteRole(role) {
      this.rolesAndPermissions.deleteRole(role);
      this.getRoles();
      this.successRoleOperation = this.rolesAndPermissions.roleFormSuccess;
    },
    resetForm() {
      this.newRole = {
        name: "",
        description: "",
      };
    },
    resetPermissionForm() {
      this.newPermission = {
        name: "",
        description: "",
      };
    },
    async getPermissions() {
      await this.rolesAndPermissions.fetchPermissions();
      this.permissions = this.rolesAndPermissions.permissions;
    },
    async createPermission() {
      await this.rolesAndPermissions.createPermission(this.newPermission);
      this.resetPermissionForm();
      this.getPermissions();
      this.successPermissionOperation =
        this.rolesAndPermissions.permissionFormSuccess;
    },
    editPermission(permission) {
      this.newPermission = permission;
    },
    deletePermission(permission) {
      this.rolesAndPermissions.deletePermission(permission);
      this.getPermissions();
      this.successPermissionOperation =
        this.rolesAndPermissions.permissionFormSuccess;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
  },
};
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-8">Manage Roles and Permissions</h1>
    <!-- success message -->
    <div
      v-if="successRoleOperation"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
      role="alert"
      style="width: 100%"
    >
      <strong class="font-bold">Success!</strong>
      <span class="block sm:inline">{{ successRoleOperation }}</span>
      <button
        type="button"
        class="absolute top-0 bottom-0 right-0 px-4 py-3"
        @click="successRoleOperation = ''"
      >
        <span class="fa fa-times"></span>
      </button>
    </div>
    <!-- List of roles -->
    <div class="w-full mb-8">
      <h2 class="text-xl font-bold mb-2">Roles</h2>
      <div class="bg-white rounded-lg shadow overflow-hidden w-full">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="py-2 px-4 text-left">Name</th>
              <th class="py-2 px-4 text-left">Description</th>
              <th class="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td class="py-2 px-4">{{ role.name }}</td>
              <td class="py-2 px-4">{{ role.description }}</td>
              <td class="py-2 px-4">
                <button
                  class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                  @click="editRole(role)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                  @click="deleteRole(role.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add new role form -->
    <div class="w-full">
      <h2 class="text-xl font-bold mb-2">Add New Role</h2>
      <div class="bg-white rounded-lg shadow p-8 w-full">
        <form @submit.prevent="createRole">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="roleName">
              Name
            </label>
            <input
              v-model="newRole.name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="roleName"
              type="text"
              placeholder="Enter role name"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 font-bold mb-2"
              for="roleDescription"
            >
              Description
            </label>
            <textarea
              v-model="newRole.description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="roleDescription"
              placeholder="Enter role description"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              type="submit"
            >
              Add Role
            </button>
            <button
              class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded"
              type="button"
              @click="resetForm"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
    <!--same for permissions-->
    <div class="w-full mb-8 mt-5">
      <h2 class="text-xl font-bold mb-2">Permissions</h2>
      <!-- success message -->
      <div
        v-if="successPermissionOperation"
        class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
        role="alert"
        style="width: 100%"
      >
        <strong class="font-bold">Success!</strong>
        <span class="block sm:inline">{{ successPermissionOperation }}</span>
        <button
          type="button"
          class="absolute top-0 bottom-0 right-0 px-4 py-3"
          @click="successPermissionOperation = ''"
        >
          <span class="fa fa-times"></span>
        </button>
      </div>
      <table class="w-full">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 text-left">Name</th>
            <th class="py-2 px-4 text-left">Description</th>
            <th class="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="permission in displayedPermissions" :key="permission.id">
            <td class="py-2 px-4">{{ permission.name }}</td>
            <td class="py-2 px-4">{{ permission.description }}</td>
            <td class="py-2 px-4">
              <button
                class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                @click="editPermission(permission)"
              >
                Edit
              </button>
              <button
                class="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                @click="deletePermission(permission.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="bg-white rounded-lg shadow overflow-hidden w-full"></div>
    </div>

    <div class="flex justify-center mt-4">
      <button
        class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2"
        :disabled="currentPage === 1"
        @click="prevPage()"
      >
        Prev
      </button>
      <button
        v-for="pageNumber in pageCount"
        class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2"
        :class="pageNumber === currentPage ? 'bg-gray-400 text-white' : ''"
        @click="currentPage = pageNumber"
      >
        {{ pageNumber }}
      </button>
      <button
        class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 ml-2"
        :disabled="currentPage === pageCount"
        @click="nextPage()"
      >
        Next
      </button>
    </div>

    <!-- Add new Permission form -->
    <div class="w-full">
      <h2 class="text-xl font-bold mb-2">Add New Permission</h2>
      <div class="bg-white rounded-lg shadow p-8 w-full">
        <form @submit.prevent="createPermission">
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="roleName">
              Name
            </label>
            <input
              v-model="newPermission.name"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="roleName"
              type="text"
              placeholder="Enter role name"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-gray-700 font-bold mb-2"
              for="roleDescription"
            >
              Description
            </label>
            <textarea
              v-model="newPermission.description"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="roleDescription"
              placeholder="Enter role description"
            ></textarea>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
              type="submit"
            >
              Add Permission
            </button>
            <button
              class="bg-gray-500 hover:bg-gray-600 text-white py-1 px-4 rounded"
              type="button"
              @click="resetPermissionForm"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
