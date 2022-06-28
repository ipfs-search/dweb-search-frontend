<script setup>
import DocumentViewer from '@/components/detailViewComponents/SubComponents/DocumentViewer.vue';
import { detailProps } from '@/composables/useDetail';
import GenericDetail from '@/components/detailViewComponents/GenericDetail.vue';
const props = defineProps(detailProps)
</script>

<template>
  <generic-detail :file="file">
    <!-- Text -->
    <DocumentViewer
      :file="file"
      :active="active"
    />
  </generic-detail>
</template>
