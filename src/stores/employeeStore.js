import { defineStore } from "pinia";
import axiosInstance from "../api/axios";

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
        const response = await axiosInstance.get("/v1/admin/employees");
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
        const response = await axiosInstance.post(
          "/v1/admin/employees",
          employee
        );
        this.success = response.data.message;
        this.errors = {};
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
});
