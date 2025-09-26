<script setup>
import { ref, onMounted } from "vue";
import { baseUrl } from "@/data/dashboard/BaseUrl";
import MTextField from "../../../components/base/MTextField.vue";
import MImageUpload from "@/components/base/MImageUpload.vue";
import {
  addEvent,
  getEvent,
  uploadEventLogo,
  uploadEventBanner,
} from "@/service/admin.api";
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
const logo = ref(null);
const banner = ref(null);

const setPathImage = (c) => (logo.value = c[0]);
const setBannerPath = (c) => (banner.value = c[0]);

const item = ref({
  name: null,
  subtitle: null,
  fbTopic: null,
  color: null,
  date: null,
  logo: "",
  banner: "",
  floorPlanEnabled: false,
  exhibitorsEnabled: false,
  registerEnabled: false,
  visaEnabled: false,
  accomodationEnabled: false,
  flightEnabled: false,
  culturalEnabled: false,
  orderNumber: null,
  isVisible: false,
  pptPortalLink: null,
  agendaIsReady: false,
  PDFlink: null,
  zoomLive: false,   // ✅ новое поле
  zoomUrl: null,     // ✅ новое поле
});

const ADDorEDIT = async () => {
  if (!item.value.name) return (error.value = true);
  loadingAdd.value = true;

  await addEvent({ data: item.value, id: route.params.id })
    .then(async (res) => {
      if (logo.value)
        await uploadEventLogo({ data: { file: logo.value }, id: route.params.id });
      if (banner.value)
        await uploadEventBanner({ data: { file: banner.value }, id: route.params.id });
      loadingAdd.value = false;
      router.go(-1);
    })
    .catch((error) => {
      alert(error);
    });
};

onMounted(async () => {
  if (route.params.id != 0) {
    loading.value = true;
    const { data } = await getEvent({ id: route.params.id });
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
          <v-card-title class="text-h5">
            {{ route.params.id == 0 ? "Add" : "Edit" }} event
          </v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>

        <!-- Visible -->
        <v-col cols="12" lg="12" sm="13">
          <input
            type="checkbox"
            v-model="item.isVisible"
            :value="item.isVisible"
            aria-label="Hello"
          />
          Visible to users
        </v-col>

        <!-- Agenda is ready -->
        <v-col cols="12" lg="12" sm="13" class="my-2">
          <input
            type="checkbox"
            v-model="item.agendaIsReady"
            :value="item.agendaIsReady"
            aria-label="Agenda is ready"
          />
          Agenda is ready
        </v-col>

        <!-- ✅ Zoom Live -->
        <v-col cols="12" lg="12" sm="13" class="my-2">
          <input
            type="checkbox"
            v-model="item.enableZoomLive"
            :value="item.enableZoomLive"
            aria-label="Zoom Live"
          />
          Enable Zoom Live
        </v-col>

        <v-row class="mt-3">
          <v-col cols="2">
            <m-text-field
              :type="'text'"
              :label="`Name`"
              :error="!item.name && error"
              v-model="item.name"
            ></m-text-field>
          </v-col>
          <v-col cols="10">
            <m-text-field
              :type="'text'"
              :label="`Subtitle`"
              :error="!item.subtitle && error"
              v-model="item.subtitle"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Firebase topic`"
              :error="!item.fbTopic && error"
              v-model="item.fbTopic"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`HEX color code`"
              :error="!item.color && error"
              v-model="item.color"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`Date`"
              :error="!item.date && error"
              v-model="item.date"
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
              :type="'text'"
              :label="`Presentation portal link`"
              :error="!item.pptPortalLink && error"
              v-model="item.pptPortalLink"
            ></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field
              :type="'text'"
              :label="`PDF for agenda`"
              :error="!item.PDFlink && error"
              v-model="item.PDFlink"
            ></m-text-field>
          </v-col>

          <v-col cols="12" lg="12" sm="13" v-if="item.enableZoomLive">
            <m-text-field
              :type="'text'"
              :label="`Zoom URL`"
              :error="!item.zoomUrl && error"
              v-model="item.zoomUrl"
            ></m-text-field>
          </v-col>
          <!-- ✅ конец Zoom блока -->

          <!-- Checkboxes -->
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
              v-model="item.exhibitorsEnabled"
              :value="item.exhibitorsEnabled"
              aria-label="Hello "
            />
            Exhibitors
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
          <v-col cols="12" lg="12" sm="13">
            <input
              type="checkbox"
              v-model="item.culturalEnabled"
              :value="item.culturalEnabled"
              aria-label="Hello "
            />
            Cultural programme
          </v-col>

          <!-- Images -->
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
          :loading="loadingAdd"
          @click="ADDorEDIT"
        >
          <span class="mr-2">{{ route.params.id == 0 ? "Add" : "Edit" }} event </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
