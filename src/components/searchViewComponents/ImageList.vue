<script setup>
import NsfwTooltip from "@/components/shared/nsfwTooltip.vue";
import ListBase from "./BaseList.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { useFileListComposable, imports } from "@/composables/useFileListComposable";
import { useBlurExplicit } from "@/composables/BlurExplicitImagesComposable";
import { Types } from "@/helpers/typeHelper";
import ImageSpinner from "@/components/shared/imageSpinner.vue";

const fileType = Types.images;

const { slicedHits } = useFileListComposable({ fileType });

const { getResourceURL } = imports;

const { blurExplicit } = useBlurExplicit();
</script>

<template>
  <ListBase :file-type="fileType">
    <v-col id="resultsList" cols="12" xl="8" offset-xl="2">
      <v-row dense>
        <v-col v-for="(hit, index) in slicedHits(6)" :key="index" cols="6" sm="4" md="3" lg="2">
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <v-img
              :src="getResourceURL(hit.hash)"
              aspect-ratio="1"
              :class="{ blurExplicit: blurExplicit(hit) }"
              :data-nsfw-classification="JSON.stringify(hit.nsfwClassification)"
              :data-nsfw="hit.nsfw"
              class="rounded grey lighten-2"
            >
              <template #placeholder> <image-spinner /></template>
              <NsfwTooltip :file="hit" />
            </v-img>
          </hover-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>
