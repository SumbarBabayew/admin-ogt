<script setup>
import { RouterView, useRouter } from 'vue-router';
const router = useRouter();
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
  <v-app>
    <RouterView />
  </v-app>
</template>

 