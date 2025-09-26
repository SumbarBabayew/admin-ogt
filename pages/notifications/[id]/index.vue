<script setup>
import { ref } from "vue";
import MTextField from "@/components/base/MTextField.vue";
import MImageUpload from "@/components/base/MImageUpload.vue";
import MTextArea from "@/components/base/MTextArea.vue";
import {
  addNotification,
  uploadNotificationImage,
  getNotification,
  getEvents
} from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from "~~/components/base/Loading.vue";
const router = useRouter();
const route = useRoute();
const error = ref(false);
const image = ref(null);
const loading = ref(false);
const loadingAdd = ref(false);
const setPathImage = (c) => (image.value = c[0]);
const item = ref({
  titleRu: null,
  titleEn: null,
  titleX: null,
  bodyRu: null,
  bodyEn: null,
  bodyX: null,
  image: "",
  eventId: null,
});

const events = ref([]);
const fetchData = async () => {
  const event = await getEvents({ limit: 100 });
  events.value = event.data;
};

const ADDorEDIT = async () => {
  if (!item.value.titleRu || !item.value.titleEn || !item.value.bodyRu)
    return (error.value = true);
  loadingAdd.value = true;
  if (route.params.id == 0) {
    await addNotification({ data: item.value, id: route.params.id })
      .then(async (res) => {
        await uploadNotificationImage({ id: res.data.id, data: { file: image.value } });
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    await addNotification({ data: item.value, id: route.params.id })
      .then(async (res) => {
        if (image.value)
          await uploadNotificationImage({ id: res.data.id, data: { file: image.value } });
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  }
  loadingAdd.value = false;
};
onMounted(async () => {
  await fetchData();
  if (route.params.id != 0) {
    loading.value = true;
    const { data } = await getNotification({ id: route.params.id });
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
            >{{ route.params.id == 0 ? "Add" : "Edit" }} notification</v-card-title
          >
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="12" lg="4">
            <m-text-field
              :type="'text'"
              :label="`Title (EN)`"
              :error="!item.titleEn && error"
              v-model="item.titleEn"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <m-text-field
              :type="'text'"
              :label="`Title (RU)`"
              :error="!item.titleRu && error"
              v-model="item.titleRu"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <m-text-field
              :type="'text'"
              :label="`Title (X)`"
              :error="!item.titleX && error"
              v-model="item.titleX"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="4">
            <m-text-area
              :type="'text'"
              :label="`Body (EN)`"
              :error="!item.bodyEn && error"
              v-model="item.bodyEn"
            ></m-text-area>
          </v-col>
          <v-col cols="12" lg="4">
            <m-text-area
              :type="'text'"
              :label="`Body (RU)`"
              :error="!item.bodyRu && error"
              v-model="item.bodyRu"
            ></m-text-area>
          </v-col>
          <v-col cols="12" lg="4">
            <m-text-area
              :type="'text'"
              :label="`Body (X)`"
              :error="!item.bodyX && error"
              v-model="item.bodyX"
            ></m-text-area>
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
          <v-col lg="12" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.image }"
              :error="error && !image"
              :selectedFile="image"
              @photoPath="setPathImage"
              :placeholder="'Surat'"
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
            >{{ route.params.id == 0 ? "Add" : "Edit" }} notification</span
          >
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
