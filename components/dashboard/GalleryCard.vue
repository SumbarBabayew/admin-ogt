<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deleteGallery } from "@/service/admin.api";
const props = defineProps({ items: Array });
const emit = defineEmits(["delete-item"]);
const handleItems = ref([])
const deleteLoading = ref(false)
const deleteItem = async (c) => {
  deleteLoading.value = false
  await deleteGallery({ id: c }).then(() => {
    handleItems.value = props.items.filter(item => item.id !== c)
    emit("delete-item", handleItems.value)
  })
  deleteLoading.value = false
}
</script>
<template>
  <v-row>
    <v-col cols="6" lg="4" sm="4" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <NuxtLink :to="''">
          <img crossorigin="anonymous" :src="`${baseUrl.url_base}/${card.cover}`" style="height:200px; width: 100%; object-fit: cover;"
            class="rounded-t-md" alt="123" />

        </NuxtLink>
        <div class="d-flex justify-end  mt-n5">

          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-btn size="30" icon class="profileBtn bg-borderColor" variant="text" v-bind="props">
                <DotsIcon />
              </v-btn>
            </template>
            <v-sheet rounded="md" width="200" elevation="10" class="mt-2">

              <v-list class="py-0" lines="one" density="compact" @click="$goPage(`/gallery/${card.id}`, {})">
                <v-list-item value="item2" active-color="primary">
                  <template v-slot:prepend>
                    <FilePencilIcon size="20" />
                  </template>
                  <v-list-item-title class="pl-4 text-body-1">Edit</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-list class="py-0" lines="one" density="compact" :loading="deleteLoading" @click="deleteItem(card.id)">
                <v-list-item value="item2" active-color="primary">
                  <template v-slot:prepend>
                    <TrashIcon size="20" />
                  </template>
                  <v-list-item-title class="pl-4 text-body-1">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-menu>
        </div>
        <v-card-item class="pt-0 d-flex">
          <h6 class="text-h6" v-text="`${card.title}`"></h6>
          <!-- <h6 class="text-h6 my-2" v-text="`TMT: ${card.tmt_price}`"></h6>
          <h6 class="text-h6 my-2" v-text="`USD: ${card.usd_price}`"></h6>
          <h6 class="text-h6 my-2" v-text="`EUR: ${card.eur_price}`"></h6> -->
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
