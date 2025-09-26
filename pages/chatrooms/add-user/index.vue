<script setup >
import { ref } from 'vue';
import MTextField from "../../../components/base/MTextField.vue"
import { addChatroomUser, getChatrooms, getUsers } from "@/service/admin.api";
import { useRoute, useRouter } from "vue-router";
import Loading from '~~/components/base/Loading.vue';
const router = useRouter();
const route = useRoute();
const error = ref(false)
const loading = ref(false)
const loadingAdd = ref(false)
const item = ref({
    userId: null,
    chatRoomId: null
})
const users = ref([])
const chatrooms = ref([])

const fetchData = async () => {
    const user = await getUsers({ limit: 100 })

    users.value = user.data

    const chatroom = await getChatrooms({ limit: 50 });

    chatrooms.value = chatroom.data
}
const ADDorEDIT = async () => {
    if (!item.value.userId || !item.value.chatRoomId) return error.value = true
    loadingAdd.value = true
    await addChatroomUser({ data: item.value, id: route.params.id }).then(async res => { router.go(-1); }).catch(error => { alert(error) })
}
onMounted(async () => {
    loading.value = true

    await fetchData();
    loading.value = false
})
</script>
<template>
    <Loading v-if="loading" />
    <div class="mx-3" v-else>
        <v-card elevation="10" class="withbg">
            <v-card-item>
                <div class="d-flex align-center justify-space-between pt-sm-2">
                    <v-card-title class="text-h5">Add user</v-card-title>
                    <v-btn size="large" icon class="bg-primary" @click="router.go(-1)">
                        <v-avatar size="large" class="text-white">
                            <ArrowBackUpIcon size="25" />
                        </v-avatar>
                    </v-btn>
                </div>
                <v-row class="mt-3">
                    <v-col cols="12" lg="6" sm="13">
                        <v-select label="Select user" :items="users.data" :error="!item.userId && error" required
                            item-title="firstName" v-model="item.userId" item-value="id" variant="outlined"
                            :return-object="false"></v-select>
                    </v-col>
                    <v-col cols="12" lg="6" sm="13">
                        <v-select label="Select chatroom" :items="chatrooms.data" :error="!item.chatRoomId && error"
                            required item-title="nameEn" v-model="item.chatRoomId" item-value="id" variant="outlined"
                            :return-object="false"></v-select>
                    </v-col>
                </v-row>
            </v-card-item>
            <div class="d-flex justify-end pb-3 ">
                <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" :loading="loadingAdd"
                    @click="ADDorEDIT">
                    <span class="mr-2">Add user</span>
                    <ScriptPlusIcon />
                </v-btn>
            </div>

        </v-card>
    </div>
</template>
