<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
import { fileListComposable, fileListProps } from '@/composables/fileListComposable';

const props = defineProps({
  fileType: fileListProps.fileType,
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
  shownHits,
} = fileListComposable(props)

</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      v-if="hit"
      width="100%"
      v-bind="props"
      :elevation="isHovering ? 12 : 2"
    >
      <router-link
        :to="{
          name: 'Detail',
          params: {
            fileType,
            fileHash: shownHits[index].hash,
            selectedIndex: Number(index),
          },
          query: route.query
        }"
      >
        <slot />
      </router-link>
    </v-card>
  </v-hover>
</template>
