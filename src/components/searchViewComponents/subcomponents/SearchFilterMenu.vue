<template>
  <v-menu
    :close-on-content-click="false"
    activator="[data-id='filter-menu-activator']"
    transition="fade-transition"
    contained
    location-strategy="static"
    scroll-strategy="block"
    class="menu"
    z-index="1000"
    :scrim="true"
    width="100%"
  >
    <search-filters />
  </v-menu>
</template>

<script>
import SearchFilters from "@/components/searchViewComponents/subcomponents/SearchFilters.vue";

export default {
  components: { SearchFilters },
  computed: {
    filters() {
      return this.$store.getters["query/filters/filterWidgets"];
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
}
</style>
