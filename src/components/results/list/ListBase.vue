<template>
  <v-container>
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
      v-if="this.$parent.error"
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
          <i>
            Error loading results...
          </i>
          <a
            class="text-decoration-underline black--text text--lighten-1"
            @click.prevent="retry"
          >
            Retry
          </a>
        </v-alert>
      </v-col>
    </v-row>
    <v-row
      dense
      v-if="$parent.resultsTotal > 0"
    >
      <slot />
    </v-row>
    <v-row
      dense
      justify="center"
      v-if="this.$parent.loading"
    >
      <v-progress-circular
        indeterminate
      />
    </v-row>
    <!--     PAGINATION -->
    <!-- TODO: pagination panel falls behind social media bar without margin-bottom -->
    <div
      class="my-16"
      style="margin-bottom: 135px !important"
      v-if="!anyFileType && !infinite"
    >
      <v-pagination
        v-model="$parent.queryPage"
        :length="pageCount"
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
    pageCount() {
      return Math.min(this.$parent.pageCount, maxPages);
    },
  },
  data() {
    return {
      infinite: this.$parent.infinite === true,
    };
  },
  methods: {
    setFileType() {
      this.search({ type: this.$parent.fileType });
    },
    retry() {
      // doSomething
    },
  },
};
</script>
