<script>
import { useLogsForSeller } from "@/stores/logsForSellerStore.js";
import AppHistory from "@/components/AppHistory.vue";
export default {
  watch: {},
  name: "LogsForSeller",
  components: {
    AppHistory,
  },
  data() {
    return {
      history: [],
      historyStore: useLogsForSeller(),
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.history.length / this.itemsPerPage);
    },
    displayedHistory() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.history.slice(start, end);
    },
  },

  methods: {
    async retreiveHistory() {
      const history = await this.historyStore.retreiveHistory();
      this.history = history;
    },
  },
  mounted() {
    this.retreiveHistory();
  },
};
</script>

<template>
  <AppHistory :history="history" />
</template>
