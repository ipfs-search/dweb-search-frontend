<script setup>
import { mdiCog } from "@mdi/js";
import { nsfwClassificationFormatter } from "@/helpers/nsfwClassifier";
defineProps({
  file: {
    type: Object,
    required: true,
  },
});
import { useBlurExplicit } from "@/composables/BlurExplicitImagesComposable";
const { blurExplicit } = useBlurExplicit();
</script>
<template>
  <v-tooltip location="bottom" align="center" activator="parent">
    <div>
      <div v-if="file.title" v-sane-html="file.title"></div>
      <div v-if="blurExplicit(file)">
        Blurring explicit content. See settings in menubar under
        <v-icon color="white" :icon="mdiCog" />
      </div>
      <div v-if="file.nsfwClassification">
        {{ nsfwClassificationFormatter(file.nsfwClassification) }}
      </div>
      <div v-else>NSFW classification not available</div>
    </div>
  </v-tooltip>
</template>
