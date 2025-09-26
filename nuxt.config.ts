// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt3-leaflet"],
  ssr: false,
  typescript: {
    shim: false,
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": true,
    },
  },
  runtimeConfig: {
    apiSecret: "123",
    public: {
      VITE_APP_BASE_URL: "http://192.168.1.124:55888/api/v1/admin",
      VITE_APP_FILE_URL: "http://192.168.1.124:55888/api/v1/admin",
      // VITE_APP_BASE_URL: "http://216.250.9.181:55888/api/v1/admin",
      // VITE_APP_FILE_URL: "http://216.250.9.181:55888/api/v1/admin",
    },
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {},
});
