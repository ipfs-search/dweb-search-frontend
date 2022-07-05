<script setup>
import { mdiContentCopy } from '@mdi/js'
</script>

<template>
  <v-btn
    :icon="mdiContentCopy"
    variant="contained-flat"
    class="text-grey"
    size="x-small"
    @click.stop="copyHash"
  />
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
