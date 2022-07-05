<script setup>
import ListBase from './BaseList.vue'
import HoverCard from './subcomponents/HoverCard.vue'
import { fileListComposable, imports } from '@/composables/fileListComposable';
import { useBlurExplicit } from '@/composables/BlurExplicitImagesComposable';
import { Types } from '@/helpers/typeHelper';
import {mdiCog} from '@mdi/js'

const fileType = Types.images;

const {
  slicedHits,
  infiniteScroll,
} = fileListComposable({ fileType })

const { getResourceURL } = imports;

const { blurExplicit } = useBlurExplicit()
</script>

<template>
  <ListBase
    :file-type="fileType"
    v-scroll="infiniteScroll"
  >
    <v-col
      id="resultsList"
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-row dense>
        <v-col
          v-for="(hit, index) in slicedHits(6)"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <v-img
              :src="getResourceURL(hit.hash)"
              aspect-ratio="1"
              :class="{ blurExplicit: blurExplicit(hit)}"
              :data-nsfw-classification="JSON.stringify(hit.nsfwClassification)"
              :data-nsfw="hit.nsfw"
              class="rounded grey lighten-2"
            >
              <template #placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="ipfsPrimary"
                  />
                </v-row>
              </template>
              <v-tooltip
                location="bottom"
                align="center"
                activator="parent"
              >
                <div>
                  <div v-if="hit.title" v-html="hit.title"></div>
                  <div v-if="blurExplicit(hit)">
                    Blurring explicit content. See settings in menubar under
                    <v-icon color="white" :icon="mdiCog" />
                  </div>
                  <div v-if="hit.nsfwClassification">
                    {{
                      Object.entries(hit.nsfwClassification)
                        .reduce((p, [classifier, value]) =>
                          `${p} ${classifier}: ${Math.round(value * 100)}%`, ''
                        )
                    }}
                  </div>
                  <div v-else>
                    NSFW classification not available
                  </div>
                </div>
              </v-tooltip>
            </v-img>
          </hover-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>
