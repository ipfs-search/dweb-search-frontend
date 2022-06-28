<script setup>
import { useDetail, detailProps } from '@/composables/useDetail';
const props = defineProps(detailProps)
const { resourceURL } = useDetail(props)

import { useBlurExplicit } from '@/composables/BlurExplicitImagesComposable';
import GenericDetail from '@/components/detailViewComponents/GenericDetail.vue';
const { blurExplicit } = useBlurExplicit();
</script>

<template>
  <generic-detail :file="file">
    <v-row>
      <v-col
        cols="12"
        md="10"
        offset-md="1"
        :class="{ blurExplicit: blurExplicit(file)}"
      >
        <v-img
          :data-nsfw-classification="JSON.stringify(file.nsfwClassification)"
          :data-nsfw="file.nsfw"
          :src="resourceURL"
          max-height="400px"
          class="image-wrapper"
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
