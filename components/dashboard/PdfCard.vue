<script setup >
import { ref } from "vue"
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deletePdf } from "@/service/admin.api";
const emit = defineEmits(["delete-item"]);
const props = defineProps({ items: Array });
const handleItems = ref([])
const deleteLoading = ref(false)
const deleteItem = async (c) => {
  deleteLoading.value = true;
  await deletePdf({ id: c }).then(res => {
    handleItems.value = props.items.filter(item => item.id !== c)
    emit("delete-item", handleItems.value)
    deleteLoading.value = false;

  })
}
</script>

<template>
  <v-row>
    <v-col cols="12" lg="3" sm="6" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <NuxtLink :to="`/home-pdf/${card.id}`">
          <img crossorigin="anonymous" :src="`${baseUrl.url_base}/${card.image}`" style="height:200px; width: 100%;"
            class="rounded-t-md" alt="123" />
        </NuxtLink>
        <div class="d-flex justify-end mr-4 mt-n5 gap-2">
          <v-btn :to="`/home-pdf/${card.id}`" size="40" icon class="bg-primary d-flex">
            <v-avatar size="30" class="text-white">
              <FilePencilIcon size="15" />
            </v-avatar><v-tooltip activator="parent" location="bottom">Duzet</v-tooltip>
          </v-btn>

          <v-btn size="40" icon class="bg-error d-flex" @click="deleteItem(card.id)" :loading="deleteLoading">
            <v-avatar size="30" class="text-white">
              <TrashIcon size="15" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Poz</v-tooltip>
          </v-btn>
        </div>
        <v-card-item class="pt-0 d-flex">
          <h6 class="text-h6">{{ card.nameEn }}</h6>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
