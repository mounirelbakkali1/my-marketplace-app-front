<script>
export default {
  name: "accountStatus",
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  computed: {
    statusClass() {
      if (
        this.status === "active" ||
        this.status === "approved" ||
        this.status === "verified" ||
        this.status === "escalated" ||
        this.status === "available"
      ) {
        return "bg-green-200 text-green-600";
      } else if (this.status === "inactive" || this.status === "pending") {
        return "bg-yellow-200 text-yellow-600";
      } else if (this.status === "suspended" || this.status === "rejected") {
        return "bg-red-200 text-red-600";
      } else if (this.status === "banned") {
        return "bg-red-200 text-red-600";
      }
    },
  },
};
</script>

<template>
  <span class="py-1 px-3 rounded-full text-xs" :class="statusClass">
    {{ status }}
  </span>
</template>
