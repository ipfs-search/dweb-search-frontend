<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <v-icon
    size="64"
    color="white"
    style="opacity: 0.3;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);"
    :icon="icon"
  />
</template>
