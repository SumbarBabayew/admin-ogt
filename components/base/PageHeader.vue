<script setup>
import { ref } from 'vue'
import { FilterIcon, ScriptPlusIcon, SearchIcon, SortAscending2Icon } from "vue-tabler-icons"
const props = defineProps({ path: String, search: String, items: Array, searchVisible: { type: Boolean, default: true }, filterVisible: { type: Boolean, default: true } });
const emit = defineEmits(["search"]);

const search = ref('')

const searchItem = () => emit("search", search.value);

const filterItems = (value) => {
  emit("filter", value)
}

watch(search, value => {
  if (value == '') emit("search", search.value);
}, { deep: true, immediate: true })

</script>
<template>
  <div class="d-flex mb-7">
    <v-btn class=" bg-primary mr-4" :to="props.path">
      <ScriptPlusIcon />
    </v-btn>
    <div class="search_container" v-if="searchVisible">
      <input type="text" placeholder="Gozleg" v-model="search" @keyup.enter="searchItem">
      <SearchIcon class="pl-1" />
    </div>

    <v-menu :close-on-content-click="false" v-if="filterVisible">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn bg-primary custom-hover-primary" variant="text" v-bind="props">
          <FilterIcon></FilterIcon>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
        <v-list class="py-0" lines="one" density="compact">
          <v-list-item v-for="(filter, i)  in props.items" value="item2" :key="i" active-color="primary"
            @click="filterItems(filter.value)">
            <template v-slot:prepend>
              <SortAscending2Icon size="20" />
            </template>
            <v-list-item-title class="pl-4 text-body-1">{{ filter.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-menu>
  </div>
</template>