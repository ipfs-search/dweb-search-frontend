<!-- 
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@visualspace.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->


<template>
  <v-btn
    icon
    color="grey"
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
