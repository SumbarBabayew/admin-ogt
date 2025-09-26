<script setup>
import { ref } from "vue";
import MImageUpload from "@/components/base/MImageUpload.vue";
import MTextField from "@/components/base/MTextField.vue";
import Loading from "~~/components/base/Loading.vue";
import { editAppConfig, uploadAppImage, getAppConfig, uploadAppBanner } from "@/service/admin.api";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const error = ref(false);
const loading = ref(false);
const addLoading = ref(false);
const logo = ref(null);
const banner = ref(null);
const setPathImage = (c) => (logo.value = c[0]);
const setBannerPath = (c) => (banner.value = c[0]);
const item = ref({
  conferenceName: null,
  floorPlanEnabled: null,
  registerEnabled: null,
  logo: "",
  banner: "",
  visaEnabled: null,
  accomodationEnabled: null,
  flightEnabled: null,
});

const ADDorEDIT = async () => {
  addLoading.value = true;
  await editAppConfig({ data: item.value, id: route.params.id }).then(async () => {
    if (logo.value) await uploadAppImage({ data: { file: logo.value } });
    if (banner.value) await uploadAppBanner({ data: { file: banner.value } });
    addLoading.value = false;
    // router.go(-1)
  });
};

onMounted(async () => {
  // await fetchData()
  if (route.params.id != 0) {
    const { data } = await getAppConfig();
    item.value = data;
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
          <v-card-title class="text-h5">Edit app config</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>

        <v-row class="mt-3">
          <v-col cols="12" lg="12" sm="13">
            <m-text-field
              :type="'text'"
              :label="`Conference name`"
              :error="!item.conferenceName && error"
              v-model="item.conferenceName"
            ></m-text-field>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <input
              type="checkbox"
              v-model="item.floorPlanEnabled"
              :value="item.floorPlanEnabled"
              aria-label="Hello "
            />
            Floor Plan
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <input
              type="checkbox"
              v-model="item.registerEnabled"
              :value="item.registerEnabled"
              aria-label="Hello "
            />
            Register
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <input
              type="checkbox"
              v-model="item.visaEnabled"
              :value="item.visaEnabled"
              aria-label="Hello "
            />
            Visa
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <input
              type="checkbox"
              v-model="item.accomodationEnabled"
              :value="item.accomodationEnabled"
              aria-label="Hello "
            />
            Accommodation
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <input
              type="checkbox"
              v-model="item.flightEnabled"
              :value="item.flightEnabled"
              aria-label="Hello "
            />
            Flight
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.logo }"
              :error="error && !logo"
              :selectedFile="logo"
              @photoPath="setPathImage"
              :placeholder="'Logo'"
            ></m-image-upload>
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload
              :width="'width:100%'"
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: item.banner }"
              :error="error && !banner"
              :selectedFile="banner"
              @photoPath="setBannerPath"
              :placeholder="'Banner'"
            ></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3">
        <v-btn
          class="profileBtn bg-primary custom-hover-primary"
          variant="text"
          @click="ADDorEDIT"
          :loading="addLoading"
        >
          <span class="mr-2">Edit config</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
