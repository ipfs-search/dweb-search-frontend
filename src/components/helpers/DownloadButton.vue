<template>
  <v-btn
    icon
    color="grey"
    @click.stop="download"
  >
    <v-icon>mdi-tray-arrow-down</v-icon>
  </v-btn>
</template>

<script>
import getResourceURL from '@/helpers/resourceURL';

export default {
  props: {
    hash: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: 'download',
    },
  },
  methods: {
    download() {
      const rURL = getResourceURL(this.hash);

      fetch(rURL)
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = this.title;
          link.click();
        })
        .catch(console.error);
    },
  },
};
</script>
