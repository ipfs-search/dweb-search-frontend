<script setup>
import DocumentViewer from "@/components/detailViewComponents/subcomponents/DocumentViewer.vue";
import { detailProps } from "@/composables/useDetail";
import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
defineProps(detailProps);
</script>

<template>
  <generic-detail :file="file">
    <!-- Text -->
    <DocumentViewer :file="file" :active="active" />
  </generic-detail>
</template>
