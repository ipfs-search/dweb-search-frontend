<script setup>
import { useDetail, detailProps } from "@/composables/useDetail";
import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import VIframe from "@/components/shared/VIframe.vue";
const props = defineProps(detailProps);
const { resourceURL } = useDetail(props);
</script>

<template>
  <generic-detail :file="file">
    <v-iframe :src="resourceURL" />
  </generic-detail>
</template>
