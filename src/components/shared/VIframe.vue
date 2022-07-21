<script setup>
import { ref } from "vue";
const iframeLoading = ref(true);
defineProps({
  src: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div id="iframe-container">
    <div v-if="iframeLoading" id="iframe-spinner">
      <v-progress-circular indeterminate size="90" color="ipfsPrimary-lighten-4">
        <i>Loading...</i>
      </v-progress-circular>
    </div>
    <iframe :src="src" @load="iframeLoading = false" />
  </div>
</template>

<style lang="scss" scoped>
iframe {
  width: 100%;
  height: calc(100vh - 200px);
  border: 1px solid #bdbdbd;
}
#iframe-container {
  position: relative;
}
#iframe-spinner {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
