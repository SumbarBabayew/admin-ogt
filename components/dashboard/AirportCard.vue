<script setup >
import { ref } from "vue"
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deleteAirport } from "@/service/admin.api";
const emit = defineEmits(["delete-item"]);
const props = defineProps({ items: Array });
const handleItems = ref([])
const deleteItem = async (c) => {
  await deleteAirport({ id: c }).then(res => {
    handleItems.value = props.items.filter(item => item.id !== c)
    emit("delete-item", handleItems.value)
  })
}

</script>
<template>
  <v-row>
    <v-col cols="12" lg="3" sm="6" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <v-card-item class="pt-1 d-flex">
          <h6 class="text-h6">{{ card.nameEn }}</h6>
        </v-card-item>
        <div class="d-flex justify-end mr-4 pb-1   gap-2">
          <v-btn :to="`/airports/${card.id}`" size="40" icon class="bg-primary d-flex">
            <v-avatar size="30" class="text-white">
              <FilePencilIcon size="15" />
            </v-avatar><v-tooltip activator="parent" location="bottom">Duzet </v-tooltip></v-btn>

          <v-btn size="40" icon class="bg-error d-flex" @click="deleteItem(card.id)">
            <v-avatar size="30" class="text-white">
              <TrashIcon size="15" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Poz </v-tooltip>
          </v-btn>
        </div>

      </v-card>
    </v-col>
  </v-row>
</template>
