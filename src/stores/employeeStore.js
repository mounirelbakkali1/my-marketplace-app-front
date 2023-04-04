import { defineStore } from "pinia";
import axios from "axios";

export const useEmployee = defineStore("employee", {
  state: () => ({
    employees: [],
    employee: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "",
      permissions: [],
    },
    loading: false,
    manageForm: false,
    errors: {},
    success: "",
    updateSuccess: "",
  }),
  actions: {
    async getEmployees() {
      this.loading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/employees"
        );
        this.employees = response.data.employees;
        this.loading = false;
      } catch (error) {
        this.errors = error.response.data;
        this.loading = false;
      }
    },
    async createEmployee(employee) {
      this.loading = true;
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/admin/employees",
          employee
        );
        this.success = response.data.message;
        this.errors = {};
        this.loading = false;
      } catch (error) {
        this.errors = error.response.data.errors;
        this.loading = false;
      }
    },
  },
});
