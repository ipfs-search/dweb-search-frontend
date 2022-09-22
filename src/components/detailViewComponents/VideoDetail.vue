<script setup>
import { ref, onMounted, watch } from "vue";
import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import { picsum } from "@/helpers/picsum";
import getResourceURL from "@/helpers/resourceURL";

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    required: false,
  },
});

const videoPlayer = ref();
const loading = ref(true);
const error = ref(false);

const setError = (e) => {
  error.value = true;
  loading.value = false;
};

const setActiveVideoCallbacks = (active) => {
  if (active) {
    videoPlayer.value?.setAttribute("autoplay", true);
    videoPlayer.value?.play();
  } else {
    videoPlayer.value?.removeAttribute("autoplay");
    videoPlayer.value?.pause();
  }
};
watch(() => props.active, setActiveVideoCallbacks);

onMounted(() => {
  videoPlayer.value?.setAttribute(
    "poster",
    picsum({
      height: videoPlayer.value.clientHeight,
      width: videoPlayer.value.clientWidth,
      seed: props.file.hash,
    })
  );
  videoPlayer.value?.addEventListener("canplay", () => {
    loading.value = false;
    videoPlayer.value?.setAttribute("controls", true);
    videoPlayer.value?.removeAttribute("poster");
  });
  setActiveVideoCallbacks(props.active);
});
</script>

<template>
  <generic-detail :file="file">
    <v-alert v-if="error" border color="ipfsPrimary-lighten-4" type="warning">
      <i>Unable to load video</i>
    </v-alert>
    <video ref="videoPlayer" class="w-100">
      <source :src="getResourceURL(file.hash)" :onerror="setError" />
    </video>
    <v-progress-circular
      v-if="loading"
      size="90"
      style="
        position: absolute;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
      indeterminate
    />
  </generic-detail>
</template>
