<!-- This class exists to remove hyperlink styling to router-links -->
<script setup>
defineProps({
  to: {
    type: [Object, String],
    required: true,
  },
  replace: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div v-if="disabled">
    <slot />
  </div>
  <router-link v-else :to="to" :replace="replace" style="text-decoration: none; color: inherit">
    <slot />
  </router-link>
</template>
