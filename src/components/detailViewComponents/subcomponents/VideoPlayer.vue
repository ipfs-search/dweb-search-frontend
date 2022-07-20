<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-big-play-centered" />
  </div>
</template>

<script>
import videojs from "video.js";
import * as audioControls from "@/composables/audioControls";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.on("play", () => {
        audioControls.stop();
        audioControls.close();
      });
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.off("play");
      this.player.dispose();
    }
  },
};
</script>

<style lang="scss">
// .video-js {
//   width: 100%;
// }
</style>
