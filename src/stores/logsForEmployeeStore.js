import { defineStore } from "pinia";
import axios from "axios";
export const useLogsForEmployee = defineStore("LogsForEmployee", {
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
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/history"
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
