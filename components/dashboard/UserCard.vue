<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import MTextFieldVue from '../base/MTextField.vue';
const props = defineProps({ items: Array });
const emit = defineEmits(["user-ban"]);
const deleteLoading = ref(false)
const activePop = ref(false)
const error = ref(false)
const banId = ref(0)
const ban = ref({ message: null, day: 7 })

</script>
<template>
  <v-row>
    <v-col cols="12" lg="3" sm="3" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <img crossorigin="anonymous"
          :src="card.avatar ? `${baseUrl.url_base}/${card.avatar}` : '/images/users/avatar-1.jpg'"
          style="height:200px; width: 100%; object-fit: cover;" class="rounded-t-md" alt="123" />
          <div :class="`store__card--lenta ${card.isBlocked ? 'red' : 'green'}`"></div>

        <div class="d-flex justify-end mr-4 mt-n5 gap-2">
          <v-btn size="40" icon class="bg-warning d-flex" :to="`/users/${card.id}`">
            <v-avatar size="30" class="text-white">
              <FilePencilIcon size="18" />
            </v-avatar>
            <v-tooltip activator="parent" location="bottom">Duzet</v-tooltip>
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
  <div v-if="activePop" class="popup_ban">
    <div class="popup_ban__content" v-click-outside="''">
      <v-col cols="12">
        <MTextFieldVue :type="'text'" :label="`Maglumat`" :error="!ban.message && error" v-model="ban.message">
        </MTextFieldVue>
      </v-col>
      <v-col cols="12">
        <v-select :type="'date'" :label="`Nece gunlik`" :items="['1', '3', '7', '30', '60']" :error="!ban.day && error"
          v-model="ban.day">
        </v-select>
      </v-col>
      <div class="d-flex justify-end gap-2">
        <v-btn @click="" :loading="deleteLoading" color="error">Ban</v-btn>
        <v-btn @click="activePop = false">Goybulsun</v-btn>
      </div>
    </div>
  </div>
</template>
