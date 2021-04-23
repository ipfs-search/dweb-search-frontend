<template>
    <!-- container with nested row and col components to layout filters
      Filters are made with menu components that is triggered
      via a click 'on'. The menu it self consists of list components
      containing list-items which contains a list-item-title
    -->
    <v-container>
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2" align="end" class="text--secondary text-body-2">
          <span class="hidden-sm-and-down text-body-2">Filter: </span>

          <span>
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <span
                  class="m-2 text-body-2"
                  v-on="on"
                  v-bind="attrs"
                >
                  Size {{ sizeFilter }}<v-icon>mdi-menu-down</v-icon>
                </span>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sizeItems"
                  :key="index"
                  @click="setSizeFilter(index)"
                >
                  <v-list-item-title class="text-body-2">{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>


        </v-col>
      </v-row>
    </v-container>
</template>

<script>

export default {
  components: {
  },

  data: () => ({
    sizeFilter: '0-10mb',
    lastSeenFilter: '<3hr',

    sizeItems: [
      { title: '0-10mb' },
      { title: '10-100mb' },
      { title: '100mb-1gb' },
      { title: '1gb+' }
    ],

    lastSeenItems: [
      { title: '<3hr' },
      { title: '<24hr' },
      { title: '<7d' }
    ],
  }),

  methods: {
    setSizeFilter (index) {
      this.sizeFilter = this.sizeItems[index].title
    },

    setLastSeenFilter (index) {
      this.lastSeenFilter = this.lastSeenItems[index].title
    },
  },
}
</script>
