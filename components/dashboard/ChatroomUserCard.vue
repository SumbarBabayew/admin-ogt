<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import MTextFieldVue from '../base/MTextField.vue';
import { deleteChatroomUser } from "@/service/admin.api";

import { TrashIcon } from 'vue-tabler-icons';
const props = defineProps({ items: Array });
const emit = defineEmits(["user-ban"]);
const deleteLoading = ref(false)
const deleteItem = async (c) => {
  deleteLoading.value = false
  await deleteChatroomUser({ data: c }).then(() => {
    handleItems.value = props.items.filter(item => item.id !== c.userId)
    emit("delete-item", handleItems.value)
  })
  deleteLoading.value = false
}
</script>
<template>
  <v-row>
    <v-col cols="12" lg="3" sm="3" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <img crossorigin="anonymous"
          :src="card.avatar ? `${baseUrl.url_base}/${card.avatar}` : '/images/users/avatar-1.jpg'"
          style="height:200px; width: 100%;" class="rounded-t-md" alt="123" />
          <div :class="`store__card--lenta ${card.isBlocked ? 'red' : 'green'}`"></div>

        <div class="d-flex justify-end mr-4 mt-n5 gap-2">
          <v-btn size="40" icon class="bg-error d-flex" @click="deleteItem({userId: card.id, chatRoomId: 3})">
            <v-avatar size="30" class="text-white">
              <TrashIcon size="18" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Kick user</v-tooltip>
          </v-btn>
          <!-- <v-btn v-if="!card.userban" size="40" icon class="bg-error d-flex" :loading="deleteLoading"
            @click="activePop = true, banId = card.id">
            <v-avatar size="30" class="text-white">
              <BanIcon size="18" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Banlemek</v-tooltip>
          </v-btn> -->
          <!-- <v-btn v-else size="40" icon class="bg-error d-flex" :loading="deleteLoading" @click="">
            <v-avatar size="30" class="text-white">
              <TrashOffIcon size="18" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Banden ayyrmak</v-tooltip>
          </v-btn> -->

        </div>
        <v-card-item class="pt-0 d-flex">
          <h6 class="text-h6" v-text="`Name: ${card.firstName}`"></h6>
          <h6 class="text-h6 mt-2" v-text="`Mail: ${card.email}`"></h6>
          <h6 class="text-h6 mt-2" v-if="card.userban"
            v-text="`Ban: ${new Date(card.userban.expireDate).toLocaleDateString()}`"></h6>
        </v-card-item>
      </v-card>

    </v-col>
  </v-row>
  
</template>
