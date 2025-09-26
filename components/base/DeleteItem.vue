<script setup>
import { ref } from "vue"
const emit = defineEmits(["items"]);
const props = defineProps({ items: Array, item: Number });
import { deleteCategory } from "@/service/admin.api";
const handleItems = ref([])
const deleteItem = async () => {
  await deleteCategory({ id: props.item }).then(res => {
    handleItems.value = props.items.filter(item => item.id !== props.item)
    emit("items", handleItems.value)
  }).catch(err => { console.log(err) })
}
</script>
<template>
  <v-btn size="40" icon class="bg-error d-flex" @click="deleteItem">
    <v-avatar size="30" class="text-white">
      <TrashIcon size="15" />
    </v-avatar>
    <v-tooltip activator="parent" location="bottom">Store poz
    </v-tooltip>
  </v-btn>
</template>