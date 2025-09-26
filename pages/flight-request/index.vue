<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getFlightRequests, getEvents } from "@/service/admin.api";
import FlightRequest from '@/components/tables/FlightRequest.vue';
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
  JSON.parse(localStorage.getItem('FlightRequestQuery')) ||
  {
    page: 1,
    keyword: '',
  }

const query = ref({
  page: localQuery.page || 1,
  keyword: localQuery.keyword,
  limit: limit,
})


const setDelete = (c) => { items.value = c; fetchItems() }

watch(route, value => {
  localStorage.setItem('FlightRequestQuery', JSON.stringify(query.value))
}, { deep: true, immediate: true })

const filterItem = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = 1
    query.value.eventId = s.eventId;
    localStorage.setItem('FlightRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const setSearch = (s) => {
  if (s) {
    query.value.keyword = s
    query.value.page = 1
    localStorage.setItem('FlightRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const searchEmpty = (s) => {
  if (s) {
    query.value.keyword = ""
    query.value.page = JSON.parse(localStorage.getItem('FlightRequestQuery')).page || 1
    localStorage.setItem('FlightRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}


const setPagination = (p) => {
  if (p) {
    query.value.page = p
    localStorage.setItem('FlightRequestQuery', JSON.stringify(query.value))
    fetchItems()
  }
}

const fetchItems = async () => {
  const { data } = await getFlightRequests(JSON.parse(localStorage.getItem('FlightRequestQuery')) || query.value)
  items.value = data.data
  count.value = data.count
}
onMounted(async () => {
  loading.value = true
  await fetchData();
  await fetchItems()
  if (Math.ceil(count.value / limit) == 0) {
    query.value.page = 1;
    localStorage.setItem('FlightRequestQuery', JSON.stringify(query.value))
  }
  loading.value = false

})
</script>
<template>
  <LoadingVue v-if="loading" />
  <div v-else>
    <PageHeader :path="`/flight-request/0`" :items="events" @filter="filterItem" @search="setSearch"
      @search-empty="setSearch" />
    <FlightRequest :items="items" @delete-item="setDelete" :count="count" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>