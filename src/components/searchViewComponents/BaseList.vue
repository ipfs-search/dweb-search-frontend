<script setup>
import ListCardheader from '@/components/searchViewComponents/subcomponents/genericListCardHeader.vue';
import HoverCard from './subcomponents/HoverCard.vue'
import { TypeListNames } from '@/helpers/typeHelper';
import { fileListComposable, fileListProps } from '@/composables/fileListComposable'
import { onBeforeMount } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';

const props = defineProps({
  fileType: {
    type: String,
    required: true,
  },
  ...fileListProps,
})

const {
  resultsTotal,
  anyFileType,
  queryPage,
  pageCount,
  error,
  loading,
  infinite,
  setFileType,
  handleQueryChange,
  shownHits,
  getResultsOnMount,
} = fileListComposable(props);

onBeforeMount(getResultsOnMount);

// replaces watch on route.query
onBeforeRouteUpdate(({ query }, from, next) => {
  handleQueryChange(query);
  next()
})
</script>

<template>
  <v-container
  >
    <!--    results section -->
    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-card flat>
          <v-card-header class="mb-n3 justify-space-between">
            <v-card-subtitle class="text-subtitle-1 d-flex justify-space-between">
              {{ TypeListNames[fileType] }} ({{ resultsTotal }})
            </v-card-subtitle>
            <v-card-subtitle class="text-subtitle-1 d-flex justify-space-between">
              <a
                v-if="anyFileType"
                class="text-subtitle-1 text-decoration-none text-secondary"
                @click.prevent="setFileType"
              >
                View all
              </a>
            </v-card-subtitle>
          </v-card-header>
        </v-card>
      </v-col>
    </v-row>

    <v-row
      v-if="error"
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
      v-if="resultsTotal !== 0"
      dense
    >
      <slot>
<!--    In this slot a custom search display    -->
        <v-col
          v-for="(hit, index) in shownHits"
          :key="index"
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <ListCardheader :hit="hit" />
          </hover-card>
        </v-col>
      </slot>
    </v-row>
    <v-row
      v-if="loading"
      dense
      justify="center"
    >
      <v-progress-circular
        color="ipfsPrimary"
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
        v-model="queryPage"
        :length="pageCount"
        total-visible="9"
      />
    </div>
  </v-container>
</template>