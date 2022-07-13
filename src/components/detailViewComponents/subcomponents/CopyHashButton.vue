<script setup>
import { mdiContentCopy } from '@mdi/js'
</script>

<template>
  <v-btn
    variant="flat"
    class="text-grey"
    @click.stop="copyHash"
    icon
  >
    <v-tooltip
      activator="parent"
      location="top"
    >
      <template #activator="{props}">
        <v-icon
          :icon="mdiContentCopy"
          v-bind="props"
        />
      </template>
      Copy Hash to Clipboard
    </v-tooltip>
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
