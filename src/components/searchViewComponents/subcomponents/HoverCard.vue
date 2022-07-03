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
      style="text-decoration: none; color: inherit;"
    >
      <v-card
        v-if="hit"
        width="100%"
        v-bind="props"
        :elevation="isHovering ? 12 : 2"
      >
        <slot />
      </v-card>
    </router-link>
  </v-hover>
</template>
