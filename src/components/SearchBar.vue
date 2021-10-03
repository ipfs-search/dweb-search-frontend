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
                  v-for="t in searchTypes"
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
import SearchMixin from '@/mixins/SearchMixin';
import store from '@/store';
import { searchTypes } from '@/helpers/typeHelper';

export default {
  created() {
    this.searchTypes = searchTypes;
  },
  mixins: [SearchMixin],
  computed: {
    type: {
      get() {
        return store.state.query.type;
      },
      set(value) {
        store.commit('query/setType', value);
        this.search();
      },
    },
    query: {
      get() {
        return store.state.query.user_query;
      },
      set(value) {
        store.commit('query/setUserQuery', value);
        // Note that we don't search every time query changes!
      },
    },
  },
  watch: {
    '$route.query': function (after, before) {
      console.log('watching the query', after, before);
      store.commit('query/setRouteParams', this.$route.query);
      // store.dispatch(`results/${this.type}/resetResults`);
      // store.dispatch(`results/${this.type}/getResults`);
    },
  },
};
</script>

<style lang="scss" scoped>
  .search {
    max-width: 960px;
  }
</style>
