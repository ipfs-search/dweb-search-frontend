<!-- This class exists to remove hyperlink styling to router-links -->
<script setup>
const props = defineProps({
  to: {
    type: [Object, String],
    required: true,
  },
  replace: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <router-link
    :to="to"
    :replace="replace"
    style="text-decoration: none; color: inherit;"
  >
    <slot/>
  </router-link>
</template>
