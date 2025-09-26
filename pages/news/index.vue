<script setup>
import { onMounted, ref } from 'vue';
import { getNews } from "@/service/admin.api";
import PageHeader from '~~/components/base/PageHeader.vue';
import NewsCard from '@/components/dashboard/NewsCard.vue';
import Pagination from '~~/components/dashboard/Pagination.vue';
import { limit } from '@/data/dashboard/variables';
import Loading from '~~/components/base/Loading.vue';
const loading = ref(false)
const items = ref([])
const count = ref(0)
const localQuery = JSON.parse(localStorage.getItem('newsQuery')) || { page: 1, }
const query = ref({ page: localQuery.page, limit: limit })
const setDelete = (c) => items.value = c

const setPagination = (p) => {
  if (p) {
    query.value.page = p
    localStorage.setItem('newsQuery', JSON.stringify(query.value))
    fetchItems()
  }
}
const fetchItems = async () => {
  loading.value = true
  const { data } = await getNews(JSON.parse(localStorage.getItem('newsQuery')) || query.value)
  items.value = data.data
  count.value = data.count
  loading.value = false
}
onMounted(async () => { await fetchItems() })

</script>

<template>
  <Loading v-if="loading"></Loading>
  <div v-else>
    <PageHeader :path="`/news/0`" :filter-visible="false" :search-visible="false" />
    <NewsCard :items="items" @delete-item="setDelete" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>