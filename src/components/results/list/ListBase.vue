<script setup>
  import { TypeListNames } from '@/helpers/typeHelper';
  import { fileListComposable } from './fileListComposable'
  import { onMounted } from 'vue';
  import { onBeforeRouteUpdate } from 'vue-router';

  const props = defineProps({
    fileType: {
      type: String,
      required: true,
    },
    infinite: {
      type: Boolean,
      required: false,
      default: false,
    },
  })

  const {
    resultsTotal,
    anyFileType,
    queryPage,
    pageCount,
    error,
    loading,
    setFileType,
    handleQueryChange,
  } = fileListComposable(props);

  onMounted(() => {
    handleQueryChange()
  });

  // replaces watch on route.query
  onBeforeRouteUpdate(({ query }, from, next) => {
    handleQueryChange(query);
    next()
  })
</script>

<template>
  <v-container>
    <!--    results section -->
    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
<!--        replaced v-subheader with v-list-subheader -->
        <v-toolbar>
          <v-toolbar-title class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
            <div>
              {{ TypeListNames[fileType] }} ({{ resultsTotal }})
            </div>
            <div v-if="anyFileType ">
              <a
                class="text-subtitle-1 text-decoration-none text-secondary"
                @click.prevent="setFileType"
              >
                View all
              </a>
            </div>
          </v-toolbar-title>
        </v-toolbar>
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
      <slot />
    </v-row>
    <v-row
      v-if="loading"
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
        v-model="queryPage"
        :length="pageCount"
        total-visible="9"
      />
    </div>
  </v-container>
</template>
