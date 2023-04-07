import { defineStore } from "pinia";
import axios from "axios";
export const useLogsForSeller = defineStore("LogsForSeller", {
  state: () => ({
    history: [],
    historyLoading: false,
    historyErrors: null,
    historySuccess: false,
  }),
  actions: {
    async retreiveHistory() {
      // retreive history from server
      try {
        this.historyLoading = true;
        const id = JSON.parse(localStorage.getItem("user")).id;
        const response = await axios.get(
          `http://localhost:8000/api/v1/seller/${id}/history`
        );
        this.history = response.data.history;
        this.historyLoading = false;
        return this.history;
      } catch (error) {
        this.historyErrors = error.response.data;
        this.historyLoading = false;
      }
    },
  },
});
