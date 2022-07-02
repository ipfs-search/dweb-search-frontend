<script setup>
import { ref } from 'vue';
let iframeLoading = ref(true);
const props = defineProps({
  src: {
    type: String,
    required: true,
  }
})
</script>
<template>
  <div style="position: relative">
    <div
      style="position: absolute; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%);"
      v-if="iframeLoading"
    >
      <v-progress-circular
        indeterminate
        size="90"
        color="ipfsPrimary-lighten-4"
      >
        <i>Loading...</i>
      </v-progress-circular>
    </div>
    <iframe
      style="width: 100%; height: calc(100vh - 200px);border: 1px solid #BDBDBD;"
      @load="iframeLoading = false"
      :src="src"
    />
  </div>
</template>
