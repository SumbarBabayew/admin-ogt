<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getFlights } from "@/service/admin.api";
import AvailableFlightTable from '@/components/tables/AvailableFlightTable.vue';
import LoadingVue from '~~/components/base/Loading.vue';
import PageHeader from '~~/components/base/PageHeader.vue';
import { limit, product_filter } from '@/data/dashboard/variables';
import Pagination from '~~/components/dashboard/Pagination.vue';

const loading = ref(false)
const route = useRoute();
const items = ref([])
const count = ref(0)

const localQuery =
  JSON.parse(localStorage.getItem('FlightsQuery')) ||
  {
    page: 1,
    keyword: '',
    as: "",
    sort_by: ''
  }

const query = ref({
  page: localQuery.page || 1,
  keyword: localQuery.keyword,
  limit: limit,
  as: localQuery.as || '',
  sort_by: localQuery.sort_by || '',
})


const setDelete = (c) => { items.value = c; fetchItems() }

watch(route, value => {
  localStorage.setItem('FlightsQuery', JSON.stringify(query.value))
}, { deep: true, immediate: true })

const filterItem = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = 1
    query.value.as = s.as
    query.value.sort_by = s.sort_by
    localStorage.setItem('FlightsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setSearch = (s) => {
  if (s) {
    query.value.keyword = s
    query.value.page = 1
    localStorage.setItem('FlightsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const searchEmpty = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = JSON.parse(localStorage.getItem('FlightsQuery')).page || 1
    localStorage.setItem('FlightsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}


const setPagination = (p) => {
  if (p) {
    query.value.page = p
    localStorage.setItem('FlightsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const fetchItems = async () => {
  const { data } = await getFlights(JSON.parse(localStorage.getItem('FlightsQuery')) || query.value)
  items.value = data.data
  count.value = data.count
}
onMounted(async () => {
  loading.value = true
  await fetchItems()
  if (Math.ceil(count.value / limit) == 0) {
    query.value.page = 1;
    localStorage.setItem('FlightsQuery', JSON.stringify(query.value))
  }
  loading.value = false

})
</script>
<template>
  <LoadingVue v-if="loading" />
  <div v-else>
    <PageHeader :path="`/available-flights/0`" :items="product_filter" @filter="filterItem" @search="setSearch"
      @search-empty="setSearch" />
    <AvailableFlightTable :items="items" @delete-item="setDelete" :count="count" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>