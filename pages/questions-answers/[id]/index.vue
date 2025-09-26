<script setup>
import { ref } from "vue";
import { baseUrl } from "@/data/dashboard/BaseUrl";
import MTextField from "../../../components/base/MTextField.vue";
import { addQuestionAnswer, getQuestionAnswer, getEvents } from "@/service/admin.api";
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
const item = ref({
  questionEn: "",
  questionRu: "",
  questionX: "",
  answerEn: "",
  answerRu: "",
  answerX: "",
  orderNumber: "",
  eventId: null
});

const events = ref([]);
const fetchData = async () => {
  const event = await getEvents({ limit: 100 });
  events.value = event.data;
};
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.questionEn || !item.value.questionRu) return (error.value = true);
    loadingAdd.value = true;
    await addQuestionAnswer({ data: item.value, id: route.params.id })
      .then(async (res) => {
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    if (!item.value.questionEn || !item.value.questionRu) return (error.value = true);
    loadingAdd.value = true;

    await addQuestionAnswer({ data: item.value, id: route.params.id })
      .then(async (res) => {
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  }
};
onMounted(async () => {
  await fetchData();
  if (route.params.id != 0) {
    loading.value = true;
    const { data } = await getQuestionAnswer({ id: route.params.id });
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
            >{{ route.params.id == 0 ? "Add" : "Edit" }} Q\A</v-card-title
          >
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="12" lg="12">
            <m-text-field
              :type="'text'"
              :label="`Question EN`"
              :error="!item.questionEn && error"
              v-model="item.questionEn"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <m-text-field
              :type="'text'"
              :label="`Question RU`"
              :error="!item.questionRu && error"
              v-model="item.questionRu"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="12">
            <m-text-field
              :type="'text'"
              :label="`Question X`"
              :error="!item.questionX && error"
              v-model="item.questionX"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Answer EN`"
              :error="!item.answerEn && error"
              v-model="item.answerEn"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Answer RU`"
              :error="!item.answerRu && error"
              v-model="item.answerRu"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Answer X`"
              :error="!item.answerX && error"
              v-model="item.answerX"
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
          <v-col cols="6" lg="6" sm="13">
            <v-select
              label="Select speaker"
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
        </v-row>
      </v-card-item>

      <div class="d-flex justify-end pb-3">
        <v-btn
          class="profileBtn bg-primary custom-hover-primary"
          variant="text"
          :loading="loadingAdd"
          @click="ADDorEDIT"
        >
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }} Q\A </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
