<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getAgendas, getEvents } from "@/service/admin.api";
import AgendasTable from "@/components/tables/AgendasTable.vue";
import LoadingVue from "~~/components/base/Loading.vue";
import PageHeader from "~~/components/base/PageHeader.vue";
import { limit, product_filter } from "@/data/dashboard/variables";
import Pagination from "~~/components/dashboard/Pagination.vue";

const loading = ref(false);
const route = useRoute();
const items = ref([]);
const count = ref(0);

const localQuery = JSON.parse(localStorage.getItem("AgendasQuery")) || {
  page: 1,
  eventId: ""
};

const query = ref({
  eventId: localQuery.eventId,
  page: localQuery.page || 1,
  limit: limit,
});

const events = ref([]);

const fetchData = async () => {
  const speaker = await getEvents({ limit: 100 });
  // events.value = speaker.data;
  var result = [];
  for(var i of speaker.data.data){
    result.push({ name: i.name, value: { eventId: i.id } });
  }
  events.value = result;
};
const setDelete = (c) => {
  items.value = c;
  fetchItems();
};

watch(
  route,
  (value) => {
    localStorage.setItem("AgendasQuery", JSON.stringify(query.value));
  },
  { deep: true, immediate: true }
);

const filterItem = (s) => {
  if (s) {
    query.value.page = 1;
    query.value.eventId = s.eventId;
    localStorage.setItem("AgendasQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const setSearch = (s) => {
  if (s) {
    query.value.page = 1;
    localStorage.setItem("AgendasQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const searchEmpty = (s) => {
  if (s) {
    query.value.page = JSON.parse(localStorage.getItem("AgendasQuery")).page || 1;
    localStorage.setItem("AgendasQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const setPagination = (p) => {
  if (p) {
    query.value.page = p;
    localStorage.setItem("AgendasQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const fetchItems = async () => {
  const { data } = await getAgendas(JSON.parse(localStorage.getItem("AgendasQuery")) || query.value);
  items.value = data.data;
  count.value = data.count;
};
onMounted(async () => {
  loading.value = true;
  await fetchItems();
  await fetchData();
  if (Math.ceil(count.value / limit) == 0) {
    query.value.page = 1;
    localStorage.setItem("AgendasQuery", JSON.stringify(query.value));
  }
  loading.value = false;
});
</script>
<template>
  <LoadingVue v-if="loading" />
  <div v-else>
    <PageHeader
      :path="`/agenda/0`"
      :items="events"
      @filter="filterItem"
      @search="setSearch"
      @search-empty="setSearch"
    />
    <AgendasTable :items="items" @delete-item="setDelete" :count="count" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>
