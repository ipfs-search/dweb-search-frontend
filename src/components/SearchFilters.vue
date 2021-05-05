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
              <!-- TODO: Align me properly -->
              <span class="hidden-sm-and-down text-body-2">Filter: </span>
            </v-col>

            <v-col cols="2">
              <!--
                Select component has everything setup for smooth interaction (including setting values).

                I strongly suggest we do everything we can to avoid creating custom components; it causes A LOT of
                extra work on the implementation side (= making things work, well, including edge cases, keyboard
                support, accessibility etc.) If it is absolutely necessary we can always do that later.

                The select component wraps a menu component, so we can set any properties, possibly even override
                template slots etc.

                Ref:
                https://vuetifyjs.com/en/components/selects/#menu-props
                https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/components/VSelect
              -->
              <v-select
                :items="sizeOptions"
                dense solo
                label="Size"
              >
                <template v-slot:selection="{ item }">
                  <span class="m-2 text-body-2">Size {{ item.text }}</span>
                </template>
              </v-select>
            </v-col>

            <v-col cols="2">
              <v-select
                :items="lastSeenOptions"
                dense solo
                label="Last seen"
              >
                <template v-slot:selection="{ item }">
                  <span class="m-2 text-body-2">Last seen {{ item.text }}</span>
                </template>
              </v-select>
            </v-col>
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
