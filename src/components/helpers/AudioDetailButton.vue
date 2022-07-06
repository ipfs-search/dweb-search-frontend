<!--
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@mathijsfietst.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->

<template>
  <v-btn
    @click="$emit('click')"
    large
    fab
    dark
    color="black"
    :loading="$props.loading"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <v-icon
      size="42"
      color="white"
    >
      <slot />
    </v-icon>
  </v-btn>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
