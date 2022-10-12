<script setup>
import { detailProps } from "@/composables/useDetail";
import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import VIframe from "@/components/shared/VIframe.vue";
import getResourceURL from "@/helpers/resourceURL";
defineProps(detailProps);
</script>

<template>
  <generic-detail :file="file">
    <v-iframe :src="getResourceURL(file.hash)" />
  </generic-detail>
</template>
