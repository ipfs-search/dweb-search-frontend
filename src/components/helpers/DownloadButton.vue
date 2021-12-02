<template>
  <v-btn
    icon
    color="grey"
    :href="`${getResourceURL(hash)}?download=true&filename=${fileName()}`"
    :download="fileName()"
  >
    <v-icon>mdi-tray-arrow-down</v-icon>
  </v-btn>
</template>

<script>
import getResourceURL from '@/helpers/resourceURL';

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getResourceURL,
    /**
     * strip tags from title
     * @returns {string}
     */
    fileName() {
      return new DOMParser()
        .parseFromString(this.file.title, 'text/html')
        .body
        .textContent || 'download';
    },
  },
};
</script>
