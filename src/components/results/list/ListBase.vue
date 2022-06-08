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
      v-if="$parent.error"
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
      v-if="$parent.resultsTotal !== 0"
      dense
    >
      <slot />
    </v-row>
    <v-row
      v-if="$parent.loading"
      dense
      justify="center"
    >
      <v-progress-circular
        indeterminate
      />
    </v-row>
    <!--     PAGINATION -->
    <!-- TODO: pagination panel falls behind social media bar without margin-bottom -->
    <div
      v-if="!anyFileType && !infinite"
      class="my-16"
      style="margin-bottom: 135px !important"
    >
      <v-pagination
        v-model="$parent.queryPage"
        :length="pageCount"
        total-visible="9"
      />
    </div>
  </v-container>
</template>

<script setup>
import { maxPages } from '@/helpers/ApiHelper';
import { enterSearchQuery } from '@/helpers/routerHelper';

export default {
  data() {
    return {
      infinite: this.$parent.infinite === true,
    };
  },
  computed: {
    anyFileType() {
      return this.$route.query.type === 'any' || this.$route.query.type === undefined;
    },
    pageCount() {
      return Math.min(this.$parent.pageCount, maxPages);
    },
  },
  methods: {
    setFileType() {
      enterSearchQuery({ type: this.$parent.fileType });
    },
  },
};
</script>
