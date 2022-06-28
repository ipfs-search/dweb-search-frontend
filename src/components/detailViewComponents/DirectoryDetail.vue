<script setup>
import { useDetail, detailProps } from '@/composables/useDetail';
import GenericDetail from '@/components/detailViewComponents/GenericDetail.vue';
const props = defineProps(detailProps)
</script>

<template>
  <generic-detail :file="file">
    <!-- Content -->
    <v-row>
      <v-col>
        <iframe
          style="
                        width: 100%;
                        height: calc(100vh - 200px);
                        border: 1px solid #BDBDBD;
                      "
          :src="resourceURL"
        />
      </v-col>
    </v-row>
  </generic-detail>
</template>
