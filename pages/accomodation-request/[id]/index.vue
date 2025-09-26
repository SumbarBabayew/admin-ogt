<script setup >
import { ref } from 'vue';
import MTextField from "../../../components/base/MTextField.vue"
import { addAccomodationRequest, getAccomodationRequest, getHotels } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from '~~/components/base/Loading.vue';
const router = useRouter();
const route = useRoute();
const error = ref(false)
const loading = ref(false)
const loadingAdd = ref(false)
const item = ref({
  firstName: null,
  lastName: null,
  phone: null,
  email: null,
  company: null,
  hotelId: null,
  checkInDate: null,
  checkOutDate: null
})
const speakers = ref([])

const fetchData = async () => {
  const speaker = await getHotels({ limit: 100 })

  speakers.value = speaker.data
}
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.firstName || !item.value.lastName || !item.value.phone || !item.value.email || !item.value.company) return error.value = true
    loadingAdd.value = true
    await addAccomodationRequest({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
  else {
    if (!item.value.firstName || !item.value.lastName || !item.value.phone || !item.value.email || !item.value.company) return error.value = true
    loadingAdd.value = true

    await addAccomodationRequest({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
}
onMounted(async () => {
  await fetchData();
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getAccomodationRequest({ id: route.params.id })
    item.value = data
    item.value.checkOutDate = new Date(data.checkOutDate).toISOString().slice(0, 16);
    item.value.checkInDate = new Date(data.checkInDate).toISOString().slice(0, 16);
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
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} accommodation request</v-card-title>
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
            <m-text-field :type="'text'" :label="`Phone`" :error="!item.phone && error"
              v-model="item.phone"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Email`" :error="!item.email && error"
              v-model="item.email"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Company`" :error="!item.company && error"
              v-model="item.company"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'datetime-local'" :label="`Check in`" :error="!item.checkInDate && error"
              v-model="item.checkInDate"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'datetime-local'" :label="`Check out`" :error="!item.checkOutDate && error"
              v-model="item.checkOutDate"></m-text-field>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <v-select label="Select hotel" :items="speakers.data" :error="!item.hotelId && error" required
              item-title="nameEn" v-model="item.hotelId" item-value="id" variant="outlined"
              :return-object="false"></v-select>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3 ">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd" @click="ADDorEDIT">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} request</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
