<script setup>
import { onMounted, ref } from "vue";
import { getNotifications, getEvents } from "@/service/admin.api";
import PageHeader from "~~/components/base/PageHeader.vue";
import NotificationCard from "@/components/dashboard/NotificationCard.vue";
import Pagination from "~~/components/dashboard/Pagination.vue";
import { limit } from "@/data/dashboard/variables";
import { useRoute, useRouter } from "vue-router";
import Loading from "~~/components/base/Loading.vue";
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const items = ref([]);
const count = ref(0);
const localQuery = JSON.parse(localStorage.getItem("notifyQuery")) || {
  page: 1,
  eventId: "",
};
const query = ref({ page: localQuery.page, limit: limit, eventId: localQuery.eventId });
const setDelete = (c) => (items.value = c);
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
watch(
  route,
  (value) => {
    localStorage.setItem("notifyQuery", JSON.stringify(query.value));
  },
  { deep: true, immediate: true }
);

const filterItem = (s) => {
  if (s) {
    query.value.page = 1;
    query.value.eventId = s.eventId;
    localStorage.setItem("notifyQuery", JSON.stringify(query.value));
    fetchItems();
  }
};
const setPagination = (p) => {
  if (p) {
    query.value.page = p;
    localStorage.setItem("notifyQuery", JSON.stringify(query.value));
    fetchItems();
  }
};
const fetchItems = async () => {
  loading.value = true;
  const { data } = await getNotifications(
    JSON.parse(localStorage.getItem("notifyQuery")) || query.value
  );
  items.value = data.data;
  count.value = data.count;
  loading.value = false;
};
onMounted(async () => {
  await fetchData();
  await fetchItems();
});
</script>

<template>
  <Loading v-if="loading"></Loading>
  <div v-else>
    <PageHeader
      :path="`/notifications/0`"
      :items="events"
      @filter="filterItem"
      :filter-visible="true"
      :search-visible="false"
    />
    <NotificationCard :items="items" @delete-item="setDelete" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>
