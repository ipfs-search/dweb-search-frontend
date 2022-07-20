<script setup>
import { ref } from 'vue';
const iframeLoading = ref(true);
const props = defineProps({
  src: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div id="iframe-container">
    <div id="iframe-spinner" v-if="iframeLoading">
      <v-progress-circular indeterminate size="90" color="ipfsPrimary-lighten-4">
        <i>Loading...</i>
      </v-progress-circular>
    </div>
    <iframe @load="iframeLoading = false" :src="src"/>
  </div>
</template>

<style lang="scss" scoped>
iframe {
  width: 100%; height: calc(100vh - 200px);border: 1px solid #BDBDBD;
}
#iframe-container {
  position: relative;
}
#iframe-spinner {
  position: absolute; text-align: center; top: 50%; left: 50%; transform: translate(-50%, -50%);
}
</style>
