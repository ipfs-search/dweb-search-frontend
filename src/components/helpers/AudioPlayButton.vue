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

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    play() {
      this.$store.dispatch('player/selectAudioFile', this.file);
    },
  },
};
</script>
