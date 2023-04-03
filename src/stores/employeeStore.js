import { defineStore } from "pinia";
import axios from "axios";

export const useEmployee = defineStore("employee", {
  state: () => ({
    employees: [],
    employee: {},
    loading: false,
    errors: {},
    success: {},
  }),
  actions: {
    async getEmployees() {
      this.loading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/employees"
        );
        this.employees = response.data;
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
        this.success = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
});
