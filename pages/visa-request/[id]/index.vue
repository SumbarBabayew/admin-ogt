<script setup >
import { ref } from 'vue';
import { baseUrl } from '@/data/dashboard/BaseUrl';
import MTextField from "../../../components/base/MTextField.vue"
import { addDelegate, getVisaRequest, getHotels } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from '~~/components/base/Loading.vue';
import JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from '@elastic/filesaver'
const router = useRouter();
const route = useRoute();
const error = ref(false)
const loading = ref(false)
const loadingAdd = ref(false)
const item = ref({
  firstName: null,
  lastName: null,
  position: null,
  email: null,
  phone: null,
  gender: null,
  birthDate: null,
  birthPlace: null,
  nationality: null,
  passportNumber: null,
  issueDate: null,
  expiryDate: null,
  education: null,
  homeAddress: null,
  visitPurpose: null,
  partnerPhone: null,
  companyCountry: null,
  photo: null,
  passports: null
})
const speakers = ref([])

const fetchData = async () => {
  const speaker = await getHotels({ limit: 100 })

  speakers.value = speaker.data
}
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.firstName || !item.value.lastName || !item.value.phone || !item.value.email || !item.value.position || !item.value.organisation) return error.value = true
    loadingAdd.value = true
    await addDelegate({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
  else {
    if (!item.value.firstName || !item.value.lastName || !item.value.phone || !item.value.email || !item.value.position || !item.value.organisation) return error.value = true
    loadingAdd.value = true

    await addDelegate({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
}
function urlToPromise(url) {
  return new Promise(function (resolve, reject) {
    JSZipUtils.getBinaryContent(url, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
const download = async () => {
  if (item.value.passports == null && item.value.passports.length == 0) return;
  const zip = new JSZip()
  // for (let i = 0; i < item.value.passports.length; i++) {
  //   const img = `${baseUrl.url_base}/${item.value.passports[i]}`
  //   // var img = zip.folder("images");
  //   zip.file(img.split('/')[img.split('/').length - 1], img);
  // // img.file("smile.gif", imgData, { base64: true });
  // }
  // zip.generateAsync({ type: "blob" })
  //   .then(function (content) {
  //     console.log(content)
  //     // see FileSaver.js
  //     saveAs(content, "example.zip");
  //   });
  item.value.passports.forEach(function (url, index) {
    var filename = url.split('/')[url.split('/').length - 1]
    // var filename = "element" + index + ".png";
    zip.file(filename, urlToPromise(`${baseUrl.url_base}${url}`), { binary: true });
  });
  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, `delegate-${item.value.firstName} ${item.value.lastName}.zip`);
  });
}
const downloadImg = () => {
  let url = `${baseUrl.url_base}${item.value.photo.substring(1)}`;
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      saveAs(blob, `${item.value.firstName} ${item.value.lastName} ${item.value.photo.split('/')[item.value.photo.split('/').length - 1]}`);
    });
  console.log('downloading', url);
}
onMounted(async () => {
  await fetchData();
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getVisaRequest({ id: route.params.id })
    item.value = data
    loading.value = false
  }
})
</script>
<template>
  <Loading v-if="loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} delegate</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Firstname`" :error="!item.firstName && error"
              v-model="item.firstName"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Lastname`" :error="!item.lastName && error"
              v-model="item.lastName"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Gender`" :error="!item.gender && error"
              v-model="item.gender"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Position`" :error="!item.position && error"
              v-model="item.position"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Phone`" :error="!item.phone && error"
              v-model="item.phone"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Email`" :error="!item.email && error"
              v-model="item.email"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Nationality`" :error="!item.nationality && error"
              v-model="item.nationality"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Birthday`" :error="!item.birthDate && error"
              v-model="item.birthDate"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Birthplace`" :error="!item.birthPlace && error"
              v-model="item.birthPlace"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Country of company`" :error="!item.companyCountry && error"
              v-model="item.companyCountry"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Education`" :error="!item.education && error"
              v-model="item.education"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Visit purpose`" :error="!item.visitPurpose && error"
              v-model="item.visitPurpose"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Passport number`" :error="!item.passportNumber && error"
              v-model="item.passportNumber"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Passport issued on`" :error="!item.issueDate && error"
              v-model="item.issueDate"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Passport expire on`" :error="!item.expiryDate && error"
              v-model="item.expiryDate"></m-text-field>
          </v-col>
          
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Full home addr`" :error="!item.homeAddress && error"
              v-model="item.homeAddress"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Local partner phone`" :error="!item.partnerPhone && error"
              v-model="item.partnerPhone"></m-text-field>
          </v-col>
          <!-- <v-col cols="6" lg="6" sm="13">
            <v-select label="Participation Type" :items="speakers.data" :error="!item.hotelId && error" 
              item-title="nameEn" v-model="item.hotelId" item-value="id" variant="outlined"
              :return-object="false"></v-select>
          </v-col>
          <v-col cols="6" lg="6" sm="13">
            <v-select label="Participation Format" :items="speakers.data" :error="!item.hotelId && error" 
              item-title="nameEn" v-model="item.hotelId" item-value="id" variant="outlined"
              :return-object="false"></v-select>
          </v-col> -->
          <div class="d-flex justify-end pb-3 ">
            <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd"
              @click="downloadImg">
              <span class="mr-2">Download image</span>
              <!-- <span class="mr-2">Download image</span> -->
              <ScriptPlusIcon />
            </v-btn>
          </div>
          <div class="d-flex justify-end pb-3 ">
            <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd"
              @click="download">
              <span class="mr-2">Download files</span>
              <ScriptPlusIcon />
            </v-btn>
          </div>
        </v-row>
      </v-card-item>


      <div class="d-flex justify-end pb-3 ">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd" @click="ADDorEDIT">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} delegate </span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
