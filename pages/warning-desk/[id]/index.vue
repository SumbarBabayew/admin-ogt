<script setup >
import { ref } from 'vue';
import { baseUrl } from '@/data/dashboard/BaseUrl';
import MTextField from "../../../components/base/MTextField.vue"
import { addWarningText, getWarningText } from "@/service/admin.api";
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
  textEn: null,
  textRu: null,
  textX: null,
})
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.textEn || !item.value.textRu) return error.value = true
    loadingAdd.value = true
    await addWarningText({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
  else {
    if (!item.value.textEn || !item.value.textRu) return error.value = true
    loadingAdd.value = true

    await addWarningText({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
}
onMounted(async () => {
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getWarningText({ id: route.params.id })
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
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} warning</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`About EN`" :error="!item.textEn && error"
              v-model="item.textEn"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`About RU`" :error="!item.textRu && error"
              v-model="item.textRu"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`About X`" :error="!item.textX && error"
              v-model="item.textX"></m-text-field>
          </v-col>
        </v-row>
      </v-card-item>


      <div class="d-flex justify-end pb-3 ">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd" @click="ADDorEDIT">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} warning </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
