<script setup>
import { ref } from "vue";
import { baseUrl } from "@/data/dashboard/BaseUrl";
import MTextField from "../../../components/base/MTextField.vue";
import MTextArea from "@/components/base/MTextArea.vue";
import MImageUpload from "@/components/base/MImageUpload.vue";
import { addParticipantCompany, getParticipantCompany, uploadParticipantCompanyImage } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from "~~/components/base/Loading.vue";
import { saveAs } from "@elastic/filesaver";
const router = useRouter();
const route = useRoute();
const error = ref(false);
const loading = ref(false);
const loadingAdd = ref(false);
const image = ref(null);

const setLogoPath = (c) => (image.value = c[0]);

const item = ref({
  nameEn: null,
  nameRu: null,
  nameX: null,
  infoEn: null,
  infoRu: null,
  infoX: null,
  siteUrl: null,
  image: null,
  orderNumber: null,
  customId: null,
  companyCategoryId: null,
});

// categories list
const categories = ref([]);

const loadCategories = async () => {
  const { data } = await axios.get("/api/v1/admin/company-categories");
  categories.value = data;
};

const ADDorEDIT = async () => {
  if (!item.value.nameEn || !item.value.nameRu) return (error.value = true);
    loadingAdd.value = true;
  if (route.params.id == 0) {
    await addParticipantCompany({ data: item.value, id: route.params.id })
      .then(async (res) => {
        if (image.value) await uploadParticipantCompanyImage({ data: { file: image.value }, id: res.data.id });
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    await addParticipantCompany({ data: item.value, id: route.params.id })
      .then(async (res) => {
        if (image.value) await uploadParticipantCompanyImage({ data: { file: image.value }, id: route.params.id });
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  }
};
onMounted(async () => {
  if (route.params.id != 0) {
    loading.value = true;
    const { data } = await getParticipantCompany({ id: route.params.id });
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
            >{{ route.params.id == 0 ? "Add" : "Edit" }} company</v-card-title
          >
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="6" lg="4" sm="4">
            <m-text-field
              :type="'text'"
              :label="`Title EN`"
              :error="!item.nameEn && error"
              v-model="item.nameEn"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="4" sm="4">
            <m-text-field
              :type="'text'"
              :label="`Title RU`"
              :error="!item.nameRu && error"
              v-model="item.nameRu"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="4" sm="4">
            <m-text-field
              :type="'text'"
              :label="`Title X`"
              :error="!item.nameX && error"
              v-model="item.nameX"
            ></m-text-field>
          </v-col>
          <v-col lg="12" sm="12">
            <m-text-area
              :type="'text'"
              :label="`Details (EN)`"
              :error="!item.infoEn && error"
              v-model="item.infoEn"
            ></m-text-area>
          </v-col>
          <v-col lg="12" sm="12">
            <m-text-area
              :type="'text'"
              :label="`Details (RU)`"
              :error="!item.infoRu && error"
              v-model="item.infoRu"
            ></m-text-area>
          </v-col>
          <v-col lg="12" sm="12">
            <m-text-area
              :type="'text'"
              :label="`Details (X)`"
              :error="!item.infoX && error"
              v-model="item.infoX"
            ></m-text-area>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Website`"
              :error="!item.siteUrl && error"
              v-model="item.siteUrl"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Order number`"
              :error="!item.orderNumber && error"
              v-model="item.orderNumber"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'number'"
              :label="`Custom ID`"
              :error="!item.customId && error"
              v-model="item.customId"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="4" sm="4">
          <v-select
            v-model="item.companyCategoryId"
            :items="categories"
            item-value="id"
            item-title="name_ru"  
            label="Категория"
            clearable
            :error="!item.companyCategoryId && error"
          />
        </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.image }"
              :error="error && !image"
              :selectedFile="image"
              @photoPath="setLogoPath"
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
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }} company </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
