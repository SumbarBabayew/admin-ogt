<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
const router = useRouter();
const title = ref("Modernize - Nuxt3 Typescript based Free Admin Dashboard Template");
useHead({
    meta: [{ content: title }],
    titleTemplate: (titleChunk) => {
        return titleChunk
            ? `${titleChunk} - Nuxt3 Typescript based Free Admin Dashboard Template`
            : "Modernize - Nuxt3 Typescript based Free Admin Dashboard Template";
    },
});
const chechToken = () => {
    var item = localStorage.getItem("token_time-admin-truck")
    const token_time = new Date(String(item))
    if (token_time) {
        const today = new Date()
        const naaw = today.getDate() - token_time.getDate()
        if (naaw != 0) {
            localStorage.removeItem('Authorization-admin-truck')
            localStorage.removeItem('token_time-admin-truck')
        }
    }
}
onMounted(async () => {
    await chechToken()
    if (!localStorage.getItem("Authorization-admin-truck")) return router.push('/auth/login')
})
</script>
<template>
    <v-locale-provider>
        <v-app>
            <LayoutFullMain />
            <v-main>
                <v-container fluid class="page-wrapper">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

