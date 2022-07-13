<script setup>
import CardContent from '@/components/searchViewComponents/subcomponents/genericCardContent.vue';
import HoverCard from './subcomponents/HoverCard.vue'
import { TypeListNames } from '@/helpers/typeHelper';
import { fileListComposable } from '@/composables/fileListComposable'
import { onBeforeMount } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import Hyperlink from '@/components/shared/Hyperlink.vue';

const route = useRoute()

const props = defineProps({
  fileType: {
    type: String,
    required: true,
  },
})

const {
  resultsTotal,
  anyFileType,
  queryPage,
  pageCount,
  error,
  loading,
  infinite,
  handleQueryChange,
  slicedHits,
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
    class="overflow-y-auto h-100"
  >
    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-card flat>
          <div class="justify-space-between d-flex flex-row ">
            <v-card-subtitle class="text-subtitle-1">
              {{ TypeListNames[fileType] }} ({{ resultsTotal }})
            </v-card-subtitle>
            <v-card-subtitle class="text-subtitle-1">
              <hyperlink
                :to="{...route, query: { ...route.query, type: fileType}}"
                v-if="anyFileType"
                class="text-subtitle-1 text-secondary"
              >
                View all
              </hyperlink>
            </v-card-subtitle>
          </div>
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
        <v-col
          v-for="(hit, index) in slicedHits(3)"
          :key="index"
          cols="12"
          xl="8"
          offset-xl="2"
        >
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <CardContent :hit="hit" />
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
