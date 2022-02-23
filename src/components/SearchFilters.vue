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
              cols="6"
              md="3"
            >
              <single-select-filter-module
                :items="sizeOptions"
                :filter-model="sizeFilter"
                filter-label="Size"
                :on-change="changeSizeFilter"
              />
            </v-col>

            <v-col
              cols="6"
              md="3"
            >
              <single-select-filter-module
                :items="lastSeenOptions"
                :filter-model="lastSeenFilter"
                filter-label="Last seen"
                :on-change="changeLastSeenFilter"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '@/store';
import { enterSearchQuery } from '@/helpers/routerHelper';
import SingleSelectFilterModule from '@/components/results/modules/SingleSelectFilterModule';

export default {
  setup() {
    return {
      changeLastSeenFilter: (value) => enterSearchQuery({ last_seen: value }),
      changeSizeFilter: (value) => enterSearchQuery({ size: value }),
    };
  },
  components: { SingleSelectFilterModule },
  computed: {
    lastSeenFilter: () => store.state.query.filters.lastSeen,
    sizeFilter: () => store.state.query.filters.size,
  },
  data: () => ({
    sizeOptions: [
      {
        text: '0-10mb', value: ['<=10485760'],
      },
      {
        text: '10-100mb', value: ['>10485760', '<=104857600'],
      },
      {
        text: '100mb-1gb', value: ['>104857600', '<=1073741824'],
      },
      {
        text: '1gb+', value: ['>1073741824'],
      },
      {
        text: 'any', value: [],
      },
    ],

    lastSeenOptions: [
      {
        text: '<24hr', value: '[ now-24h/h TO *]',
      },
      {
        text: '<7d', value: '[ now/h-7d TO *]',
      },
      {
        text: '<30d', value: '[ now/d-30d TO *]',
      },
      {
        text: 'any', value: '*',
      },
    ],
  }),
};
</script>
