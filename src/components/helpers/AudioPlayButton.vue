<template>
  <v-btn
    v-if="$route.name === 'Search'"
    icon
    color="white"
    @click.stop="play"
  >
    <v-icon>mdi-play-circle-outline</v-icon>
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
      transform: translate(-50%, -50%);"
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
import { AudioEvents } from '../AudioPlayer';

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    play() {
      this.$root.$emit(AudioEvents.load, this.$props.file);
    },
  },
};
</script>
