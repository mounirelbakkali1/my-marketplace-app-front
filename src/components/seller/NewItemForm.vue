<script>
import { useItemFormStore } from "@/stores/itemFormStore";
import ItemFormTemplate from "@/components/seller/ItemFormTemplate.vue";
export default {
  name: "NewItemForm",
  components: {
    ItemFormTemplate,
  },
  data() {
    return {
      ItemStore: useItemFormStore(),
      newItem: {
        name: "",
        description: "",
        price: "",
        category_id: "",
        collection_id: "",
        images: [],
        primary_image: null,
        condition: "",
        color: "",
        stock: 1,
        size: "",
      },
    };
  },
  methods: {
    addItem() {
      this.ItemStore.setItem(this.newItem);
      this.ItemStore.addItem();
    },
  },
};
</script>

<template>
  <ItemFormTemplate @action="addItem" :newItem="newItem">
    <template #title>
      <h2 class="text-2xl p-2">Add new Item to store</h2>
    </template>
    <template #submitText> Publish </template>
  </ItemFormTemplate>
</template>
