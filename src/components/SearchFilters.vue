<template>
  <!-- container with nested row and col components to layout filters
      Filters are made with menu components that is triggered
      via a click 'on'. The menu it self consists of list components
      containing list-items which contains a list-item-title
    -->
  <v-container>
    <v-row>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
        align="end"
        class="text--secondary text-body-2"
      >
        <v-container class="mx-0 px-0">
          <v-row class="d-flex align-center">
            <v-col class="hidden-sm-and-down">
              <span class="text-body-1">
                Filter:
              </span>
            </v-col>

            <v-col
              v-for="filter in filters"
              :key="filter.name"
              cols="6"
              md="3"
            >
<<<<<<< HEAD
              <select-filter
=======
              <single-select-filter-module
>>>>>>> cleanup
                :filter="filter"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SelectFilter from '@/components/helpers/SelectFilter';
import filters from './helpers/filters';

export default {
  setup() {
    return { filters };
  },
  components: { SelectFilter },
};
</script>
