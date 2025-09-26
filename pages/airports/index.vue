<script setup>
import { onMounted, ref } from 'vue';
import { getAirports } from "@/service/admin.api";
import PageHeader from '~~/components/base/PageHeader.vue';
import Pagination from '~~/components/dashboard/Pagination.vue';
import AirportCard from '@/components/dashboard/AirportCard.vue';
import { limit } from '@/data/dashboard/variables';
import Loading from '~~/components/base/Loading.vue';
const loading = ref(false)

const items = ref([])
const count = ref(0)
const localQuery = JSON.parse(localStorage.getItem('airportsQuery')) || { page: 1, keyword: '' }

const query = ref({ page: localQuery.page, keyword: localQuery.keyword, limit: limit })
const setDelete = (c) => items.value = c

const setSearch = (s) => {
  if (s) {
    query.value.keyword = s
    query.value.page = 1
    localStorage.setItem('airportsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setPagination = (p) => {
  if (p) {
    query.value.page = p
    localStorage.setItem('airportsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const fetchItems = async () => {
  loading.value = true
  const { data } = await getAirports(JSON.parse(localStorage.getItem('airportsQuery')) || query.value)
  items.value = data.data
  count.value = data.count
  loading.value = false

}
onMounted(async () => await fetchItems())

</script>

<template>
  <Loading v-if="loading"></Loading>
  <div v-else>
    <PageHeader :path="`/airports/0`" @search="setSearch" :filter-visible="false" />
    <AirportCard :items="items" @delete-item="setDelete" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>