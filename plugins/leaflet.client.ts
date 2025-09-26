import l from "leaflet";
export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: { l },
  };
});
