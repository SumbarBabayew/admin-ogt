<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getSpeakers } from "@/service/admin.api";
import SpeakerCard from '@/components/dashboard/SpeakerCard.vue';
import LoadingVue from '~~/components/base/Loading.vue';
import PageHeader from '~~/components/base/PageHeader.vue';
import { limit, product_filter } from '@/data/dashboard/variables';
import Pagination from '~~/components/dashboard/Pagination.vue';

const loading = ref(false)
const route = useRoute();
const items = ref([])
const count = ref(0)

const localQuery = JSON.parse(localStorage.getItem('speakerQuery')) || { page: 1, keyword: '', categoryId: route.query.categoryId || '' }
const query = ref({ page: localQuery.page, keyword: localQuery.keyword, limit: limit, categoryId: route.query.categoryId || '' })
const setDelete = (c) => items.value = c

watch(route, value => {
  if (route.query.categoryId) query.value.categoryId = route.query.categoryId
  localStorage.setItem('speakerQuery', JSON.stringify(query.value))
}, { deep: true, immediate: true })

const filterItem = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = 1
    query.value.as = s.as
    query.value.sort_by = s.sort_by
    localStorage.setItem('speakerQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setSearch = (s) => {
  if (s) {
    query.value.keyword = s
    query.value.page = 1
    localStorage.setItem('speakerQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setPagination = (p) => {
  if (p) {
    query.value.page = p
    localStorage.setItem('speakerQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const fetchItems = async () => {
  loading.value = true
  const { data } = await getSpeakers(JSON.parse(localStorage.getItem('speakerQuery')) || query.value)
  items.value = data.data
  count.value = data.count
  loading.value = false
}
onMounted(async () => {
  await fetchItems()
  if (Math.ceil(count.value / limit) == 0) {
    query.value.page = 1;
    localStorage.setItem('speakerQuery', JSON.stringify(query.value))
  }
})
</script>

<template>
  <LoadingVue v-if="loading" />
  <div v-else>
    <PageHeader :path="`/speakers/0`" :items="product_filter" @filter="filterItem" @search="setSearch" />
    <SpeakerCard :items="items" @delete-item="setDelete" :count="count"/>
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>