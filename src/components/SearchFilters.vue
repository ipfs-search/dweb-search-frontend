<template>
    <!-- container with nested row and col components to layout filters
      Filters are made with menu components that is triggered
      via a click 'on'. The menu it self consists of list components
      containing list-items which contains a list-item-title
    -->
    <v-container>
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2" align="end" class="text--secondary text-body-2">

          <v-row>
            <v-col>
              <!-- <span class="hidden-sm-and-down text-body-2">Filter: </span> -->
            </v-col>

            <v-col cols="2">
              <v-select
                :items="sizeOptions"
                dense
                label="Size"
              />
            </v-col>

            <v-col cols="2">
              <v-select
                :items="lastSeenOptions"
                dense
                label="Last seen"
              />
            </v-col>
<!--
            <SearchFilter
              label="Last seen"
              :options="sizeOptions"
              v-model="sizeFilter"
            />

            <SearchFilter
              label="Last seen"
              :options="lastSeenOptions"
              v-model="lastSeenFilter"
            /> -->
          </v-row>

        </v-col>
      </v-row>
    </v-container>
</template>

<script>
// import SearchFilter from './SearchFilter.vue';

export default {
  components: {
    // SearchFilter,
  },

  data: () => ({
    sizeFilter: '0-10mb',
    lastSeenFilter: '<3hr',

    sizeOptions: [
      {
        text: '0-10mb', value: '0-10mb'
      },
      {
        text: '10-100mb', value: '10-100mb'
      },
      {
        text: '100mb-1gb', value: '100mb-1gb'
      },
      {
        text: '1gb+', value: '1gb+'
      },
    ],

    lastSeenOptions: [
      {
        text: '<3hr', value: '<3hr'
      },
      {
        text: '<24hr', value: '<24hr'
      },
      {
        text: '<7d', value: '<7d'
      },
    ],
  }),

  methods: {
    setSizeFilter (index) {
      this.sizeFilter = this.sizeItems[index].title
    },

  },
}
</script>
