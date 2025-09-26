<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getAccomodationRequests, getEvents } from "@/service/admin.api";
import AccomodationRequest from '@/components/tables/AccomodationRequest.vue';
import LoadingVue from '~~/components/base/Loading.vue';
import PageHeader from '~~/components/base/PageHeader.vue';
import { limit, product_filter } from '@/data/dashboard/variables';
import Pagination from '~~/components/dashboard/Pagination.vue';

const loading = ref(false)
const route = useRoute();
const items = ref([])
const count = ref(0)
const events = ref([]);

const fetchData = async () => {
  const speaker = await getEvents({ limit: 100 });
  // events.value = speaker.data;
  var result = [];
  result.push({ name: "All", value: { eventId: "" } });

  for (var i of speaker.data.data) {
    result.push({ name: i.name, value: { eventId: i.id } });
  }
  events.value = result;
};
const localQuery =
  JSON.parse(localStorage.getItem('AccomodationRequestQuery')) ||
  {
    page: 1,
    keyword: '',
    eventId: '',
    as: "",
    sort_by: ''
  }

const query = ref({
  page: localQuery.page || 1,
  keyword: localQuery.keyword,
  limit: limit,
  eventId: localQuery.eventId,
  as: localQuery.as || '',
  sort_by: localQuery.sort_by || '',
})


const setDelete = (c) => { items.value = c; fetchItems() }

watch(route, value => {
  localStorage.setItem('AccomodationRequestQuery', JSON.stringify(query.value))
}, { deep: true, immediate: true })

const filterItem = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = 1
    query.value.as = s.as
    query.value.sort_by = s.sort_by
    query.value.eventId = s.eventId;
    localStorage.setItem('AccomodationRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setSearch = (s) => {
  if (s) {
    query.value.keyword = s
    query.value.page = 1
    localStorage.setItem('AccomodationRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const searchEmpty = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = JSON.parse(localStorage.getItem('AccomodationRequestQuery')).page || 1
    localStorage.setItem('AccomodationRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}


const setPagination = (p) => {
  if (p) {
    query.value.page = p
    localStorage.setItem('AccomodationRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const fetchItems = async () => {
  const { data } = await getAccomodationRequests(JSON.parse(localStorage.getItem('AccomodationRequestQuery')) || query.value)
  items.value = data.data
  count.value = data.count
}
onMounted(async () => {
  loading.value = true
  await fetchItems();
  await fetchData();
  if (Math.ceil(count.value / limit) == 0) {
    query.value.page = 1;
    localStorage.setItem('AccomodationRequestQuery', JSON.stringify(query.value))
  }
  loading.value = false

})
</script>
<template>
  <LoadingVue v-if="loading" />
  <div v-else>
    <PageHeader :path="`/accomodation-request/0`" :items="events" @filter="filterItem" @search="setSearch"
      @search-empty="setSearch" />
    <AccomodationRequest :items="items" @delete-item="setDelete" :count="count" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>