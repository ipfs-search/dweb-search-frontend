<script setup>
import NsfwTooltip from "@/components/shared/nsfwTooltip.vue";
import ListBase from "./BaseList.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import TileList from "@/components/searchViewComponents/TileList.vue";
import { imports } from "@/composables/useFileListComposable";
import { useBlurExplicit } from "@/composables/BlurExplicitImagesComposable";
import { Types } from "@/helpers/typeHelper";

const fileType = Types.images;

const { getResourceURL } = imports;

const { blurExplicit } = useBlurExplicit();
</script>

<template>
  <ListBase :file-type="fileType">
    <tile-list v-slot="{ hit, index }" :file-type="fileType">
      <hover-card :hit="hit" :index="index" :file-type="fileType">
        <v-img
          :src="getResourceURL(hit.hash)"
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
          <NsfwTooltip :file="hit" />
        </v-img>
      </hover-card>
    </tile-list>
  </ListBase>
</template>
