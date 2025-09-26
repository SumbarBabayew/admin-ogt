<script setup >
import { ref } from 'vue';
import MTextField from "../../../components/base/MTextField.vue"
import { addFlightRequest, getFlightRequest, getFlights } from "@/service/admin.api";
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
  birthDate: null,
  nationality: null,
  passportNumber: null,
  passportExpiryDate: null,
  gender: null,
  isRound: null,
  flightId: null
})
const speakers = ref([])

const fetchData = async () => {
  const speaker = await getFlights({ limit: 100 })

  speakers.value = speaker.data
}
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.firstName || !item.value.lastName || !item.value.phone || !item.value.email || !item.value.passportNumber || !item.value.company) return error.value = true
    loadingAdd.value = true
    await addFlightRequest({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
  else {
    if (!item.value.firstName || !item.value.lastName || !item.value.phone || !item.value.email || !item.value.passportNumber || !item.value.company) return error.value = true
    loadingAdd.value = true

    await addFlightRequest({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
}
onMounted(async () => {
  await fetchData();
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getFlightRequest({ id: route.params.id })
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
            <m-text-field :type="'text'" :label="`Nationality`" :error="!item.nationality && error"
              v-model="item.nationality"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Passport number`" :error="!item.passportNumber && error"
              v-model="item.passportNumber"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'text'" :label="`Passport`" :error="!item.passportNumber && error"
              v-model="item.passportNumber"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'date'" :label="`Passport Expiry`" :error="!item.passportExpiryDate && error"
              v-model="item.passportExpiryDate"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'date'" :label="`Birthdate`" :error="!item.birthDate && error"
              v-model="item.birthDate"></m-text-field>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <v-select label="Select flight" :items="speakers.data" :error="!item.flightId && error" required
              :item-title="item => `${ item.departureTime}`" v-model="item.flightId" item-value="id" variant="outlined"
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
