<!--
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@visualspace.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->

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
import { audioPlayer } from '@/plugins/audioPlugin';

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
      this.player.on('play', () => {
        audioPlayer.stop();
        audioPlayer.close();
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
