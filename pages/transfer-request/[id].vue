<script setup>
import { ref } from "vue";
import { baseUrl } from "@/data/dashboard/BaseUrl";
import MTextField from "../../components/base/MTextField.vue";
import {
  addTransferRequest,
  getTransferRequest,
  getTransfers,
  getTransferFeatures,
  getEvents,
} from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from "~~/components/base/Loading.vue";
const router = useRouter();
const route = useRoute();
const error = ref(false);
const loading = ref(false);
const loadingAdd = ref(false);
const item = ref({
  firstName: null,
  lastName: null,
  email: null,
  company: null,
  eventId: null,
});
// const transfers = ref([]);
// const transferFeatures = ref([]);
const events = ref([]);

const fetchData = async () => {
  // const transfer = await getTransfers({ limit: 100 });
  // const transferFeature = await getTransferFeatures({
  //   limit: 100,
  //   transferId: item.value.transferFeatureId,
  // });
  const event = await getEvents({ limit: 100 });

  // transfers.value = transfer.data;
  events.value = event.data;
  // transferFeatures.value = transferFeature.data;
};
const ADDorEDIT = async () => {
  // if (
  //     !item.value.firstName ||
  //     !item.value.lastName ||
  //     !item.value.phone ||
  //     !item.value.email ||
  //   ) return error.value = true;
  loadingAdd.value = true;

  if (route.params.id == 0) {
    await addTransferRequest({ data: item.value, id: route.params.id })
      .then(async (res) => {
        router.go(-1);
      })
      .catch((error) => {
        alert(error);
      });
  } else {
    await addTransferRequest({ data: item.value, id: route.params.id })
      .then(async (res) => {
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
    const { data } = await getTransferRequest({ id: route.params.id });
    // item.value = data;
    item.value.firstName = data.firstName;
    item.value.lastName = data.lastName;
    item.value.phone = data.phone;
    item.value.email = data.email;
    item.value.company = data.company;
    item.value.eventId = data.eventId;

    item.value.transferFeatureId = data.transferFeatureId;
    item.value.transferId = data.transferFeature.transfer.id;
    await fetchData();


    loading.value = false;
  } else {
    await fetchData();
  }
});
</script>
<template>
  <Loading v-if="loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">{{
            route.params.id == 0 ? "Add" : "Edit"
          }}</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Firstname`"
              :error="!item.firstName && error"
              v-model="item.firstName"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Lastname`"
              :error="!item.lastName && error"
              v-model="item.lastName"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Phone`"
              :error="!item.phone && error"
              v-model="item.phone"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Email`"
              :error="!item.email && error"
              v-model="item.email"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Company`"
              :error="!item.company && error"
              v-model="item.company"
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
          <!-- <v-col cols="6" lg="6" sm="13">
            <v-select
              label="Select transfer"
              :items="transfers.data"
              :error="!item.transferId && error"
              required
              item-title="nameEn"
              v-model="item.transferId"
              item-value="id"
              variant="outlined"
              :return-object="false"
            ></v-select>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <v-select
              label="Select tarif"
              :items="transferFeatures.data"
              :error="!item.transferFeatureId && error"
              required
              item-title="nameEn"
              v-model="item.transferFeatureId"
              item-value="id"
              variant="outlined"
              :return-object="false"
            ></v-select>
          </v-col> -->
        </v-row>
      </v-card-item>

      <div class="d-flex justify-end pb-3">
        <v-btn
          class="profileBtn bg-primary custom-hover-primary"
          variant="text"
          :loading="loadingAdd"
          @click="ADDorEDIT"
        >
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }} </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
