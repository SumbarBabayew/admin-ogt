<script setup>
import { ref } from "vue";
import MTextArea from "@/components/base/MTextArea.vue";
import MTextField from "@/components/base/MTextField.vue";
import Loading from "~~/components/base/Loading.vue";

import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const error = ref(false);
const loading = ref(false);

const addLoading = ref(false);
import { getAboutConference, addAboutConference, getEvents } from "@/service/admin.api";

const events = ref([]);
const fetchData = async () => {
  const event = await getEvents({ limit: 100 });
  events.value = event.data;
};

const item = ref({
  titleX: null,
  titleRu: null,
  titleEn: null,
  bodyX: null,
  bodyRu: null,
  bodyEn: null,
  eventId: null,
});
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.bodyX || !item.value.bodyRu || !item.value.bodyEn)
      return (error.value = true);
    addLoading.value = true;
    await addAboutConference({ data: item.value, id: route.params.id })
      .then(async (res) => {
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    if (!item.value.bodyX || !item.value.bodyRu || !item.value.bodyEn)
      return (error.value = true);
    addLoading.value = true;

    await addAboutConference({ data: item.value, id: route.params.id })
      .then(async (res) => {
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  }
};
onMounted(async () => {
  loading.value = true;
  await fetchData();
  if (route.params.id != 0) {
    const { data } = await getAboutConference({ id: route.params.id });
    item.value = data;
  }
  loading.value = false;
});
</script>
<template>
  <Loading v-if="loading" />
  <div>
    <v-card elevation="10" class="withbg px-3">
      <v-card-title>About Conference</v-card-title>

      <v-col cols="12" lg="12" sm="13">
        <m-text-field
          :type="'text'"
          :label="`Title (EN)`"
          :error="!item.titleEn && error"
          v-model="item.titleEn"
        ></m-text-field>
      </v-col>
      <v-col cols="12" lg="12" sm="13">
        <m-text-field
          :type="'text'"
          :label="`Title (RU)`"
          :error="!item.titleRu && error"
          v-model="item.titleRu"
        ></m-text-field>
      </v-col>
      <v-col cols="12" lg="12" sm="13">
        <m-text-field
          :type="'text'"
          :label="`Title (X)`"
          :error="!item.titleX && error"
          v-model="item.titleX"
        ></m-text-field>
      </v-col>
      <v-col lg="12" sm="12">
        <m-text-area
          :type="'text'"
          :label="`Details (EN)`"
          :error="!item.bodyEn && error"
          v-model="item.bodyEn"
        ></m-text-area>
      </v-col>

      <v-col lg="12" sm="12">
        <m-text-area
          :type="'text'"
          :label="`Details (RU)`"
          :error="!item.bodyRu && error"
          v-model="item.bodyRu"
        ></m-text-area>
      </v-col>
      <v-col lg="12" sm="12">
        <m-text-area
          :type="'text'"
          :label="`Details (X)`"
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
      <div class="d-flex justify-end py-3">
        <v-btn
          class="profileBtn bg-primary custom-hover-primary"
          variant="text"
          @click="ADDorEDIT"
          :loading="addLoading"
        >
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }}</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
