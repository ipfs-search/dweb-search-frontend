<template>
  <v-btn
    icon
    variant="contained-flat"
    class="text-grey"
    size="x-small"
    target="_blank"
    :href="getURL()"
  >
    <v-icon>mdi-tray-arrow-down</v-icon>
  </v-btn>
</template>

<script>
import getResourceURL from '@/helpers/resourceURL';
import { getFileExtension } from '@/helpers/fileHelper';

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getURL() {
      const params = new URLSearchParams({
        download: true,
      });

      const reference = this.file.references?.[0];

      if (reference) {
        params.append('filename', reference.name);
      } else {
        const ext = getFileExtension(this.file);
        params.append('filename', `${this.file.hash}.${ext}`);
      }

      const url = getResourceURL(this.file.hash);

      return `${url}?${params.toString()}`;
    },
  },
};
</script>
