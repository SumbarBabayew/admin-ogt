<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <m-text-field :type="'text'" :label="`Username`" :error="!admin.username && error"
                v-model="admin.username"></m-text-field>
        </v-col>
        <v-col cols="12">
            <m-text-field :type="'password'" :label="`Password`" :error="!admin.password && error"
                v-model="admin.password"></m-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <div class="d-flex flex-wrap align-center ml-n2">
            </div>
        </v-col>
        <v-col cols="12" class="pt-">
            <v-btn @click="signInAdmin" :loading="loading" color="primary" size="large" block flat>Sign in</v-btn>
        </v-col>
    </v-row>
</template>


<script>
import { loginAdmin } from "@/service/admin.api";
import MTextField from "../base/MTextField.vue";
export default {
    components: { MTextField },
    data() {
        return {
            error: false,
            loading: false,
            admin: {
                username: "root",
                password: "toor",
            }
        }
    },
    methods: {
        signInAdmin() {
            if (!this.admin.username || !this.admin.password) return this.error = true
            this.loading = true
            loginAdmin({ data: this.admin }).then(res => {
                localStorage.setItem('Authorization-admin-truck', res.data.token)
                localStorage.setItem("token_time-admin-truck", new Date());
                this.$router.push('/')
            }).catch(err => {
                alert(err)
                this.loading = false
            })
        }
    },
}
</script>