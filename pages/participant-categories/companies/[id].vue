<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getCompaniesOfCategory } from "@/service/admin.api";
import CategoryCompaniesTable from "@/components/tables/CategoryCompaniesTable.vue";
import LoadingVue from "~~/components/base/Loading.vue";
import PageHeader from "~~/components/base/PageHeader.vue";
import { limit, product_filter } from "@/data/dashboard/variables";
import Pagination from "~~/components/dashboard/Pagination.vue";

const loading = ref(false);
const route = useRoute();
const items = ref([]);
const count = ref(0);

const localQuery = JSON.parse(localStorage.getItem("CategoryCompaniesQuery")) || {
  page: 1,
  keyword: "",
  as: "",
  sort_by: "",
};

const query = ref({
  page: localQuery.page || 1,
  limit: limit,
  keyword: localQuery.keyword,
});

const setDelete = (c) => {
  items.value = c;
  fetchItems();
};

watch(
  route,
  (value) => {
    localStorage.setItem("CategoryCompaniesQuery", JSON.stringify(query.value));
  },
  { deep: true, immediate: true }
);

const filterItem = (s) => {
  if (s) {
    query.value.keyword = "";
    query.value.page = 1;
    localStorage.setItem("CategoryCompaniesQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const setSearch = (s) => {
  if (s) {
    query.value.keyword = s;
    query.value.page = 1;
    localStorage.setItem("CategoryCompaniesQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const searchEmpty = (s) => {
  if (s) {
    query.value.keyword = "";
    query.value.page =
      JSON.parse(localStorage.getItem("CategoryCompaniesQuery")).page || 1;
    localStorage.setItem("CategoryCompaniesQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const setPagination = (p) => {
  if (p) {
    query.value.page = p;
    localStorage.setItem("CategoryCompaniesQuery", JSON.stringify(query.value));
    fetchItems();
  }
};

const fetchItems = async () => {
  const { data } = await getCompaniesOfCategory({
    id: route.params.id,
    ...(JSON.parse(localStorage.getItem("CategoryCompaniesQuery")) || query.value),
  });
  console.log(JSON.parse(localStorage.getItem("CategoryCompaniesQuery")), query.value);
  items.value = data.data;
  count.value = data.count;
};
onMounted(async () => {
  loading.value = true;
  await fetchItems();
  if (Math.ceil(count.value / limit) == 0) {
    query.value.page = 1;
    localStorage.setItem("CategoryCompaniesQuery", JSON.stringify(query.value));
  }
  loading.value = false;
});
</script>
<template>
  <LoadingVue v-if="loading" />
  <div v-else>
    <PageHeader
      :path="`/participant-categories/add-company/${route.params.id}`"
      :items="product_filter"
      @filter="filterItem"
      @search="setSearch"
      @search-empty="setSearch"
    />
    <CategoryCompaniesTable :items="items" @delete-item="setDelete" :count="count" />
    <Pagination :count="count" @setPagination="setPagination" :page="query.page" />
  </div>
</template>
