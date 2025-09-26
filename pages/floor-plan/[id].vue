<script setup>
import { ref } from "vue";
import MTextArea from "@/components/base/MTextArea.vue";
import MTextField from "@/components/base/MTextField.vue";
import Loading from "~~/components/base/Loading.vue";
import MImageUpload from "@/components/base/MImageUpload.vue";

const error = ref(false);
const loading = ref(false);
const imageEn = ref(null);
const imageRu = ref(null);
const imageX = ref(null);
const setPathImageEn = (c) => (imageEn.value = c[0]);
const setPathImageRu = (c) => (imageRu.value = c[0]);
const setPathImageX = (c) => (imageX.value = c[0]);

const addLoading = ref(false);
import {
  getFloorPlan,
  addFloorPlan,
  uploadFloorPlanImage,
  getEvents,
} from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const item = ref({
  imageEn: "",
  imageRu: "",
  imageX: "",
  nationalCount: null,
  internationalCount: 0,
  turkmenCount: 0,
  netCount: 0,
  eventId: null,
});

const events = ref([]);
const fetchData = async () => {
  const event = await getEvents({ limit: 100 });
  events.value = event.data;
};

const ADDorEDIT = async () => {
  if (
    !item.value.nationalCount ||
    !item.value.internationalCount ||
    !item.value.turkmenCount ||
    !item.value.netCount
  )
    return (error.value = true);
  addLoading.value = true;
  if (route.params.id == 0) {
    await addFloorPlan({ data: item.value, id: route.params.id })
      .then(async (res) => {

        // if(imageEn.value) await uploadFloorPlanImage({ id: res.data.id, data: { file: imageEn.value }, lang: 'en' });
        // if(imageRu.value) await uploadFloorPlanImage({ id: res.data.id, data: { file: imageRu.value }, lang: 'ru' });
        // if(imageX.value) await uploadFloorPlanImage({ id: res.data.id, data: { file: imageX.value }, lang: 'x' });
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    await addFloorPlan({ data: item.value, id: route.params.id })
      .then(async () => {
        //if (imageEn.value) await uploadFloorPlanImage({ id: route.params.id, data: { file: imageEn.value }, lang: 'en' });
        //if (imageRu.value) await uploadFloorPlanImage({ id: route.params.id, data: { file: imageRu.value }, lang: 'ru' });
        //if (imageX.value) await uploadFloorPlanImage({ id: route.params.id, data: { file: imageX.value }, lang: 'x' });
      })
      .finally(() => {
        addLoading.value = false;
        router.go(-1);

      });
  }

  addLoading.value = false;
};
onMounted(async () => {
  loading.value = true;
  await fetchData();
  const { data } = await getFloorPlan({ id: route.params.id });
  item.value = data;
  console.log("image is ", item.value.image);
  loading.value = false;
});
</script>
<template>
  <Loading v-if="loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg px-3">
      <v-card-item>
        <v-card-title>Floor Plan</v-card-title>
        <v-row class="mt-3">
          <v-col cols="6" lg="6" sm="13">
            <m-text-field
              :type="'text'"
              :label="`National Companies`"
              :error="!item.nationalCount && error"
              v-model="item.nationalCount"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <m-text-field
              :type="'text'"
              :label="`International Companies`"
              :error="!item.internationalCount && error"
              v-model="item.internationalCount"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <m-text-field
              :type="'text'"
              :label="`Turkmen Private Companies`"
              :error="!item.turkmenCount && error"
              v-model="item.turkmenCount"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <m-text-field
              :type="'text'"
              :label="`Net`"
              :error="!item.netCount && error"
              v-model="item.netCount"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <v-select
              label="Select event"
              :items="events.data"
              :error="!item.eventId && error"
              required
              item-title="name"
              v-model="item.eventId"
              item-value="id"
              variant="outlined"
              :return-object="false"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <m-text-field
              :type="'text'"
              :label="`English URL`"
              :error="!item.imageEn && error"
              v-model="item.imageEn"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <m-text-field
              :type="'text'"
              :label="`Russian URL`"
              :error="!item.imageRu && error"
              v-model="item.imageRu"
            ></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <m-text-field
              :type="'text'"
              :label="`X URL`"
              :error="!item.imageX && error"
              v-model="item.imageX"
            ></m-text-field>
          </v-col>
          <!-- <v-col lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.imageEn }"
              :error="error && !imageEn"
              :selectedFile="imageEn"
              @photoPath="setPathImageEn"
              :placeholder="'Surat (EN)'"
            ></m-image-upload>
          </v-col>
          <v-col lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.imageRu }"
              :error="error && !imageRu"
              :selectedFile="imageRu"
              @photoPath="setPathImageRu"
              :placeholder="'Surat (RU)'"
            ></m-image-upload>
          </v-col>
          <v-col lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.imageX }"
              :error="error && !imageX"
              :selectedFile="imageX"
              @photoPath="setPathImageX"
              :placeholder="'Surat (X)'"
            ></m-image-upload>
          </v-col> -->
        </v-row>
        <div class="d-flex justify-end py-3">
          <v-btn
            class="profileBtn bg-primary custom-hover-primary"
            variant="text"
            @click="ADDorEDIT"
            :loading="addLoading"
          >
            <span class="mr-2">Edit</span>
            <ScriptPlusIcon />
          </v-btn>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>
