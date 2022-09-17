<script setup>
import SearchFilters from "@/components/searchViewComponents/subcomponents/SearchFilters.vue";
</script>

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

<style lang="scss" scoped>
.menu {
  // to align below header, which is 56px
  margin-top: 56px;
  position: fixed;
  width: 100%;
}
</style>
