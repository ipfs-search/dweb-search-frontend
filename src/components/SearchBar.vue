<template>
  <div>
    <v-container class="d-flex justify-center">
      <div class="search flex-grow-1">
        <v-text-field
          v-model="searchPhrase"
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
          @keyup.enter="enterSearchPhrase"
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
                  <span class="text-capitalize">{{ type }}</span>
                  <v-icon
                    class="d-inline-block"
                  >
                    mdi-menu-down
                  </v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item
                  v-for="t in searchTypes"
                  :key="t"
                  @click="type=t"
                >
                  <v-list-item-title
                    class="text-capitalize"
                  >
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
              @click="enterSearchPhrase"
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
import SearchMixin from '@/mixins/SearchMixin';
import store from '@/store';
import { searchTypes } from '@/helpers/typeHelper';

export default {
  beforeCreate() {
    store.commit('query/setRouteParams', this.$route.query);
  },
  created() {
    this.searchTypes = searchTypes;
  },
  mixins: [SearchMixin],
  data() {
    return {
      searchPhrase: store.state.query.user_query,
    };
  },
  computed: {
    type: {
      get: () => store.state.query.type,
      set(newType) {
        this.search({ type: newType });
      },
    },
  },
  methods: {
    enterSearchPhrase() {
      console.debug('Entering search phrase:', this.$data.searchPhrase);
      if (this.$route.query.q === this.$data.searchPhrase) {
        console.debug('No need to push the same query:', this.$data.searchPhrase);
        return;
      }
      this.search({ q: this.$data.searchPhrase });
    },
  },
  watch: {
    '$route.query': (routeQuery) => {
      console.debug(
        'SearchBar watch route.query: committing route query to store', routeQuery,
      );
      store.commit('query/setRouteParams', routeQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
  .search {
    max-width: 960px;
  }
</style>
