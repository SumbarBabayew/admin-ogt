<script setup>
import { ref } from 'vue';
import MImageUpload from "@/components/base/MImageUpload.vue"
import MTextField from "@/components/base/MTextField.vue"
import MTextArea from "@/components/base/MTextArea.vue"
import Loading from '~~/components/base/Loading.vue';
import {
  addFeedback,
  uploadFeedbackImage,
  getFeedback
} from "@/service/admin.api";

import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const error = ref(false)
const loading = ref(false)
const addLoading = ref(false)
const image = ref(null)
const setPathImage = (c) => image.value = c[0]
const feedback = ref({
  fullnameEn: null,
  fullnameRu: null,
  fullnameX: null,
  companyEn: null,
  companyRu: null,
  companyX: null,
  image: null,
  stars: null,
  feedbackEn: null,
  feedbackRu: null,
  feedbackX: null,
  isVisible: null,
  image: '',
})

const ADDorEDIT = async () => {
  console.log(feedback.value);
  if (!feedback.value.fullnameEn || !feedback.value.companyEn || !feedback.value.stars || !feedback.value.feedbackEn) return error.value = true

  addLoading.value = true
  if (route.params.id == 0) {
    await addFeedback({ data: feedback.value, id: route.params.id }).then(async res => {
      await uploadFeedbackImage({ id: res.data.id, data: { file: image.value } })
      router.go(-1)
    }).catch(error => { console.log(error) })
  }
  else {
    await addFeedback({ data: feedback.value, id: route.params.id }).then(async () => {
      if (image.value) await uploadFeedbackImage({ id: route.params.id, data: { file: image.value } })
      router.go(-1)
    })
  }
}

onMounted(async () => {
  // await fetchData()
  if (route.params.id != 0) {
    const { data } = await getFeedback({ id: route.params.id })
    feedback.value = data
  }
  loading.value = true
})
</script>
<template>
  <Loading v-if="!loading" />
  <div class="mx-3" v-else>
    <v-card elevation="10" class="withbg px-3">
      <v-card-item>
        <div class="d-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">{{ route.params.id == 0 ? 'Add' : 'Edit' }} feedback</v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>

        <v-row class="mt-3">
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Fullname EN`" :error="!feedback.fullnameEn && error"
              v-model="feedback.fullnameEn"></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Fullname RU`" :error="!feedback.fullnameRu && error"
              v-model="feedback.fullnameRu"></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Fullname X`" :error="!feedback.fullnameX && error"
              v-model="feedback.fullnameX"></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Company EN`" :error="!feedback.companyEn && error"
              v-model="feedback.companyEn"></m-text-field>
          </v-col>
          
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Company RU`" :error="!feedback.companyRu && error"
              v-model="feedback.companyRu"></m-text-field>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field :type="'text'" :label="`Company X`" :error="!feedback.companyX && error"
              v-model="feedback.companyX"></m-text-field>
          </v-col>
          <!-- Descriptions -->
          <v-col cols="12" lg="12" sm="13">
            <m-text-area :type="'text'" :label="`Feedback EN`" :error="!feedback.feedbackEn && error"
              v-model="feedback.feedbackEn"></m-text-area>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <m-text-area :type="'text'" :label="`Feedback RU`" :error="!feedback.feedbackRu && error"
              v-model="feedback.feedbackRu"></m-text-area>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <m-text-area :type="'text'" :label="`Feedback X`" :error="!feedback.feedbackX && error"
              v-model="feedback.feedbackX"></m-text-area>
          </v-col>
          <v-col cols="12" lg="12" sm="13">
            <m-text-field :type="'text'" :label="`Stars`" :error="!feedback.stars && error"
              v-model="feedback.stars"></m-text-field>
          </v-col>
          <v-col cols="6" lg="6" sm="12">
            <m-image-upload :width="'width:100%'" :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: feedback.image }" :error="error && !image" :selectedFile="image"
              @photoPath="setPathImage" :placeholder="'Surat'"></m-image-upload>
          </v-col>
        </v-row>
      </v-card-item>
      <div class="d-flex justify-end pb-3 ">
        <input type="checkbox" v-model="feedback.isVisible" :value="feedback.isVisible">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" @click="ADDorEDIT" :loading="addLoading">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} feedback</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>

    </v-card>
  </div>
</template>
