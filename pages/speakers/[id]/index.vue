<script setup>
import { ref } from "vue";
import MImageUpload from "@/components/base/MImageUpload.vue";
import MTextField from "@/components/base/MTextField.vue";
import MTextArea from "@/components/base/MTextArea.vue";
import Loading from "~~/components/base/Loading.vue";
import {
  addSpeaker,
  uploadSpeakerImage,
  uploadSpeakerOrgImage,
  getSpeaker,
} from "@/service/admin.api";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const error = ref(false);
const loading = ref(false);
const addLoading = ref(false);
const image = ref(null);
const orgLogo = ref(null);
const setPathImage = (c) => (image.value = c[0]);
const setPathOrg = (c) => (orgLogo.value = c[0]);
const product = ref({
  nameRu: null,
  nameEn: null,
  nameX: null,
  descriptionRu: null,
  descriptionEn: null,
  descriptionX: null,
  positionRu: null,
  positionEn: null,
  positionX: null,
  orderNumber: null,
  image: "",
  orgLogo: ""
});

const ADDorEDIT = async () => {
  if (
    !product.value.nameRu ||
    !product.value.nameEn ||
    !product.value.descriptionEn ||
    !product.value.descriptionRu ||
    !product.value.positionEn ||
    !product.value.positionRu
  )
    return (error.value = true);

  addLoading.value = true;
  if (route.params.id == 0) {
    await addSpeaker({ data: product.value, id: route.params.id })
      .then(async (res) => {
        await uploadSpeakerImage({ id: res.data.id, data: { file: image.value } });
        await uploadSpeakerOrgImage({ id: res.data.id, data: { file: orgLogo.value } });
        router.go(-1);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    await addSpeaker({ data: product.value, id: route.params.id }).then(async () => {
      if (image.value)
        await uploadSpeakerImage({ id: route.params.id, data: { file: image.value } });
      if (orgLogo.value)
        await uploadSpeakerOrgImage({
          id: route.params.id,
          data: { file: orgLogo.value },
        });
      router.go(-1);
    });
  }
};

onMounted(async () => {
  // await fetchData()
  if (route.params.id != 0) {
    const { data } = await getSpeaker({ id: route.params.id });
    product.value = data;
  }
  loading.value = true;
});
</script>
<template>
  <Loading v-if="!loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg px-3">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5"
            >{{ route.params.id == 0 ? "Add" : "Edit" }} speaker</v-card-title
          >
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>

        <v-row class="mt-3">
          <v-col cols="12" lg="4" sm="13">
            <m-text-field
              :type="'text'"
              :label="`Fullname (EN)`"
              :error="!product.nameEn && error"
              v-model="product.nameEn"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field
              :type="'text'"
              :label="`Fullname (RU)`"
              :error="!product.nameRu && error"
              v-model="product.nameRu"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field
              :type="'text'"
              :label="`Fullname (X)`"
              :error="!product.nameX && error"
              v-model="product.nameX"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-area
              :type="'text'"
              :label="`Position(EN)`"
              :error="!product.positionEn && error"
              v-model="product.positionEn"
            ></m-text-area>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-area
              :type="'text'"
              :label="`Position(RU)`"
              :error="!product.positionRu && error"
              v-model="product.positionRu"
            ></m-text-area>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-area
              :type="'text'"
              :label="`Position(X)`"
              :error="!product.positionX && error"
              v-model="product.positionX"
            ></m-text-area>
          </v-col>
          <!-- Descriptions -->
          <v-col cols="12" lg="4" sm="13">
            <m-text-area
              :type="'text'"
              :label="`Biography (EN)`"
              :error="!product.descriptionEn && error"
              v-model="product.descriptionEn"
            ></m-text-area>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-area
              :type="'text'"
              :label="`Biography (RU)`"
              :error="!product.descriptionRu && error"
              v-model="product.descriptionRu"
            ></m-text-area>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-area
              :type="'text'"
              :label="`Biography (X)`"
              :error="!product.descriptionX && error"
              v-model="product.descriptionX"
            ></m-text-area>
          </v-col>
          <v-col cols="12" lg="12" sm="12">
            <m-text-field
              :type="'text'"
              :label="`Order number`"
              :error="!product.orderNumber && error"
              v-model="product.orderNumber"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: product.image }"
              :error="error && !image"
              :selectedFile="image"
              @photoPath="setPathImage"
              :placeholder="'Surat'"
            ></m-image-upload>
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: product.orgLogo }"
              :error="error && !orgLogo"
              :selectedFile="orgLogo"
              @photoPath="setPathOrg"
              :placeholder="'Organization'"
            ></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3">
        <!-- <input type="checkbox" v-model="product.isVisible" :value="product.isVisible"> -->
        <v-btn
          class="profileBtn bg-primary custom-hover-primary"
          variant="text"
          @click="ADDorEDIT"
          :loading="addLoading"
        >
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }} speaker</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
