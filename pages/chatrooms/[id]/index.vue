<script setup >
import { ref } from 'vue';
import MImageUpload from "@/components/base/MImageUpload.vue"
import MTextField from "../../../components/base/MTextField.vue"
import { addChatroom, getChatroom, uploadChatImage } from "@/service/admin.api";
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
  nameRu: null,
  nameEn: null,
  nameX: null,
  isPrivate: null,
  memberCount: null,
  image: '',
  blockTextEn: null,
  blockTextRu: null,
  blockTextX: null,
  orderNumber: null
})
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.nameEn || !item.value.nameRu || !item.value.orderNumber) return error.value = true
    loadingAdd.value = true
    await addChatroom({ data: item.value, id: route.params.id }).then(async res => { 
      await uploadChatImage({ id: res.data.id, data: { file: image.value } })
      router.go(-1) 
    }).catch(error => { alert(error) })
  }
  else {
    if (!item.value.nameEn || !item.value.nameRu || !item.value.orderNumber) return error.value = true
    loadingAdd.value = true

    await addChatroom({ data: item.value, id: route.params.id }).then(async res => { 
      if(image.value) await uploadChatImage({ id: res.data.id, data: { file: image.value } })
      router.go(-1) }).catch(error => { alert(error) })
  }
}

onMounted(async () => {
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getChatroom({ id: route.params.id })
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
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} chatroom</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="6" lg="4">
            <m-text-field :type="'text'" :label="`Name EN`" :error="!item.nameEn && error"
              v-model="item.nameEn"></m-text-field>
          </v-col>
          <v-col cols="6" lg="4">
            <m-text-field :type="'text'" :label="`Name RU`" :error="!item.nameRu && error"
              v-model="item.nameRu"></m-text-field>
          </v-col>
          <v-col cols="6" lg="4">
            <m-text-field :type="'text'" :label="`Name X`" :error="!item.nameX && error"
              v-model="item.nameX"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Block Text EN`" :error="!item.blockTextEn && error"
              v-model="item.blockTextEn"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Block Text RU`" :error="!item.blockTextRu && error"
              v-model="item.blockTextRu"></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field :type="'text'" :label="`Block Text X`" :error="!item.blockTextX && error"
              v-model="item.blockTextX"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'number'" :label="`Order number`" :error="!item.orderNumber && error"
              v-model="item.orderNumber"></m-text-field>
          </v-col>
          <v-col cols="6">
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload :width="'width:100%'" :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.image }" :error="error && !image" :selectedFile="image"
              @photoPath="setPathImage" :placeholder="'Surat'"></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3 ">
        <input type="checkbox" v-model="item.isPrivate" :value="item.isPrivate">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd" @click="ADDorEDIT">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} chatroom </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
