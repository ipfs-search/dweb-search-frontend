<script setup>
import { mdiRobotDead } from "@mdi/js";

import NsfwTooltip from "@/components/shared/nsfwTooltip.vue";
import { detailProps } from "@/composables/useDetail";
defineProps(detailProps);

import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import { useBlurExplicit } from "@/composables/BlurExplicitImagesComposable";
const { blurExplicit } = useBlurExplicit();

import NyatsImg from "@/helpers/nyats/vuetify-img-cid.vue";
</script>

<template>
  <generic-detail :file="file">
    <v-row>
      <v-col cols="12" md="10" offset-md="1" :class="{ blurExplicit: blurExplicit(file) }">
        <nyats-img
          :cid="file.hash"
          type="image"
          :data-nsfw-classification="JSON.stringify(file.nsfwClassification)"
          :data-nsfw="file.nsfw"
          max-height="400px"
          class="image-wrapper"
          :class="{ blurExplicit: blurExplicit(file) }"
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

          <NsfwTooltip :file="file" />
        </nyats-img>
      </v-col>
    </v-row>
  </generic-detail>
</template>

<style lang="scss" scoped>
.image-wrapper {
  width: 100% !important;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
.image-wrapper:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
</style>
