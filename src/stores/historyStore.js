import { defineStore } from "pinia";
import axios from "axios";
export const useHistoryStore = defineStore("history", {
  state: () => ({
    history: [],
    historyLoading: false,
    historyErrors: null,
    historySuccess: false,
  }),
  actions: {
    async retretiveHistory() {
      // retreive history from server
      try {
        this.historyLoading = true;
        const response = await axios.get(
          "http://localhost:8000/api/v1/admin/history"
        );
        this.history = response.data.history;
        this.historyLoading = false;
      } catch (error) {
        this.historyErrors = error.response.data;
        this.historyLoading = false;
      }
    },
  },
});
