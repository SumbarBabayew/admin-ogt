<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
const props = defineProps({ items: Array, count: Number });
const emit = defineEmits(["delete-item"]);

</script>
<template>
  <h3 class="mb-3" v-if="props.count != 0">Store: {{ props.items[0].store.name }} ( {{ props.count }} sany zakaz )</h3>
  <v-row>
    <v-col cols="12" lg="3" sm="6" v-for="(card, i) in  props.items " :key="i">
      <v-card elevation="10" class="withbg store__card" rounded="md">
        <v-card-item class="d-flex">
          <h6 class="d-flex align-center text-h6 gap-2 mb-2">
            <PhoneCallIcon />
            {{ card.user.phone }}
          </h6>
          <h6 class="d-flex align-center text-h6 gap-2 mb-2">
            <CurrencyDollarIcon />
            {{ card.total_price }} m.
          </h6>


          <h6 class="d-flex align-center text-h6 gap-2 mb-2">
            <BrandProducthuntIcon />
            {{ card.qty }} sany
          </h6>

        </v-card-item>

      </v-card>
    </v-col>
  </v-row>
</template>
