<script setup>
import NsfwTooltip from "@/components/shared/nsfwTooltip.vue";
import ListBase from "./BaseList.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { useFileListComposable } from "@/composables/useFileListComposable";
import { useBlurExplicit } from "@/composables/BlurExplicitImagesComposable";
import { Types } from "@/helpers/typeHelper";
import { useDisplay } from "vuetify";
import { mdiRobotDead } from "@mdi/js";
import NyatsImg from "@/helpers/nyats/vuetify-img-cid.vue";

const fileType = Types.images;
const { xs, smAndDown, mdAndDown } = useDisplay();

const { slicedHits } = useFileListComposable({ fileType });
const { blurExplicit } = useBlurExplicit();
</script>

<template>
  <ListBase :file-type="fileType">
    <v-col id="resultsList" cols="12" xl="8" offset-xl="2">
      <v-row dense>
        <v-col
          v-for="(hit, index) in slicedHits(xs ? 2 : smAndDown ? 6 : mdAndDown ? 8 : 12)"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <nyats-img
              :cid="hit.hash"
              type="image"
              aspect-ratio="1"
              :class="{ blurExplicit: blurExplicit(hit) }"
              :data-nsfw-classification="JSON.stringify(hit.nsfwClassification)"
              :data-nsfw="hit.nsfw"
              class="rounded grey lighten-2"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="ipfsPrimary" />
                </v-row>
              </template>

              <template #failed>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-icon color="grey" size="large" :icon="mdiRobotDead" />
                </v-row>
              </template>

              <NsfwTooltip :file="hit" />
            </nyats-img>
          </hover-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>
