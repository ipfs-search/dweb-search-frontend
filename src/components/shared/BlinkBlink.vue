<script setup lang="ts">
import { ref } from "vue";
const display = ref<boolean>(true);
const props = defineProps({
  speed: {
    type: Number,
    default: 500,
  },
  blink: {
    type: Boolean,
    default: true,
  },
  off: {
    type: Boolean,
    default: true,
  },
});
setInterval(() => (display.value = !display.value), props.speed);
</script>
<template>
  <div :class="{ hidden: (blink && display) || off }">
    <slot />
  </div>
</template>
<style scoped>
.hidden {
  visibility: hidden;
}
</style>
