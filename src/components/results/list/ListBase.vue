<template>
  <v-container>
    <!--     PAGINATION -->
    <!--    N.b. duplicate code with below-->
    <div
      class="my-16"
      v-if="!anyFileType && !infinite"
    >
      <v-pagination
        v-model="$parent.page"
        :length="page_count"
        total-visible="9"
      />
    </div>
    <!--    results section -->
    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
          <div><slot name="type" /></div>
          <div v-if="anyFileType ">
            <a
              class="text-subtitle-1 text-decoration-none text--secondary"
              @click.prevent="setFileType"
            >
              View all
            </a>
          </div>
        </v-subheader>
      </v-col>
    </v-row>

    <v-row
      v-if="this.$parent.loadingError"
    >
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-alert
          border="left"
          color="red lighten-2"
        >
          <i>Error loading results...</i>
        </v-alert>
      </v-col>
    </v-row>
    <v-row
      dense
      justify="center"
      v-if="this.$parent.loading && !this.$parent.infinite"
    >
      <v-progress-circular
        indeterminate
      />
    </v-row>
    <v-row
      dense
      v-else-if="$parent.results.total > 0"
    >
      <slot />
    </v-row>
    <!--     PAGINATION -->
    <!--    N.b. duplicate code with above - thanks Vue v. 2-->
    <div
      class="my-16"
      v-if="!anyFileType && !infinite"
    >
      <v-pagination
        v-model="$parent.page"
        :length="page_count"
        total-visible="9"
      />
    </div>
  </v-container>
</template>

<script>
import SearchMixin from '@/mixins/SearchMixin';
import { maxPages } from '@/helpers/ApiHelper';

export default {
  mixins: [SearchMixin],
  computed: {
    anyFileType() {
      return this.$route.query.type === 'any' || this.$route.query.type === undefined;
    },
  },
  data() {
    return {
      infinite: this.$parent.infinite === true,
      page_count: 0,
    };
  },
  watch: {
    '$parent.results.page_count': {
      handler(next) {
        if (next > 0) {
          this.page_count = Math.min(next, maxPages);
        }
      },
      immediate: true,
    },
  },
  methods: {
    setFileType() {
      this.search({ type: this.$parent.fileType });
    },
  },
};
</script>
