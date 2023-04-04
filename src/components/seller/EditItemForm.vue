<script>
import { useItemFormStore } from "@/stores/itemFormStore";
import ItemFormTemplate from "@/components/seller/ItemFormTemplate.vue";
export default {
  name: "EditItemForm",
  components: {
    ItemFormTemplate,
  },
  data() {
    return {
      ItemStore: useItemFormStore(),
      item: null,
    };
  },
  methods: {
    editItem(item) {
      console.log("edit item", item);
      this.ItemStore.setItem(item);
      this.ItemStore.updateItem();
    },
  },
  beforeMount() {
    this.item = this.ItemStore.item;
    console.log(this.item);
    const item_details = this.item.item_details;
    // distruct item_details
    const { description, images, color, stock, size } = item_details;
    // add destructed variables to item
    this.item.description = description;
    this.item.images = images;
    this.item.color = color;
    this.item.stock = stock;
    this.item.size = size;
  },
};
</script>

<template>
  <ItemFormTemplate @action="editItem" :newItem="item">
    <template #title>
      <h2 class="text-2xl p-2">Edit Item</h2>
    </template>
    <template #submitText> Save changes </template>
  </ItemFormTemplate>
</template>
