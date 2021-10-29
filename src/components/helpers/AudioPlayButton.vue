<template>
  <!--  TODO: make these buttons into a generalized reusable component and reduce this to ~12 lines or so -->
  <v-btn
    v-if="!currentlyLoadedInPlayer"
    large
    fab
    color="black"
    @click.stop="loadSoundFile($props.file)"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <v-icon
      size="42"
      color="white"
    >
      mdi-play
    </v-icon>
  </v-btn>
  <v-icon
    v-else-if="currentlyLoadedInPlayer && $data.error"
    large
    fab
    color="black"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
    :title="$data.error"
  >
    mdi-alert
  </v-icon>
  <v-btn
    large
    fab
    color="black"
    icon
    v-else-if="currentlyLoadedInPlayer && loading"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <v-progress-circular
      indeterminate
    />
  </v-btn>
  <v-btn
    v-else-if="currentlyLoadedInPlayer && playing"
    large
    fab
    color="black"
    icon
    @click="pause"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <v-icon>
      mdi-pause
    </v-icon>
  </v-btn>
  <v-btn
    v-else
    large
    fab
    color="black"
    @click.stop="play"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <v-icon
      size="42"
      color="white"
    >
      mdi-play
    </v-icon>
  </v-btn>
</template>

<script>
import AudioControlsMixin from '../../mixins/AudioControlsMixin';

export default {
  mixins: [
    AudioControlsMixin,
  ],
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentlyLoadedInPlayer() {
      return this.$props.file.hash === this.sourceFile?.hash;
    },
  },
};
</script>
