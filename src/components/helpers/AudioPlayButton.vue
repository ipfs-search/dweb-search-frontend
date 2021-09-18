<template>
  <v-btn
    icon
    color="white"
    @click.stop="play"
  >
    <v-icon>mdi-play-circle-outline</v-icon>
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
      this.$root.$emit(AudioEvents.load, this.file);
    },
  },
};
</script>
