<template>
  <div>
    <video
      ref="videoPlayer"
      class="video-js vjs-big-play-centered"
    />
  </div>
</template>

<script>
import videojs from 'video.js';
// eslint-disable-next-line camelcase
import { audio_stop_event } from './AudioPlayer';

export default {
  name: 'VideoPlayer',
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
      // console.log('onPlayerReady', this);
      this.player.on('play', () => {
        this.$root.$emit(audio_stop_event);
      });
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.off('play');
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
