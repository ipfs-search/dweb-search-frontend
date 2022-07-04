<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
import { fileListComposable } from '@/composables/fileListComposable';
import Hyperlink from '@/components/shared/Hyperlink.vue';

const props = defineProps({
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

const {
  pageHits,
} = fileListComposable(props)

</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <hyperlink
      :to="{
        ...route,
        name: 'Detail',
        params: {
          fileType,
          fileHash: pageHits[index].hash,
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
