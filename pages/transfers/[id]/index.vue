<script setup>
import { ref } from 'vue';
import MImageUpload from "@/components/base/MImageUpload.vue"
import MTextField from "@/components/base/MTextField.vue"
import MTextArea from "@/components/base/MTextArea.vue"
import Loading from '~~/components/base/Loading.vue';
import {
  addTransfer,
  uploadTransferImage,
  getTransfer
} from "@/service/admin.api";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const error = ref(false)
const loading = ref(false)
const addLoading = ref(false)
const image = ref(null)
const setPathImage = (c) => image.value = c[0]
const product = ref({
  nameRu: null,
  nameEn: null,
  nameX: null,
  orderNumber: null,
  image: '',
})

const ADDorEDIT = async () => {
  if (!product.value.nameRu || !product.value.nameEn) return error.value = true

  addLoading.value = true
  if (route.params.id == 0) {
    await addTransfer({ data: product.value, id: route.params.id }).then(async res => {
      await uploadTransferImage({ id: res.data.id, data: { file: image.value } })
      router.go(-1)
    }).catch(error => { console.log(error) })
  }
  else {
    await addTransfer({ data: product.value, id: route.params.id }).then(async () => {
      if(image.value) await uploadTransferImage({ id: route.params.id, data: { file: image.value } })
      router.go(-1)
    })
  }
}

onMounted(async () => {
  // await fetchData()
  if (route.params.id != 0) {
    const { data } = await getTransfer({ id: route.params.id })
    product.value = data
  }
  loading.value = true
})
</script>
<template>
  <Loading v-if="!loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg px-3">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} hotel</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>

        <v-row class="mt-3">
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Name (EN)`" :error="!product.nameEn && error"
              v-model="product.nameEn"></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Name (RU)`" :error="!product.nameRu && error"
              v-model="product.nameRu"></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Name (X)`" :error="!product.nameX && error"
              v-model="product.nameX"></m-text-field>
          </v-col>
          <v-col cols="12" lg="12" sm="12">
            <m-text-field :type="'number'" :label="`Order number`" :error="!product.orderNumber && error"
              v-model="product.orderNumber"></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload :width="'width:100%'" :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: product.image }" :error="error && !image" :selectedFile="image"
              @photoPath="setPathImage" :placeholder="'Surat'"></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3 ">
        <!-- <input type="checkbox" v-model="product.isVisible" :value="product.isVisible"> -->
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" @click="ADDorEDIT" :loading="addLoading">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} hotel</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>

    </v-card>
  </div>
</template>
