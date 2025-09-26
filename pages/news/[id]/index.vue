<script setup >
import { ref } from 'vue';
import MTextField from "@/components/base/MTextField.vue"
import MImageUpload from "@/components/base/MImageUpload.vue"
import MTextArea from "@/components/base/MTextArea.vue"
import { addNews, uploadNewsImage, getOneNews } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from '~~/components/base/Loading.vue';
const router = useRouter();
const route = useRoute();
const error = ref(false)
const image = ref(null)
const loading = ref(false)
const loadingAdd = ref(false)
const setPathImage = (c) => image.value = c[0]
const item = ref({
  titleRu: null,
  titleEn: null,
  titleX: null,
  bodyRu: null,
  bodyEn: null,
  bodyX: null,
  image: '',
})
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if ( !item.value.titleRu || !item.value.titleEn || !item.value.bodyRu || !image.value) return error.value = true
    loadingAdd.value = true
    await addNews({ data: item.value, id: route.params.id }).then(async res => {
      await uploadNewsImage({ id: res.data.id, data: { file: image.value } })
      router.go(-1)
    }).catch(error => { alert(error) })
  }
  else {
    if ( !item.value.titleRu || !item.value.titleEn || !item.value.bodyRu) return error.value = true
    loadingAdd.value = true
    await addNews({ data: item.value, id: route.params.id }).then(async res => {
      if (image.value) await uploadNewsImage({ id: res.data.id, data: { file: image.value } })
      router.go(-1)
    }).catch(error => { alert(error) })
  }
  loadingAdd.value = false
}
onMounted(async () => {
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getOneNews({ id: route.params.id })
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
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} news</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Title (EN)`" :error="!item.titleEn && error"
              v-model="item.titleEn"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Title (RU)`" :error="!item.titleRu && error"
              v-model="item.titleRu"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Title (X)`" :error="!item.titleX && error"
              v-model="item.titleX"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-area :type="'text'" :label="`Body (EN)`" :error="!item.bodyEn && error"
              v-model="item.bodyEn"></m-text-area>
          </v-col>
          <v-col cols="12">
            <m-text-area :type="'text'" :label="`Body (RU)`" :error="!item.bodyRu && error"
              v-model="item.bodyRu"></m-text-area>
          </v-col>
          <v-col cols="12">
            <m-text-area :type="'text'" :label="`Body (X)`" :error="!item.bodyX && error"
              v-model="item.bodyX"></m-text-area>
          </v-col>
          <v-col lg="6" sm="12">
            <m-image-upload :width="'width:100%'" :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.image }" :error="error && !image" :selectedFile="image"
              @photoPath="setPathImage" :placeholder="'Surat'"></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3 ">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd" @click="ADDorEDIT">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} news</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
