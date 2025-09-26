export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      goPage: (route, query) => {
        return NuxtApp.$router.push({
          path: route,
          query: query,
        });
      },
    },
  };
});
