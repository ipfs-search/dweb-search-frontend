<script setup>
import NsfwTooltip from "@/components/shared/nsfwTooltip.vue";
import { useDetail, detailProps } from "@/composables/useDetail";
const props = defineProps(detailProps);
const { resourceURL } = useDetail(props);

import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import { useBlurExplicit } from "@/composables/BlurExplicitImagesComposable";
import ImageSpinner from "@/components/shared/imageSpinner.vue";
const { blurExplicit } = useBlurExplicit();
</script>

<template>
  <generic-detail :file="file">
    <v-row>
      <v-col cols="12" md="10" offset-md="1" :class="{ blurExplicit: blurExplicit(file) }">
        <v-img
          :data-nsfw-classification="JSON.stringify(file.nsfwClassification)"
          :data-nsfw="file.nsfw"
          :src="resourceURL"
          max-height="400px"
          class="image-wrapper"
          :class="{ blurExplicit: blurExplicit(file) }"
        >
          <template #placeholder>
            <image-spinner />
          </template>
          <NsfwTooltip :file="file" />
        </v-img>
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
