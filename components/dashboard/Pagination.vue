<script setup>
import { limit } from '@/data/dashboard/variables';
const emit = defineEmits(["setPagination"]);
const props = defineProps({ count: Number, page: Number });
const page = ref('' || props.page)
const updatePage = (value) => {
  emit('setPagination', value)
}
</script>
<template>
  <div class="mt-12">
    <!-- :total-visible="2" -->
    <v-pagination :length="Math.ceil(props.count / limit) == 0 ? 5 : Math.ceil(props.count / limit)" v-model="page"
      @update:modelValue="updatePage(page)"></v-pagination>
  </div>
</template> 