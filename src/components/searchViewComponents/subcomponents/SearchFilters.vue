<script setup>
import SelectFilter from "@/components/shared/SelectFilter.vue";
import { useRoute } from "vue-router";
import { mdiFilterOff } from "@mdi/js";
import HyperLink from "@/components/shared/HyperLink.vue";
const route = useRoute();
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-xl="2" class="bg-white px-8 d-flex justify-center">
        <v-container class="mx-0 px-0">
          <v-row class="text-secondary">
            <v-col>
              <span class="text-h6">Filters: </span>
            </v-col>
            <v-col class="d-flex justify-end">
              <hyper-link :to="{ ...route, query: { q: route.query.q, type: route.query.type } }">
                <v-icon :icon="mdiFilterOff" />
                <v-tooltip activator="parent"> Reset filters </v-tooltip>
              </hyper-link>
            </v-col>
          </v-row>
          <v-row class="d-flex align-content-stretch">
            <v-col v-for="filter in filters" :key="filter.slug" cols="12" sm="6" md="3">
              <select-filter :filter="filter" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    filters() {
      return this.$store.getters["query/filters/filterWidgets"];
    },
    filtersApplied() {
      return this.$store.getters["query/filters/anyFiltersApplied"];
    },
  },
};
</script>
