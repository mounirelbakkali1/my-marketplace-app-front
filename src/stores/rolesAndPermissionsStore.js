import { defineStore } from "pinia";
import axios from "axios";
export const useRolesAndPermissionsStore = defineStore({
  id: "rolesAndPermissionsStore",
  state: () => ({
    roles: [],
    permissions: [],
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
        this.fetchPermissions();
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
  },
});
