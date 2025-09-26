<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deleteSpeaker } from "@/service/admin.api";
const props = defineProps({ items: Array, count: Number });
const emit = defineEmits(["delete-item"]);
const handleItems = ref([])
const deleteLoading = ref(false)
const deleteItem = async (c) => {
  deleteLoading.value = false
  await deleteSpeaker({ id: c }).then(() => {
    handleItems.value = props.items.filter(item => item.id !== c)
    emit("delete-item", handleItems.value)
  })
  deleteLoading.value = false
}
</script>
<template>
  <span class="count">Sany ( {{ props.count }} )</span>
  <v-row>
    <v-col cols="12" lg="2" sm="4" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <NuxtLink :to="''">
          <img crossorigin="anonymous" :src="`${baseUrl.url_base}/${card.image}`" style="height:200px; width: 100%;"
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

              <v-list class="py-0" lines="one" density="compact" @click="$goPage(`/product/feature/${card.id}`, {})">
                <v-list-item value="item2" active-color="primary">
                  <template v-slot:prepend>
                    <ListIcon size="20" />
                  </template>
                  <v-list-item-title class="pl-4 text-body-1">Sazlamalary</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-list class="py-0" lines="one" density="compact" @click="$goPage(`/speakers/${card.id}`, {})">
                <v-list-item value="item2" active-color="primary">
                  <template v-slot:prepend>
                    <FilePencilIcon size="20" />
                  </template>
                  <v-list-item-title class="pl-4 text-body-1">Duzetmek</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-list class="py-0" lines="one" density="compact" :loading="deleteLoading" @click="deleteItem(card.id)">
                <v-list-item value="item2" active-color="primary">
                  <template v-slot:prepend>
                    <TrashIcon size="20" />
                  </template>
                  <v-list-item-title class="pl-4 text-body-1">Pozmak</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-menu>
        </div>
        <v-card-item class="pt-0 d-flex">
          <h6 class="text-h6" v-text="`${card.nameEn}`"></h6>
          <!-- <h6 class="text-h6" v-text="`${card.positionEn}`"></h6> -->
          <!-- <h6 class="text-h6 my-2" v-text="`TMT: ${card.tmt_price}`"></h6>
          <h6 class="text-h6 my-2" v-text="`USD: ${card.usd_price}`"></h6>
          <h6 class="text-h6 my-2" v-text="`EUR: ${card.eur_price}`"></h6> -->
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
