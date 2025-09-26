import { addPlugin, createResolver, defineNuxtModule } from "@nuxt/kit";

export default defineNuxtModule({
  setup(options) {
    const resolver = createResolver(import.meta.url);
    addPlugin({
      src: resolver.resolve("./plugin.js"),
    });
  },
});
