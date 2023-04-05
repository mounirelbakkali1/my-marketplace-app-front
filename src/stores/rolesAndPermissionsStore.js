import { defineStore } from "pinia";
import axios from "axios";
import { useEmployee } from "./employeeStore";
export const useRolesAndPermissionsStore = defineStore({
  id: "rolesAndPermissionsStore",
  state: () => ({
    roles: [],
    permissions: [],
    roleBasedPermissions: [],
    roleFormLoading: false,
    roleFormErrors: {},
    roleFormSuccess: {},
    permissionFormLoading: false,
    permissionFormErrors: {},
    permissionFormSuccess: {},
  }),
  getters: {
    getRoles(state) {
      return state.roles;
    },
    getPermissions(state) {
      return state.permissions;
    },
    getRoleFormLoading(state) {
      return state.roleFormLoading;
    },
    getRoleFormErrors(state) {
      return state.roleFormErrors;
    },
    getRoleFormSuccess(state) {
      return state.roleFormSuccess;
    },
    getPermissionFormLoading(state) {
      return state.permissionFormLoading;
    },
    getPermissionFormErrors(state) {
      return state.permissionFormErrors;
    },
    getPermissionFormSuccess(state) {
      return state.permissionFormSuccess;
    },
  },
  actions: {
    async fetchRoles() {
      this.roleFormLoading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/roles"
        );
        this.roles = response.data.roles;
        this.roleFormLoading = false;
      } catch (error) {
        this.roleFormErrors = error.response.data;
        this.roleFormLoading = false;
      }
    },
    async fetchPermissions() {
      this.permissionFormLoading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/permissions"
        );
        this.permissions = response.data.permissions;
        this.permissionFormLoading = false;
      } catch (error) {
        this.permissionFormErrors = error.response.data;
        this.permissionFormLoading = false;
      }
    },
    async createRole(role) {
      this.roleFormLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/admin/roles",
          role
        );
        this.roleFormSuccess = response.data.message;
        this.roleFormErrors = {};
        this.roleFormLoading = false;
        this.fetchRoles();
      } catch (error) {
        this.roleFormErrors = error.response.data.errors;
        this.roleFormLoading = false;
      }
    },
    async deleteRole(id) {
      this.roleFormLoading = true;
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/v1/admin/roles/${id}`
        );
        this.roleFormSuccess = response.data.message;
        this.roleFormErrors = {};
        this.roleFormLoading = false;
      } catch (error) {
        this.roleFormErrors = error.response.data.errors;
        this.roleFormLoading = false;
      }
    },
    async createPermission(permission) {
      this.permissionFormLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/admin/permissions",
          permission
        );
        this.permissionFormSuccess = response.data.message;
        this.permissionFormErrors = {};
        this.permissionFormLoading = false;
      } catch (error) {
        this.permissionFormErrors = error.response.data.errors;
        this.permissionFormLoading = false;
      }
    },
    async deletePermission(id) {
      this.permissionFormLoading = true;
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/v1/admin/permissions/${id}`
        );
        this.permissionFormSuccess = response.data.message;
        this.permissionFormErrors = {};
        this.permissionFormLoading = false;
      } catch (error) {
        this.permissionFormErrors = error.response.data.errors;
        this.permissionFormLoading = false;
      }
    },
    async getEmployeePermissions(id) {
      // get employee permissions from the base-end
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/admin/employees/${id}/permissions`
        );
        this.employeePermissionsLoading = false;
        this.permissions = response.data.permissions;
        this.roleBasedPermissions = response.data.roleBasedPermissions;
      } catch (error) {
        this.employeePermissionsErrors = error.response.data;
        this.employeePermissionsLoading = false;
      }
    },
    async updateEmployeePermissions(id, permissions) {
      // update employee permissions
      this.employeePermissionsLoading = true;
      try {
        const response = await axios.put(
          `http://localhost:8000/api/v1/admin/employees/${id}/permissions`,
          {
            permissions: permissions,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.permissionFormErrors = {};
        this.permissionFormLoading = false;
        this.permissionFormSuccess = response.data.message;
        console.log(this.permissionFormSuccess);
      } catch (error) {
        this.permissionFormErrors = error.response.data.errors;
        this.permissionFormLoading = false;
      }
    },
  },
});
