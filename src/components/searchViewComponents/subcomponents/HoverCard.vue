<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
import Hyperlink from '@/components/shared/Hyperlink.vue';

const componentProps = defineProps({
  fileType: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  hit: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <hyperlink
      :to="{
        ...route,
        name: 'Detail',
        params: {
          fileType,
          fileHash: hit.hash,
          selectedIndex: Number(index),
        },
      }"
    >
      <v-card
        v-if="hit"
        width="100%"
        v-bind="props"
        :elevation="isHovering ? 12 : 2"
      >
        <slot />
      </v-card>
    </hyperlink>
  </v-hover>
</template>
