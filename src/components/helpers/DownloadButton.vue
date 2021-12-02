<template>
  <v-btn
    icon
    color="grey"
    :href="`${getResourceURL(hash)}?download=true&filename=${title}`"
    :download="title"
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
    getResourceURL,
  },
};
</script>
