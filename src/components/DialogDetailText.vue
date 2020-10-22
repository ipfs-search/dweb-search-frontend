<template>
  <dialog-detail-base-layout>

    <template v-slot:dialog-detail-title>
      Demo title
    </template>

    <template v-slot:dialog-detail-content>
      Demo content
    </template>

  </dialog-detail-base-layout>
</template>

<script>
import DialogDetailBaseLayout from '@/components/DialogDetailBaseLayout.vue';

export default {

  components: {
    DialogDetailBaseLayout,
  },
}
</script>

<style lang="">

</style>