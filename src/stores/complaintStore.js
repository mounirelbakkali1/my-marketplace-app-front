import { defineStore } from "pinia";
import axiosInstance from "../api/axios";

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
        const response = await axiosInstance.get("/v1/admin/complaints");
        this.complaints = response.data.complaints;
        this.complaintFormLoading = false;
        return this.complaints;
      } catch (error) {
        throw error;
      }
    },
    async escalateComplaint(id) {
      // escalate complaint from server
      try {
        this.complaintFormLoading = true;
        await axiosInstance.post(`/v1/admin/complaints/${id}/escalate`);
        this.complaintFormLoading = false;
      } catch (error) {
        throw error;
      }
    },
    async rejectComplaint(id) {
      // reject complaint from server
      try {
        this.complaintFormLoading = true;
        await axiosInstance.post(`/v1/admin/complaints/${id}/reject`);
        this.complaintFormLoading = false;
      } catch (error) {
        throw error;
      }
    },
  },
});
