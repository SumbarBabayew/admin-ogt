<script setup >
import { baseUrl } from '@/data/dashboard/BaseUrl';
import { deleteStore } from "@/service/admin.api";
const props = defineProps({ items: Array });
const emit = defineEmits(["delete-item"]);
const handleItems = ref([])
const deleteLoading = ref(false)
const deleteItem = async (c) => {
    await deleteStore({ id: c }).then(() => {
        deleteLoading.value = true;
        handleItems.value = props.items.filter(item => item.id !== c)
        emit("delete-item", handleItems.value)
    })
    deleteLoading.value = false
}
</script>
<template>
    <v-row>
        <v-col cols="12" lg="3" sm="6" v-for="(card, i) in  props.items " :key="i">
            <v-card elevation="10" class="withbg store__card" rounded="md">
                <NuxtLink :to="''">
                    <img crossorigin="anonymous" :src="`${baseUrl.url_base}/${card.avatar}`"
                        style="height:200px; width: 100%;" class="rounded-t-md" alt="123" />
                    <div :class="`store__card--lenta ${card.isVisible ? 'green' : 'red'}`"></div>
                </NuxtLink>
                <div class="d-flex justify-end  mt-n5">
                    <v-menu :close-on-content-click="false">
                        <template v-slot:activator="{ props }">
                            <v-btn size="30" icon class="profileBtn bg-borderColor" variant="text" v-bind="props">
                                <DotsIcon />
                            </v-btn>
                        </template>
                        <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
                            <v-list class="py-0" lines="one" density="compact"
                                @click="$goPage(`/store/contact/${card.id}`, {})">
                                <v-list-item value="item2" active-color="primary">
                                    <template v-slot:prepend>
                                        <HeadphonesIcon size="20" />
                                    </template>
                                    <v-list-item-title class="pl-4 text-body-1">Habarlasmak</v-list-item-title>
                                </v-list-item>
                            </v-list>

                            <v-list class="py-0" lines="one" density="compact"
                                @click="$goPage('/product', { storeId: card.id })">
                                <v-list-item value="item2" active-color="primary">
                                    <template v-slot:prepend>
                                        <BrandProducthuntIcon size="20" />
                                    </template>
                                    <v-list-item-title class="pl-4 text-body-1">Harytlary</v-list-item-title>
                                </v-list-item>
                            </v-list>

                            <v-list class="py-0" lines="one" density="compact"
                                @click="$goPage('/store/order', { storeId: card.id })">
                                <v-list-item value="item2" active-color="primary">
                                    <template v-slot:prepend>
                                        <ShoppingCartDiscountIcon size="20" />
                                    </template>
                                    <v-list-item-title class="pl-4 text-body-1">Zakazlary</v-list-item-title>
                                </v-list-item>
                            </v-list>

                            <v-list class="py-0" lines="one" density="compact"
                                @click="$goPage(`/store/location/${card.id}`, {})">
                                <v-list-item value="item2" active-color="primary">
                                    <template v-slot:prepend>
                                        <SortAscending2Icon size="20" />
                                    </template>
                                    <v-list-item-title class="pl-4 text-body-1">Yerlesyan yeri</v-list-item-title>
                                </v-list-item>
                            </v-list>

                            <v-list class="py-0" lines="one" density="compact" @click="$goPage(`/store/${card.id}`, {})">
                                <v-list-item value="item2" active-color="primary">
                                    <template v-slot:prepend>
                                        <FilePencilIcon size="20" />
                                    </template>
                                    <v-list-item-title class="pl-4 text-body-1">Duzetmek</v-list-item-title>
                                </v-list-item>
                            </v-list>
                            <v-list class="py-0" lines="one" density="compact"
                                @click="$goPage(`/store/delivery-service/${card.id}`, {})">
                                <v-list-item value="item2" active-color="primary">
                                    <template v-slot:prepend>
                                        <TruckDeliveryIcon size="20" />
                                    </template>
                                    <v-list-item-title class="pl-4 text-body-1">Eltip bermek hyzmaty</v-list-item-title>
                                </v-list-item>
                            </v-list>

                            <v-list class="py-0" lines="one" density="compact" :loading="deleteLoading"
                                @click="deleteItem(card.id)">
                                <v-list-item value="item2" active-color="primary">
                                    <template v-slot:prepend>
                                        <TrashIcon size="20" />
                                    </template>
                                    <v-list-item-title class="pl-4 text-body-1">Pozmak</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-menu>

                </div>
                <v-card-item class="pt-4 d-flex">
                    <h6 class="text-h6" v-text="`${card.name} (${card.count_product || 0})`"></h6>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
