<script>
export default {
  name: "NotificationsContainer",
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    async retreiveNotifications() {
      const notifications =
        await this.notificationsStore.retreiveNotifications();
      this.notifications = notifications;
    },
  },
  mounted() {
    this.retreiveNotifications();
  },
};
</script>
