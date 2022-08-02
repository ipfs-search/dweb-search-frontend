<template>
  <v-row>
    <v-col cols="12" offset-xl="2" class="bg-white px-8 d-flex justify-center">
      <v-container class="mx-0 px-0">
        <v-row>
          <v-col>
            <span class="text-h6">Filter: </span>
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
</template>

<script>
import SelectFilter from "@/components/shared/SelectFilter.vue";

export default {
  components: { SelectFilter },
  computed: {
    filters() {
      return this.$store.getters["query/filters/filterWidgets"];
    },
  },
};
</script>
