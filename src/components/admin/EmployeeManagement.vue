<template>
  <!-- add new employee  -->
  <div class="flex flex-col">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-4">Manage Employees</h2>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white py-2 text-xs px-3 rounded"
        @click="showModal = true"
      >
        Add new employee
      </button>
    </div>
    <!-- add new employee modal -->
    <AddEmployeeModal v-if="showModal" />
    <!-- end of add new employee modal -->
    <!-- table -->
  </div>
  <div class="bg-white shadow-md rounded my-6">
    <table class="w-full table-auto">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-center">Image</th>
          <th class="py-3 px-6 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 text-sm font-light">
        <tr
          v-for="(user, index) in users"
          :key="index"
          class="border-b border-gray-200 hover:bg-gray-100"
        >
          <td class="py-3 px-6 text-left whitespace-nowrap">
            <div class="flex items-center">
              <div class="mr-2">
                <div class="font-semibold">{{ user.name }}</div>
              </div>
            </div>
          </td>
          <td class="py-3 px-6 text-left">
            <div class="flex items-center">
              <div class="mr-2">
                <div class="font-semibold">{{ user.email }}</div>
              </div>
            </div>
          </td>
          <td class="py-3 px-6 text-center">
            <div class="flex justify-center items-center">
              <div class="w-10 h-10">
                <img
                  class="w-full h-full rounded-full"
                  :src="user.image"
                  alt="user image"
                />
              </div>
            </div>
          </td>
          <td class="py-3 px-6 text-right whitespace-nowrap">
            <div class="flex items-center">
              <div class="mr-2">
                <div class="font-semibold">
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Manage permissions
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AddEmployeeModal from "./AddEmployeeModal.vue";
export default {
  components: {
    AddEmployeeModal,
  },
  data() {
    return {
      showModal: false,
      users: [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          image: "https://picsum.photos/id/237/200/200",
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          image: "https://picsum.photos/id/238/200/200",
        },
        {
          name: "Bob Johnson",
          email: "bob.johnson@example.com",
          image: "https://picsum.photos/id/239/200/200",
        },
        {
          name: "Alice Brown",
          email: "alice.brown@example.com",
          image: "https://picsum.photos/id/240/200/200",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
/* No additional styles needed for this component */
</style>
