<script setup>
import { ref } from "vue";
import MTextField from "../../../components/base/MTextField.vue";
import { addCompanyToCategory, getParticipantCompanies } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from "~~/components/base/Loading.vue";
const router = useRouter();
const route = useRoute();
const error = ref(false);
const loading = ref(false);
const loadingAdd = ref(false);
const item = ref({
  participantCompanyId: null,
  participantCategoryId: parseInt(route.params.id),
  isExhibitor: false
});
const speakers = ref([]);

const fetchData = async () => {
  const user = await getParticipantCompanies({ limit: 300 });

  speakers.value = user.data;
};
const ADDorEDIT = async () => {
  if (!item.value.participantCompanyId) return (error.value = true);
  loadingAdd.value = true;
  await addCompanyToCategory({ data: item.value })
    .then(async (res) => {
      router.go(-1);
    })
    .catch((error) => {
      alert(error);
    });
};
onMounted(async () => {
  loading.value = true;

  await fetchData();
  loading.value = false;
});
</script>
<template>
  <Loading v-if="loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">Add company to category</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="12" lg="12" sm="13">
            <v-select
              label="Select company"
              :items="speakers.data"
              :error="!item.participantCompanyId && error"
              required
              item-title="nameEn"
              v-model="item.participantCompanyId"
              item-value="id"
              variant="outlined"
              :return-object="false"
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6" sm="13">
            <input
              type="checkbox"
              v-model="item.isExhibitor"
              :value="item.isExhibitor"
              aria-label="Hello "
            />
            Is exhibitor
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
          <span class="mr-2">Add company</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
