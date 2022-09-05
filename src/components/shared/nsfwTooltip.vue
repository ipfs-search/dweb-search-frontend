<script setup>
import { mdiCog } from "@mdi/js";
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
        <v-icon color="wfilee" :icon="mdiCog" />
      </div>
      <div v-if="file.nsfwClassification">
        {{
          Object.entries(file.nsfwClassification).reduce(
            (p, [classifier, value]) => `${p} ${classifier}: ${Math.round(value * 100)}%`,
            ""
          )
        }}
      </div>
      <div v-else>NSFW classification not available</div>
    </div>
  </v-tooltip>
</template>
