<template>
  <h2 class="text-2xl font-bold mb-4">Manage Client Complaints</h2>

  <div class="bg-white shadow-md rounded my-6">
    <div class="overflow-x-auto">
      <table class="w-full table-auto">
        <thead>
          <tr
            class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
          >
            <th class="py-3 px-6 text-left">ID</th>
            <th class="py-3 px-6 text-left">Complaint</th>
            <th class="py-3 px-6 text-center">Type</th>
            <th class="py-3 px-6 text-center">Status</th>
            <th class="py-3 px-6 text-center">Date</th>
            <th class="py-3 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr
            v-for="(complaint, index) in displayedComplaints"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="py-3 px-6 text-center whitespace-nowrap">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">{{ complaint.id }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">
                    {{ complaint.user.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">
                    {{ complaint.complaint_type }}
                  </div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-center">
              <span
                class="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"
              >
                {{ complaint.complaint_status }}
              </span>
            </td>
            <td class="py-3 px-6 text-center">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">
                    {{ complaint.updated_at }}
                  </div>
                </div>
              </div>
            </td>
            <td class="py-3 px-6 text-center whitespace-nowrap">
              <div class="flex items-center">
                <div class="mr-2">
                  <div class="font-semibold">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      @click="manageComplaint(complaint)"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- pagination links -->
  <div class="flex justify-center">
    <button
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2"
      :disabled="currentPage === 1"
      @click="prevPage()"
    >
      Prev
    </button>
    <button
      v-for="pageNumber in pageCount"
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 mr-2"
      :class="pageNumber === currentPage ? 'bg-gray-400 text-white' : ''"
      @click="currentPage = pageNumber"
    >
      {{ pageNumber }}
    </button>
    <button
      class="px-4 py-2 rounded-md bg-gray-200 text-gray-700 ml-2"
      :disabled="currentPage === pageCount"
      @click="nextPage()"
    >
      Next
    </button>
  </div>
</template>

<script>
import { useComplaintStore } from "@/stores/complaintStore.js";

export default {
  name: "ManageSellers",
  data() {
    return {
      complaints: [],
      complaintStore: useComplaintStore(),
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.complaints.length / this.itemsPerPage);
    },
    displayedComplaints() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.complaints.slice(start, end);
    },
  },

  methods: {
    manageComplaint(complaint) {
      this.$router.push({
        name: "ManageComplaint",
        params: { complaint: complaint },
      });
    },
    async retreiveComplaints() {
      const complaints = await this.complaintStore.retreiveComplaints();
      this.complaints = complaints;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
  },
  mounted() {
    this.retreiveComplaints();
  },
};
</script>
