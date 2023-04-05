import { defineStore } from "pinia";
import axios from "axios";

export const useComplaintStore = defineStore("ComplaintStore", {
  state: () => ({
    complaints: null,
    complaint: null,
    isFormShowen: false,
    complaintForm: null,
    complaintFormErrors: null,
    complaintFormSuccess: null,
    complaintFormLoading: false,
  }),
  actions: {
    setComplaints(complaints) {
      this.complaints = complaints;
    },
    async retreiveComplaints() {
      // retreive complaints from server
      try {
        this.complaintFormLoading = true;
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/complaints"
        );
        this.complaints = response.data.complaints;
        this.complaintFormLoading = false;
        return this.complaints;
      } catch (error) {
        throw error;
      }
    },
    async retreiveComplaint(id) {
      // retreive complaint from server
      try {
        this.complaintFormLoading = true;
        const response = await axios.get(
          `http://localhost:8000/api/v1/complaints/${id}`
        );
        this.complaint = response.data.complaint;
        this.complaintFormLoading = false;
        return this.complaint;
      } catch (error) {
        throw error;
      }
    },
  },
});
