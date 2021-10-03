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
              <!--
                Select component has everything setup for smooth interaction
                (including setting values).

                I strongly suggest we do everything we can to avoid creating
                custom components; it causes A LOT of extra work on the
                implementation side (= making things work, well, including edge cases,
                keyboard support, accessibility etc.) If it is absolutely necessary
                we can always do that later.

                The select component wraps a menu component, so we can set any
                properties, possibly even override template slots etc.

                Ref:
                https://vuetifyjs.com/en/components/selects/#menu-props
                https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/components/VSelect
              -->
              <v-select
                :items="sizeOptions"
                dense
                :outlined="$vuetify.breakpoint.smAndDown ? true : false"
                :solo="$vuetify.breakpoint.smAndDown ? false : true"
                label="Size"
                height="38"
                style="margin-bottom: 0 !important; height: 38px !important"
                v-model="sizeFilter"
              >
                <template v-slot:selection="{ item }">
                  <span class="m-2 text-body-2">{{ $vuetify.breakpoint.smAndDown
                    ? '' : 'Size ' }}{{ item.text }}</span>
                </template>
              </v-select>
            </v-col>

            <v-col
              cols="6"
              md="3"
            >
              <v-select
                :items="lastSeenOptions"
                dense
                :outlined="$vuetify.breakpoint.smAndDown ? true : false"
                :solo="$vuetify.breakpoint.smAndDown ? false : true"
                label="Last seen"
                height="38"
                style="margin-bottom: 0 !important; height: 38px !important"
                v-model="lastSeenFilter"
              >
                <template v-slot:selection="{ item }">
                  <span class="m-2 text-body-2">{{ $vuetify.breakpoint.smAndDown
                    ? '' : 'Last seen ' }}{{ item.text }}</span>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import SearchFilter from './SearchFilter';
import SearchMixin from '@/mixins/SearchMixin';
import store from '@/store';

export default {
  components: {
    // SearchFilter,
  },

  mixins: [SearchMixin],

  computed: {
    lastSeenFilter: {
      get() {
        return store.state.query.filters.lastSeen;
      },
      set(value) {
        store.commit('query/setLastSeenFilter', value);
        this.search();
      },
    },
    sizeFilter: {
      get() {
        return store.state.query.filters.size;
      },
      set(value) {
        store.commit('query/setSizeFilter', value);
        this.search();
      },
    },
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
        text: '<3hr', value: '>now-3h',
      },
      {
        text: '<24hr', value: '>now-24h',
      },
      {
        text: '<7d', value: '>now-7d',
      },
      {
        text: 'any', value: 'any',
      },
    ],
  }),
};
</script>
