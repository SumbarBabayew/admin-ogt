<script setup >
import { ref } from 'vue';
import { baseUrl } from '@/data/dashboard/BaseUrl';
import MTextField from "../../../components/base/MTextField.vue"
import MTextArea from "@/components/base/MTextArea.vue";

import { addSession, getSession } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from '~~/components/base/Loading.vue';
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from '@elastic/filesaver'
const router = useRouter();
const route = useRoute();
const error = ref(false)
const loading = ref(false)
const loadingAdd = ref(false)
const item = ref({
  nameEn: null,
  nameRu: null,
  nameX: null,
  topicEn: null,
  topicRu: null,
  topicX: null,
  aboutEn: null,
  aboutRu: null,
  aboutX: null,
  time: null,
  orderNumber: null
})
const speakers = ref([])
const ADDorEDIT = async () => {
  if (!item.value.nameEn || !item.value.nameRu || !item.value.nameX || !item.value.topicEn || !item.value.topicRu || !item.value.topicX) {return error.value = true;}
    loadingAdd.value = true
  if (route.params.id == 0) {
    await addSession({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
  else {
    await addSession({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
    loadingAdd.value = false
}
onMounted(async () => {
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getSession({ id: route.params.id })
    item.value = data
    loading.value = false
  }
})
</script>
<template>
  <Loading v-if="loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} session</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="6" lg="4">
            <m-text-field :type="'text'" :label="`Title EN`" :error="!item.nameEn && error"
              v-model="item.nameEn"></m-text-field>
          </v-col>
          <v-col cols="6" lg="4">
            <m-text-field :type="'text'" :label="`Title RU`" :error="!item.nameRu && error"
              v-model="item.nameRu"></m-text-field>
          </v-col>
          <v-col cols="6" lg="4">
            <m-text-field :type="'text'" :label="`Title X`" :error="!item.nameX && error"
              v-model="item.nameX"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Topic EN`" :error="!item.topicEn && error"
              v-model="item.topicEn"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Topic RU`" :error="!item.topicRu && error"
              v-model="item.topicRu"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Topic X`" :error="!item.topicX && error"
              v-model="item.topicX"></m-text-field>
          </v-col>
          <v-col lg="12" sm="12">
        <m-text-area
          :type="'text'"
          :label="`About EN`"
          :error="!item.aboutEn && error"
          v-model="item.aboutEn"
        ></m-text-area>
      </v-col>
          <v-col cols="12">
            <m-text-area :type="'text'" :label="`About RU`" :error="!item.aboutRu && error"
              v-model="item.aboutRu"></m-text-area>
          </v-col>
          <v-col cols="12">
            <m-text-area :type="'text'" :label="`About X`" :error="!item.aboutX && error"
              v-model="item.aboutX"></m-text-area>
          </v-col>
          <v-col cols="4">
            <m-text-field :type="'text'" :label="`Time`" :error="!item.time && error"
              v-model="item.time"></m-text-field>
          </v-col>
          <v-col cols="4">
            <m-text-field :type="'text'" :label="`Order number`" :error="!item.orderNumber && error"
              v-model="item.orderNumber"></m-text-field>
          </v-col>
        </v-row>
      </v-card-item>


      <div class="d-flex justify-end pb-3 ">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd" @click="ADDorEDIT">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} session </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
