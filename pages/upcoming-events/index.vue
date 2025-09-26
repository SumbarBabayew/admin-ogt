<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getUpcomingEvents } from "@/service/admin.api";
import UpcomingEventCard from '@/components/dashboard/UpcomingEventCard.vue';
import LoadingVue from '~~/components/base/Loading.vue';
import PageHeader from '~~/components/base/PageHeader.vue';
import { limit, product_filter } from '@/data/dashboard/variables';
import Pagination from '~~/components/dashboard/Pagination.vue';

const loading = ref(false)
const route = useRoute();
const items = ref([])
const count = ref(0)

const localQuery = JSON.parse(localStorage.getItem('UpcomingEventsQuery')) || { page: 1, keyword: '' }
const query = ref({ page: localQuery.page, keyword: localQuery.keyword, limit: limit })
const setDelete = (c) => items.value = c

watch(route, value => {
  if (route.query.categoryId) query.value.categoryId = route.query.categoryId
  localStorage.setItem('UpcomingEventsQuery', JSON.stringify(query.value))
}, { deep: true, immediate: true })

const filterItem = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = 1
    query.value.as = s.as
    query.value.sort_by = s.sort_by
    localStorage.setItem('UpcomingEventsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setSearch = (s) => {
  if (s) {
    query.value.keyword = s
    query.value.page = 1
    localStorage.setItem('UpcomingEventsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setPagination = (p) => {
  if (p) {
    query.value.page = p
    localStorage.setItem('UpcomingEventsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const fetchItems = async () => {
  loading.value = true
  const { data } = await getUpcomingEvents(JSON.parse(localStorage.getItem('UpcomingEventsQuery')) || query.value)
  items.value = data.data
  count.value = data.count
  loading.value = false
}
onMounted(async () => {
  await fetchItems()
  if (Math.ceil(count.value / limit) == 0) {
    query.value.page = 1;
    localStorage.setItem('UpcomingEventsQuery', JSON.stringify(query.value))
  }
})
</script>

<template>
  <LoadingVue v-if="loading" />
  <div v-else>
    <PageHeader :path="`/upcoming-events/0`" :items="product_filter" @filter="filterItem" @search="setSearch" />
    <UpcomingEventCard :items="items" @delete-item="setDelete" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>