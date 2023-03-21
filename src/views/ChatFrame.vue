<script>
export default {
  //   props: {
  //     receiver: {
  //       type: Object,
  //       required: true,
  //     },
  //     messages: {
  //       type: Array,
  //       required: true,
  //     },
  //   },
  data() {
    return {
      newMessage: "",
      receiver: {
        pictureUrl: "../assets/images/fallback-image.jpg",
        name: "John Doe",
      },
      messages: [
        {
          sender: "me",
          content: "Hello, how are you?",
          time: "10:00",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
        {
          sender: "other",
          content: "I'm fine, thank you!",
          time: "10:01",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
        {
          sender: "me",
          content: "Nice to hear that!",
          time: "10:02",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
        {
          sender: "other",
          content: "What about you?",
          time: "10:03",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
        {
          sender: "me",
          content: "I'm fine too!",
          time: "10:04",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
        {
          sender: "other",
          content: "Great!",
          time: "10:05",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
        {
          sender: "me",
          content: "See you later!",
          time: "10:06",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
        {
          sender: "other",
          content: "Bye!",
          time: "10:07",
          pictureUrl: "../assets/images/fallback-image.jpg",
        },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        // this.$emit("new-message", this.newMessage);
        this.messages.push({
          sender: "me",
          content: this.newMessage,
          time: new Date().toLocaleTimeString(),
          pictureUrl: "../assets/images/fallback-image.jpg",
        });
        this.newMessage = "";
      }
    },
  },
};
</script>

<template>
  <div class="h-screen p-[5%]">
    <div class="flex flex-col chat">
      <div class="flex items-center justify-between px-4 py-[10px] border-b">
        <div class="flex items-center">
          <img :src="receiver.pictureUrl" alt="" class="w-8 h-8 rounded-full" />
          <span class="ml-2 text-lg font-medium">{{ receiver.name }}</span>
        </div>
      </div>
      <div class="flex-grow p-4 overflow-y-scroll">
        <div v-for="(message, index) in messages" :key="index" class="mb-4">
          <div v-if="message.sender === 'me'" class="flex justify-end">
            <div class="flex items-center">
              <span class="mr-2 text-sm font-medium">{{ message.time }}</span>
              <div class="flex-shrink-0">
                <img
                  :src="message.pictureUrl"
                  alt=""
                  class="w-6 h-6 rounded-full"
                />
              </div>
              <div
                class="flex items-center ml-2 px-2 py-1 text-white bg-blue-500 rounded-lg"
              >
                <p class="text-sm">{{ message.content }}</p>
              </div>
            </div>
          </div>
          <div v-else class="flex">
            <div class="flex-shrink-0">
              <img
                :src="message.pictureUrl"
                alt=""
                class="w-6 h-6 rounded-full"
              />
            </div>
            <div
              class="flex items-center ml-2 px-2 py-1 text-white bg-gray-500 rounded-lg"
            >
              <p class="text-sm">{{ message.content }}</p>
            </div>
            <span class="ml-2 text-sm font-medium">{{ message.time }}</span>
          </div>
        </div>
      </div>
      <div class="px-4 py-2">
        <div class="flex items-center">
          <input
            v-model="newMessage"
            type="text"
            class="flex-grow px-2 py-[10px] mr-2 text-sm border border-gray-400 rounded-lg focus:outline-none"
            placeholder="Type a message..."
          />
          <button
            @click="sendMessage"
            class="px-4 py-[10px] text-sm font-medium text-white bg-blue-500 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.chat {
  height: 80%;
  border-radius: 1rem;
  background-color: #e6dede57;
  border: 1px solid;
}
</style>
