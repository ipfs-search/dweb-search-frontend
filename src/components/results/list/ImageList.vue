<template>
  <ListBase>
    <template #type>
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
          <v-hover v-slot="{ hover }">
            <v-card
              v-if="hit"
              @click="goToDetailPage(index)"
              :id="hit.hash"
              :class="{ blurExplicit: blurExplicit(hit)}"
              :data-nsfw-classification="JSON.stringify(hit.nsfwClassification)"
              :data-nsfw="hit.nsfw"
              :elevation="hover ? 12 : 2"
            >
              <v-tooltip
                bottom
                align="center"
              >
                <template #activator="{ on, attrs }">
                  <v-img
                    :src="getResourceURL(hit.hash)"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <template #placeholder>
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
                </template>
                <div aligh="center">
                  <div v-if="blurExplicit(hit)">
                    Blurring explicit content. See settings in menubar under
                    <v-icon color="white">
                      mdi-cog
                    </v-icon>
                  </div>
                  <div v-if="hit.nsfwClassification">
                    {{
                      Object.entries(hit.nsfwClassification)
                        .reduce((p, [classifier, value]) =>
                          `${p} ${classifier}: ${Math.round(value * 100)}%`, ''
                        )
                    }}
                  </div>
                </div>
              </v-tooltip>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script>
import InfiniteScrollingMixin from '@/components/results/list/mixins/InfiniteScrollingMixin';
import { Types } from '@/helpers/typeHelper';
import { blurExplicit } from '@/mixins/BlurExplicitImagesModule';
import FileListMixin from './mixins/FileListMixin';

export default {
  setup() {
    return { blurExplicit };
  },
  mixins: [FileListMixin, InfiniteScrollingMixin],
  data() {
    return {
      fileType: Types.images,
      shortList: 6,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/blurExplicitImages";
</style>
