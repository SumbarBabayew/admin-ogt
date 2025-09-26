export const limit = 20;

// const { $goPage } = useNuxtApp()

// FILTERS

export const store_filter = ref([
  { name: "Aktiwlar", value: { sort_by: "isVisible", as: "DESC" } },
  { name: "Aktiw daller", value: { sort_by: "isVisible", as: "ASC" } },
  { name: "Kop harytly", value: { sort_by: "count_product", as: "DESC" } },
  { name: "Az harytly", value: { sort_by: "count_product", as: "ASC" } },
  { name: "Guni azalyanlar", value: { sort_by: "expire_date", as: "DESC" } },
  { name: "Guni Kanler", value: { sort_by: "expire_date", as: "ASC" } },
]);

export const user_filter = ref([
  { name: "Ban", value: { sort_by: "isVisible", as: "ASC" } },
]);

export const product_filter = ref([
  { name: "Aktiwlar", value: { isBlocked: "false" } },
  { name: "Aktiw daller", value: { isBlocked: "true" } },
]);


export const company_filter = ref([
  { name: "All", value: { keyword: "" } },
]);