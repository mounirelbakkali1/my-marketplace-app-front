<script>
export default {
  name: "ManageSellers",
  props: {
    history: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 5,
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
};
</script>

<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold mb-4">Last 48h history</h2>
    <div class="bg-white shadow-md rounded my-6">
      <div class="overflow-x-auto">
        <table class="w-full table-auto">
          <thead>
            <tr
              class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
            >
              <th class="py-3 px-6 text-left">Causer ID</th>
              <th class="py-3 px-6 text-left">Causer name</th>
              <th class="py-3 px-6 text-left">Subject Type</th>
              <th class="py-3 px-6 text-left">Subject Id</th>
              <th class="py-3 px-6 text-center">Description</th>
              <th class="py-3 px-6 text-right">Date</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="(history, index) in displayedHistory"
              :key="index"
              class="border-b border-gray-200 hover:bg-gray-100"
            >
              <td class="py-3 px-6 text-left whitespace-nowrap">
                <div class="flex items-center">
                  <div class="mr-2">
                    <div class="font-semibold">{{ history.causer.id }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <div class="mr-2">
                    <div class="font-semibold">{{ history.causer.name }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <div class="mr-2">
                    <div class="font-semibold">{{ history.subject_type }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <div class="mr-2">
                    <div class="font-semibold">{{ history.subject_id }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <div class="mr-2">
                    <div class="font-semibold">{{ history.description }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-6 text-left">
                <div class="flex items-center">
                  <div class="mr-2">
                    <div class="font-semibold">
                      {{ history.created_at_human }}
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
  </div>
</template>
