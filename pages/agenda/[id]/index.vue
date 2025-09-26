<script setup>
import { ref } from "vue";
import { baseUrl } from "@/data/dashboard/BaseUrl";
import MTextField from "../../../components/base/MTextField.vue";
import { addAgenda, getAgenda, getSessions, getEvents } from "@/service/admin.api";
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
  time: null,
  isBreak: false,
  breakEn: null,
  breakRu: null,
  breakX: null,
  orderNumber: null,
  eventId: null
});
const speakers = ref([]);
const events = ref([]);
const fetchData = async () => {
  const speaker = await getSessions({ limit: 100 });

  speakers.value = speaker.data;

  const event = await getEvents({limit: 100});
  events.value = event.data;
};
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.time) return (error.value = true);
    loadingAdd.value = true;
    await addAgenda({ data: item.value, id: route.params.id })
      .then(async (res) => {
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    if (!item.value.time) return (error.value = true);
    loadingAdd.value = true;

    await addAgenda({ data: item.value, id: route.params.id })
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
    const { data } = await getAgenda({ id: route.params.id });
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
            >{{ route.params.id == 0 ? "Add" : "Edit" }} agenda</v-card-title
          >
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="12" lg="6" sm="13">
            <v-select
              label="Select session"
              :items="speakers.data"
              :error="!item.sessionId && error"
              required
              item-title="nameEn"
              v-model="item.sessionId"
              item-value="id"
              variant="outlined"
              :return-object="false"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Time`"
              placeholder='15.06/10:00-12:00'
              :error="!item.time && error"
              v-model="item.time"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="6" sm="13">
              <input
                type="checkbox"
                v-model="item.isBreak"
                :value="item.isBreak"
                aria-label="Hello "
              />
              Is break
            </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Break EN`"
              :error="!item.breakEn && error"
              v-model="item.breakEn"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Break RU`"
              :error="!item.breakRu && error"
              v-model="item.breakRu"
            ></m-text-field>
          </v-col>
          <v-col cols="12">
            <m-text-field
              :type="'text'"
              :label="`Break X`"
              :error="!item.breakX && error"
              v-model="item.breakX"
            ></m-text-field>
          </v-col>
          <v-col cols="4">
            <m-text-field
              :type="'text'"
              :label="`Order number`"
              :error="!item.orderNumber && error"
              v-model="item.orderNumber"
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
        </v-row>
      </v-card-item>

      <div class="d-flex justify-end pb-3">
        <v-btn
          class="profileBtn bg-primary custom-hover-primary"
          variant="text"
          :loading="loadingAdd"
          @click="ADDorEDIT"
        >
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }} agenda </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
