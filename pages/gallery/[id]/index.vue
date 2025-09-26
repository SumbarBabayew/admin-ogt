<script setup>
import { ref } from 'vue';
import MImageUpload from "@/components/base/MImageUpload.vue"
import MTextField from "@/components/base/MTextField.vue"
import MTextArea from "@/components/base/MTextArea.vue"
import Loading from '~~/components/base/Loading.vue';
import {
  addGallery,
  getGallery,
  uploadGalleryImage,
  uploadGalleryCoverImage,
  getEvents
} from "@/service/admin.api";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const error = ref(false)
const loading = ref(false)
const addLoading = ref(false)
const cover = ref(null)
const images = ref([])
const setPathImage = (c) => cover.value = c[0]
const setPathImages = (c) => { images.value = c }

const gallery = ref({
  title: null,
  orderNumber: null,
  cover: '',
  images: [],
  eventId: null
})

const ADDorEDIT = async () => {
  let galleryImages = ref([])
  if (!gallery.value.title || !gallery.value.orderNumber) return error.value = true
  addLoading.value = true
  if (route.params.id == 0) {
    await addGallery({ data: gallery.value, id: route.params.id }).then(async res => {
      await uploadGalleryCoverImage({ id: res.data.id, data: { file: cover.value } })
      await uploadGalleryImage({ id: res.data.id, data: { files: images.value } })
      router.go(-1)
    }).catch(error => { console.log(error) })
  }
  else {
    gallery.value.images.filter(img => { if (img[0] != 'd') galleryImages.value.push(img) })
    gallery.value.images = galleryImages.value
    await addGallery({ data: gallery.value, id: route.params.id }).then(async () => {
      if (cover.value) await uploadGalleryCoverImage({ id: route.params.id, data: { file: cover.value } })
      if (typeof images.value[0] == 'object') {
        gallery.value.images.forEach(image => images.value.unshift(image))
        await uploadGalleryImage({ id: route.params.id, data: { files: images.value } })
      }
      router.go(-1)
    })
  }
  addLoading.value = false
}
const events = ref([]);
const fetchData = async () => {
  const event = await getEvents({ limit: 100 });
  events.value = event.data;
};
onMounted(async () => {
  await fetchData()
  if (route.params.id != 0) {
    const { data } = await getGallery({ id: route.params.id })
    gallery.value = data
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
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} gallery</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>

        <v-row class="mt-3">
          <v-col cols="6" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Title`" :error="!gallery.title && error"
              v-model="gallery.title"></m-text-field>
          </v-col>
          <v-col cols="6" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Order number`" :error="!gallery.orderNumber && error"
              v-model="gallery.orderNumber"></m-text-field>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <v-select
              label="Select event"
              :items="events.data"
              :error="!gallery.eventId && error"
              required
              item-title="name"
              v-model="gallery.eventId"
              item-value="id"
              variant="outlined"
              :return-object="false"
            ></v-select>
          </v-col>
          <v-col lg="6" sm="12">
            <m-image-upload :width="'width:100%'" :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: gallery.cover }" :error="error && !cover" :selectedFile="cover"
              @photoPath="setPathImage" :placeholder="'Surat'"></m-image-upload>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <m-image-upload :error="error && gallery.images.length == 0" :selectedFile="gallery.images"
              :photoSrc="{ type: 'array', value: gallery.images }" :type="'gallery'" @photoPath="setPathImages"
              :multiple="true" :deleteImageById="route.params.id" :placeholder="'Suratlar'" :width="'108px'"
              :height="'100px'"></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3 ">
        <!-- <input type="checkbox" v-model="product.isVisible" :value="product.isVisible"> -->
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" @click="ADDorEDIT" :loading="addLoading">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} gallery</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>

    </v-card>
  </div>
</template>
