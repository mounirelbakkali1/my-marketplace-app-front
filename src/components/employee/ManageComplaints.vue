<script>
import { useComplaintStore } from "@/stores/complaintStore.js";
import AccountStatus from "@/components/AccountStatus.vue";

export default {
  name: "ManageSellers",
  components: {
    AccountStatus,
  },
  data() {
    return {
      complaints: [],
      complaintStore: useComplaintStore(),
      currentPage: 1,
      itemsPerPage: 5,
      complaint: null,
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
      this.complaint = complaint;
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
    escalate(complaintID) {
      this.complaintStore.escalateComplaint(complaintID);
      this.retreiveComplaints();
      this.complaint = null;
    },
    reject(complaintID) {
      this.complaintStore.rejectComplaint(complaintID);
      this.retreiveComplaints();
      this.complaint = null;
    },
  },
  mounted() {
    this.retreiveComplaints();
  },
};
</script>

<template>
  <h2 class="text-2xl font-bold mb-4">Manage Client Complaints</h2>

  <div class="bg-white shadow-md rounded my-6">
    <!-- view seller info -->
    <div class="p-5" v-if="complaint">
      <div class="flex justify-between">
        <div class="flex">
          <div class="w-10 h-10 mr-3">
            <img
              class="w-full h-full rounded-full"
              :src="complaint.user.image"
              alt="complaint img"
            />
          </div>
          <div>
            <p class="text-gray-900 font-bold text-xl leading-none">
              {{ complaint.user.name }}
            </p>
            <p class="text-gray-600 text-sm">
              {{ complaint.complaint_status }}
            </p>
          </div>
        </div>
        <div class="flex">
          <div v-if="complaint.complaint_status === 'pending'">
            <button
              class="bg-yellow-200 text-yellow-500 hover:bg-yellow-500 hover:text-white font-bold py-2 px-4 rounded mr-2"
              @click="escalate(complaint.id)"
            >
              Escalate
            </button>
            <button
              class="bg-red-200 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              @click="reject(complaint.id)"
            >
              reject
            </button>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="sendMessage(seller.id)"
          >
            Send Message
          </button>
        </div>
      </div>
      <div class="mt-4">
        <p>
          Complaint Type :
          <span class="font-bold">{{ complaint.complaint_type }}</span>
        </p>
        <p>complaint description :</p>
        <p class="text-gray-600 text-sm">
          {{ complaint.complaint }}
        </p>
      </div>
    </div>
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
              <AccountStatus :status="complaint.complaint_status" />
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
