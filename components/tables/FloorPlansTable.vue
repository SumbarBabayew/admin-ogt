<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deleteFloorPlan } from "@/service/admin.api";
const emit = defineEmits(["delete-item"]);
const props = defineProps({ items: Array, count: Number });
const handleItems = ref([])
const deleteLoading = ref(false)
const deleteItem = async (c) => {
  await deleteFloorPlan({ id: c }).then(() => {
    deleteLoading.value = true;
    handleItems.value = props.items.filter(item => item.id !== c)
    emit("delete-item", handleItems.value)
  })
  deleteLoading.value = false
}
</script>

<template>
  <div>
    <div class="container">
      <span class="count">Sany ( {{ props.count }} )</span>
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-6">Event</div>
          <div class="col col-6">International</div>
          <div class="col col-6">National</div>
          <div class="col col-6">Turkmen</div>
          <div class="col col-1">Functions</div>
        </li>
        <li class="table-row" v-for="(item, i) in items">
          <div class="col col-6" data-label="Event">{{ item.event != null ? item.event.name : "" }}</div>
          <div class="col col-6" data-label="International">{{ item.internationalCount }}</div>
          <div class="col col-6" data-label="National">{{ item.nationalCount }}</div>
          <div class="col col-6" data-label="Turkmen">{{ item.turkmenCount }}</div>
          <div class="col col-1" data-label="Functions">
            <v-btn size="30" class="profileBtn bg-primary custom-hover-primary" @click="$goPage(`/floor-plan/${item.id}`)"
              variant="text" v-bind="props">
              <FilePencilIcon size="15" />
            </v-btn>
            <v-btn size="30" class="profileBtn bg-error custom-hover-primary" variant="text" @click="deleteItem(item.id)"
              v-bind="props">
              <TrashIcon size="15" />
            </v-btn>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<style lang="scss" scoped>
body {
  font-family: 'lato', sans-serif;
}

.count {
  font-weight: 800;
}

.container {
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
}

.image {
  border-radius: 10%;
  width: 35%;
  height: 100%;
}


.responsive-table {
  width: 100%;

  li {
    border-radius: 3px;
    padding: 15px 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  .table-header {
    background-color: #5D87FF;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: white;
    margin-bottom: 0.4rem;
  }

  .table-row {
    background-color: white;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
    align-items: center;
    padding: 10px 5px;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
  }


  .col {
    flex-basis: 20%;
    align-items: center;
    font-weight: 600;
  }

  .col-6 {
    display: flex;
    gap: 0rem;
  }

  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }

    .image {
      border-radius: 10px;
      width: 20%;
    }

    li {
      display: block;
    }

    .col {
      flex-basis: 100%;
    }

    .col {
      display: flex;
      padding: 10px 0;

      &:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
}
</style>