<script setup>
import { ref } from "vue";
import { baseUrl } from "@/data/dashboard/BaseUrl";
import MTextField from "../../../components/base/MTextField.vue";
import {
  addHotelRoom,
  getHotels,
  getHotelRoom,
  uploadHotelRoomImage,
} from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from "~~/components/base/Loading.vue";
import MImageUpload from "@/components/base/MImageUpload.vue";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "@elastic/filesaver";
const router = useRouter();
const route = useRoute();
const error = ref(false);
const loading = ref(false);
const loadingAdd = ref(false);
const images = ref([])
const setPathImages = (c) => {
  images.value = c;
};

const item = ref({
  nameEn: null,
  nameRu: null,
  nameX: null,
  aboutEn: null,
  aboutRu: null,
  aboutX: null,
  price: null,
  hotelId: null,
  images: [],
});
const speakers = ref([]);

const fetchData = async () => {
  const speaker = await getHotels({ limit: 100 });

  speakers.value = speaker.data;
};
const ADDorEDIT = async () => {
  let galleryImages = ref([]);

  if (!item.value.nameEn || !item.value.nameRu) return (error.value = true);

  loadingAdd.value = true;
  if (route.params.id == 0) {
    await addHotelRoom({ data: item.value, id: route.params.id })
      .then(async (res) => {
        await uploadHotelRoomImage({ id: res.data.id, data: { files: images.value } });
        router.go(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    item.value.images.filter((img) => {
      if (img[0] != "d") galleryImages.value.push(img);
    });
    item.value.images = galleryImages.value;
    await addHotelRoom({ data: item.value, id: route.params.id }).then(async () => {
      if (typeof images.value[0] == "object") {
        item.value.images.forEach((image) => images.value.unshift(image));
        await uploadHotelRoomImage({ id: route.params.id, data: { files: images.value } });
      }
      // router.go(-1)
      loadingAdd.value = false;
    });
  }
};
onMounted(async () => {
  await fetchData();
  if (route.params.id != 0) {
    loading.value = true;
    const { data } = await getHotelRoom({ id: route.params.id });
    item.value = data;
    loading.value = false;
  }
});
</script>
<template>
  <Loading v-if="loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5"
            >{{ route.params.id == 0 ? "Add" : "Edit" }} session</v-card-title
          >
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="6" lg="4">
            <m-text-field
              :type="'text'"
              :label="`Title EN`"
              :error="!item.nameEn && error"
              v-model="item.nameEn"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="4">
            <m-text-field
              :type="'text'"
              :label="`Title RU`"
              :error="!item.nameRu && error"
              v-model="item.nameRu"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="4">
            <m-text-field
              :type="'text'"
              :label="`Title X`"
              :error="!item.nameX && error"
              v-model="item.nameX"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`About EN`"
              :error="!item.aboutEn && error"
              v-model="item.aboutEn"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`About RU`"
              :error="!item.aboutRu && error"
              v-model="item.aboutRu"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`About X`"
              :error="!item.aboutX && error"
              v-model="item.aboutX"
            ></m-text-field>
          </v-col>
          <v-col cols="4">
            <m-text-field
              :type="'text'"
              :label="`Price`"
              :error="!item.price && error"
              v-model="item.price"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <v-select
              label="Select hotel"
              :items="speakers.data"
              :error="!item.hotelId && error"
              required
              item-title="nameEn"
              v-model="item.hotelId"
              item-value="id"
              variant="outlined"
              :return-object="false"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <m-image-upload
              :error="error && item.images.length == 0"
              :selectedFile="item.images"
              :photoSrc="{ type: 'array', value: item.images }"
              :type="'gallery'"
              @photoPath="setPathImages"
              :multiple="true"
              :deleteImageById="route.params.id"
              :placeholder="'Suratlar'"
              :width="'108px'"
              :height="'100px'"
            ></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3">
        <v-btn
          class="profileBtn bg-primary custom-hover-primary"
          variant="text"
          :loading="loadingAdd"
          @click="ADDorEDIT"
        >
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }} room </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
