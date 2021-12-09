<template>
  <ListBase>
    <template v-slot:type>
      Images ({{ resultsTotal }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
      id="resultsList"
    >
      <v-row dense>
        <v-col
          v-for="(hit, index) in shownHits"
          :key="index"
          class="d-flex child-flex"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-card
            v-if="hit"
            @click="goToDetailPage(index)"
            :id="hit.hash"
          >
            <v-img
              :src="getResourceURL(hit.hash)"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  />
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script>
import FileListMixin from './mixins/FileListMixin';
import InfiniteScrollingMixin from '@/components/results/list/mixins/InfiniteScrollingMixin';
import { Types } from '@/helpers/typeHelper';

export default {
  mixins: [
    FileListMixin,
    InfiniteScrollingMixin,
  ],
  data() {
    return {
      fileType: Types.images,
      shortList: 6,
    };
  },
};
</script>
