<template>
  <div>
    <v-container class="d-flex justify-center">
      <div class="search flex-grow-1">
        <v-text-field
          v-model="query"
          placeholder="Search"
          light
          rounded
          height="42"
          autocomplete="off"
          autofocus
          dense
          solo
          validate-on-blur
          hide-details
          @keyup.enter="search"
        >
          <template v-slot:append>
            <v-menu
              style="top: -12px"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <div
                  class="mr-n3 grey--text d-flex align-center"
                  v-on="on"
                >
                  <span>{{ type }}</span>
                  <v-icon
                    class="d-inline-block"
                  >
                    mdi-menu-down
                  </v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item
                  v-for="t in types"
                  :key="t"
                  @click="type=t"
                >
                  <v-list-item-title>
                    <!-- TODO: capitalize first character -->
                    {{ t }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template
            v-slot:append-outer
            v-if="$vuetify.breakpoint.smAndDown ? false : true"
          >
            <v-icon
              style="margin-top: -2px;"
              size="34"
              color="white"
              @click="search"
            >
              mdi-magnify
            </v-icon>
          </template>
        </v-text-field>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: ['any', 'text', 'image', 'audio', 'video'],
    };
  },

  computed: {
    // https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
    type: {
      get() {
        return this.$store.state.search.query.type;
      },
      set(value) {
        this.$store.commit('search/setType', value);
        this.search();
      },
    },
    query: {
      get() {
        return this.$store.state.search.query.user_query;
      },
      set(value) {
        this.$store.commit('search/setUserQuery', value);
      },
    },
  },

  methods: {
    // Changed URL when calling search().
    search() {
      this.$router.push({
        path: '/search',
        query: this.$store.getters['search/stateToQueryParams'],
      });
    },
  },

  mounted() {
  },

};
</script>

<style lang="scss" scoped>
  .search {
    max-width: 960px;
  }
</style>
