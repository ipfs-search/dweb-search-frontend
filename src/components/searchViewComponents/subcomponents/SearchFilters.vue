<template>
  <v-container>
    <v-row>
      <v-col cols="12" xl="8" offset-xl="2" align="end" class="text--secondary text-body-2">
        <v-container class="mx-0 px-0">
          <v-row class="d-flex align-center">
            <v-col class="hidden-sm-and-down">
              <span class="text-body-1"> Filter: </span>
            </v-col>

            <v-col v-for="filter in filters" :key="filter.slug" cols="6" md="3">
              <select-filter :filter="filter" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectFilter from "./SelectFilter.vue";

export default {
  components: { SelectFilter },
  computed: {
    filters() {
      return this.$store.getters["query/filters/filterWidgets"];
    },
  },
};
</script>
