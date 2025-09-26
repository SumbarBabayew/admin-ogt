<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deleteAdvertisement } from "@/service/admin.api";
const props = defineProps({ items: Array });
const emit = defineEmits(["delete-item"]);
const handleItems = ref([])
const deleteLoading = ref(false)
const deleteItem = async (c) => {
  deleteLoading.value = true
  await deleteAdvertisement({ id: c }).then(() => {
    handleItems.value = props.items.filter(item => item.id !== c)
    emit("delete-item", handleItems.value)
  })
}
</script>
<template>
  <v-row>
    <v-col cols="12" lg="3" sm="6" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <NuxtLink :to="''">
          <img crossorigin="anonymous" :src="`${baseUrl.url_base}/${card.image}`" style="height:200px; width: 100%;"
            class="rounded-t-md" alt="123" />

          <div :class="`store__card--lenta ${card.isVisible ? 'green' : 'red'}`"></div>
        </NuxtLink>
        <div class="d-flex justify-end mr-4 mt-n5 gap-2">
          <v-btn size="40" icon class="bg-warning d-flex" :to="`/advertisement/${card.id}`">
            <v-avatar size="30" class="text-white">
              <FilePencilIcon size="18" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Duzet</v-tooltip>
          </v-btn>
          <v-btn size="40" icon class="bg-error d-flex" :loading="deleteLoading" @click="deleteItem(card.id)">
            <v-avatar size="30" class="text-white">
              <TrashIcon size="18" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Poz</v-tooltip>
          </v-btn>
        </div>
        <v-card-item class="pt-0 d-flex">
          <h6 class="text-h6" v-text="`Link: ${card.link}`"></h6>
          <h6 class="text-h6" v-text="`Cenli: ${new Date(card.endTime).toLocaleDateString()}`"></h6>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
