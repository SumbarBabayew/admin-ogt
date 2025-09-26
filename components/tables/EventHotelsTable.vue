<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deleteHotelFromEvent } from "@/service/admin.api";
const emit = defineEmits(["delete-item"]);
const props = defineProps({ items: Array, count: Number, chatroom: Number });
const handleItems = ref([])
const deleteLoading = ref(false)
const deleteItem = async (c) => {
  await deleteHotelFromEvent({data: { hotelId: c, eventId: Number(props.chatroom) }}).then(() => {
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
          <div class="col col-1">Image</div>
          <div class="col col-1">Name</div>
          <div class="col col-4">Functions</div>
        </li>
        <li class="table-row" v-for="(item, i) in items">
          <div class="col col-2" data-label="Image">
            <img crossorigin="anonymous" class="image" :src="baseUrl.url_base + '/' + item.image" />
          </div>
          <div class="col col-1" data-label="Name">{{ item.nameEn }}</div>
          
          <div class="col col-4" data-label="Functions">
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