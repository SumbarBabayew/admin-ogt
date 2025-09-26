<script setup>
import { ref, watch, onMounted } from 'vue'
import MImageUpload from "@/components/base/MImageUpload.vue"
import MTextField from "@/components/base/MTextField.vue"
import MTextArea from "@/components/base/MTextArea.vue"
import Loading from '~~/components/base/Loading.vue'
import { addUser, uploadUserImage, getUser, getCompanyCategories } from "@/service/admin.api" // ⬅️ ДОБАВИЛ импорт
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

const error = ref(false)
const loading = ref(false)
const addLoading = ref(false)

const avatar = ref(null)
const setPathImage = (c) => (avatar.value = c[0])

// ⬇️ НОВОЕ: список категорий и флаг загрузки
const categories = ref([])          // ⬅️ ДОБАВИЛ
const categoriesLoading = ref(false)

const user = ref({
  firstName: null,
  lastName: null,
  post: null,
  avatar: '',          // оставляем один раз
  password: null,
  email: null,
  standId: null,
  orderNumber: null,
  isBlocked: null,
  isSpeaker: false,
  speakerId: 0,
  categoryId: null     // пусть будет null до выбора
})

const fetchCategories = async () => {
  try {
    categoriesLoading.value = true
    const { data } = await getCompanyCategories()
    categories.value = data || []
  } catch (e) {
    console.error(e)
    categories.value = []
  } finally {
    categoriesLoading.value = false
  }
}

const buildPayload = (u) => {
  const p = {
    firstName: u.firstName,
    lastName: u.lastName,
    post: u.post,
    email: u.email,
    standId: u.standId,
    orderNumber: u.orderNumber,
    isBlocked: !!u.isBlocked,
    isSpeaker: !!u.isSpeaker,
    speakerId: u.speakerId || 0,
  }

  // маппинг категории под разные нейминги на бэке
  if (u.categoryId != null) {
    p.companyCategoryId = u.categoryId   // camelCase
    p.category_id = u.categoryId         // snake_case
    // если бэк принимает categoryId — не помешает продублировать:
    p.categoryId = u.categoryId
  }

  return p
}

const ADDorEDIT = async () => {
  if (!user.value.firstName || !user.value.lastName || !user.value.post) {
    error.value = true
    return
  }
  addLoading.value = true
  const idNum = Number(route.params.id)

  try {
    const payload = buildPayload(user.value)

if (idNum === 0) {
  const res = await addUser({ data: payload, id: idNum })
    if (avatar.value) {
      await uploadUserImage({ id: res.data.id, data: { file: avatar.value } })
    }
    router.go(-1)
    } else {
      await addUser({ data: payload, id: idNum })
      if (avatar.value) {
        await uploadUserImage({ id: idNum, data: { file: avatar.value } })
      }
      router.go(-1)
    }
  } catch (e) {
    console.error('Save user failed:', e?.response?.data || e)
  } finally {
    addLoading.value = false
  }
}


// чекбокс спикера
watch(() => user.value.isSpeaker, (val) => {
  if (!val) user.value.speakerId = 0
})

onMounted(async () => {
  await fetchCategories()
  if (route.params.id != 0) {
    const { data } = await getUser({ id: route.params.id })
    // не затираем наши дефолты (categoryId и т.д.)
    user.value = { ...user.value, ...data }

    user.value.categoryId =
      data.companyCategoryId ?? data.category_id ?? data.categoryId ?? null
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
          <v-card-title class="text-h5">
            {{ route.params.id == 0 ? 'Add' : 'Edit' }} user
          </v-card-title>
          <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
            <v-avatar size="large" class="text-white">
              <ArrowBackUpIcon size="25" />
            </v-avatar>
          </v-btn>
        </div>

        <v-row class="mt-3">
          <v-col cols="12" lg="4" sm="13">
            <m-text-field type="text" label="Firstname"
              :error="!user.firstName && error" v-model="user.firstName"/>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field type="text" label="Lastname"
              :error="!user.lastName && error" v-model="user.lastName"/>
          </v-col>
          <v-col cols="12" lg="4" sm="13">
            <m-text-field type="number" label="Order Number"
              :error="!user.orderNumber && error" v-model="user.orderNumber"/>
          </v-col>
          <v-col cols="12" lg="6" sm="13">
            <m-text-field type="text" label="Email"
              :error="!user.email && error" v-model="user.email"/>
          </v-col>

          <v-col cols="12" lg="6" sm="13" v-if="route.params.id == 0">
            <m-text-field type="text" label="Password"
              :error="!user.password && error" v-model="user.password"/>
          </v-col>

          <v-col cols="12" lg="6" sm="13">
            <m-text-field type="text" label="Post"
              :error="!user.post && error" v-model="user.post"/>
          </v-col>

          <!-- Категории -->
        <v-col cols="12" lg="6" sm="13">
          <v-label class="mb-1" for="category-select">Category</v-label>
          <v-select
            id="category-select"
            v-model="user.categoryId"
            :items="categories"
            :loading="categoriesLoading"
            item-title="name_ru"
            item-value="id"
            placeholder="Select category"
            variant="outlined"    
            rounded="lg"           
            color="primary"       
            hide-details="auto"
            clearable
            :return-object="false"
            :error="!user.categoryId && error"
          />
        </v-col>



          <!-- Is Speaker -->
          <v-col cols="12" lg="12" sm="13">
            <label class="custom-check">
              <input type="checkbox" v-model="user.isSpeaker" aria-label="Is Speaker" />
              <span class="checkmark"></span>
              Is Speaker
            </label>
          </v-col>

          <v-col cols="12" lg="6" sm="12" v-if="user.isSpeaker">
            <m-text-field type="number" label="Speaker ID" v-model="user.speakerId" />
          </v-col>

          <!-- Аватар -->
          <v-col lg="12" sm="12">
            <m-image-upload 
              :width="'width:100%'" 
              :style="'display:flex; justify-content:center'"
              :photoSrc="{ type: 'string', value: user.avatar }"
              type="user"
              :error="error && !avatar"
              :selectedFile="avatar"
              @photoPath="setPathImage"
              placeholder="Surat"
            />
          </v-col>
        </v-row>
      </v-card-item>

      <div class="d-flex justify-end pb-3">
        <input type="checkbox" v-model="user.isBlocked" :value="user.isBlocked">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text"
               @click="ADDorEDIT" :loading="addLoading">
          <span class="mr-2">{{ route.params.id == 0 ? 'Add' : 'Edit' }} user</span>
          <ScriptPlusIcon />
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
