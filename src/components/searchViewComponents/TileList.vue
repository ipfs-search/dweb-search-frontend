<script setup>
import { useDisplay } from "vuetify";

const { xs, smAndDown, mdAndDown, lgAndUp } = useDisplay();
const props = defineProps({
  fileType: {
    type: String,
    required: true,
  },
});
import { useFileListComposable } from "@/composables/useFileListComposable";
const { slicedHits } = useFileListComposable({ fileType: props.fileType });
</script>
<template>
  <v-row dense>
    <v-col>
      <v-row dense>
        <v-col
          v-for="(hit, index) in slicedHits(xs ? 2 : smAndDown ? 6 : mdAndDown ? 8 : 10)"
          :key="index"
          cols="6"
          sm="4"
          md="3"
          :class="{ five_columns: lgAndUp }"
        >
          <slot :hit="hit" :index="index" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped>
.five_columns {
  width: 20%;
  max-width: 20%;
  flex-basis: 20%;
}
</style>
