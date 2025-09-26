<script setup>
import { ref } from "vue";
import { baseUrl } from "@/data/dashboard/BaseUrl";
import MTextField from "../../../components/base/MTextField.vue";
import MImageUpload from "@/components/base/MImageUpload.vue";

import { addOnboarding, getOnboarding, uploadOnboarding } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from "~~/components/base/Loading.vue";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "@elastic/filesaver";
const router = useRouter();
const route = useRoute();
const error = ref(false);
const loading = ref(false);
const loadingAdd = ref(false);
const image = ref(null);

const setImagePath = (c) => (image.value = c[0]);
const item = ref({
  title: null,
  subtitle: null,
  image: "",
  orderNumber: null,
});
const ADDorEDIT = async () => {
  if (!item.value.title || !item.value.subtitle) return (error.value = true);
    loadingAdd.value = true;
  if (route.params.id == 0) {
    await addOnboarding({ data: item.value, id: route.params.id })
      .then(async (res) => {
        if (image.value)
          await uploadOnboarding({
            data: { file: image.value },
            id: res.data.id,
          });
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    await addOnboarding({ data: item.value, id: route.params.id })
      .then(async (res) => {
        if (image.value) await uploadOnboarding({ data: { file: image.value }, id: route.params.id });
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  }
  loadingAdd.value = false;
};
onMounted(async () => {
  if (route.params.id != 0) {
    loading.value = true;
    const { data } = await getOnboarding({ id: route.params.id });
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
              :label="`Title`"
              :error="!item.title && error"
              v-model="item.title"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="8">
            <m-text-field
              :type="'text'"
              :label="`Subtitle`"
              :error="!item.subtitle && error"
              v-model="item.subtitle"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Order number`"
              :error="!item.orderNumber && error"
              v-model="item.orderNumber"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.image }"
              :error="error && !image"
              :selectedFile="image"
              @photoPath="setImagePath"
              :placeholder="'Logo'"
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
          <span class="mr-2"
            >{{ route.params.id == 0 ? "Add" : "Edit" }} onboarding
          </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
