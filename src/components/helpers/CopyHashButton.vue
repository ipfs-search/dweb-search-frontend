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
    @click.stop="copyHash"
  >
    <v-icon>mdi-content-copy</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    hash: {
      type: String,
      required: true,
    },
  },
  methods: {
    copyHash() {
      navigator.clipboard.writeText(this.hash);
    },
  },
};
</script>
