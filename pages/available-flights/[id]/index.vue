<script setup >
import { ref } from 'vue';
import MTextField from "../../../components/base/MTextField.vue"
import { addFlight, getFlight, getAirports } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from '~~/components/base/Loading.vue';
const router = useRouter();
const route = useRoute();
const error = ref(false)
const loading = ref(false)
const loadingAdd = ref(false)
const item = ref({
  departureTime:null,
  landingTime:null,
  startId: null,
  destinationId: null
})
const speakers = ref([])

const fetchData = async () => {
  const speaker = await getAirports({ limit: 100 })

  speakers.value = speaker.data
}
const ADDorEDIT = async () => {
  if (route.params.id == 0) {
    if (!item.value.startId || !item.value.destinationId || !item.value.departureTime) return error.value = true
    loadingAdd.value = true
    await addFlight({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
  else {
    if (!item.value.startId || !item.value.destinationId || !item.value.departureTime) return error.value = true
    loadingAdd.value = true

    await addFlight({ data: item.value, id: route.params.id }).then(async res => { router.go(-1) }).catch(error => { alert(error) })
  }
}
onMounted(async () => {
  await fetchData();
  if (route.params.id != 0) {
    loading.value = true
    const { data } = await getFlight({ id: route.params.id })
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
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} flight</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>
        <v-row class="mt-3">
          <v-col cols="12" lg="6" sm="13">
            <v-select label="Start" :items="speakers.data" :error="!item.startId && error" required
              item-title="nameEn" v-model="item.startId" item-value="id" variant="outlined"
              :return-object="false"></v-select>
          </v-col>
          <v-col cols="12" lg="6" sm="13">
            <v-select label="Destination" :items="speakers.data" :error="!item.destinationId && error" required
              item-title="nameEn" v-model="item.destinationId" item-value="id" variant="outlined"
              :return-object="false"></v-select>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'datetime-local'" :label="`Departure Time`" :error="!item.departureTime && error"
              v-model="item.departureTime"></m-text-field>
          </v-col>
          <v-col cols="6">
            <m-text-field :type="'datetime-local'" :label="`Arrival Time`" :error="!item.landingTime && error"
              v-model="item.landingTime"></m-text-field>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3 ">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd" @click="ADDorEDIT">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} flight</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
      
    </v-card>
  </div>
</template>
