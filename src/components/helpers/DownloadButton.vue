<template>
  <v-btn
    icon
    color="grey"
    :href="getURL()"
    :download="getURL()"
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
      const reference = this.file.references?.[0];
      if (reference) {
        return `${getResourceURL(reference.parent_hash)}/${reference.name}?download=true`;
      }

      let extension = getFileExtension(this.file);
      if (extension) extension = `.${extension}`;

      return `${getResourceURL(this.file.hash)}${extension}?download=true`;
    },
  },
};
</script>
