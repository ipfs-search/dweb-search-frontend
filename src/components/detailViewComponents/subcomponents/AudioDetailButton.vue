<template props>
  <v-btn
    size="x-large"
    icon
    dark
    color="black"
    :loading="loading"
    style="opacity: 0.5; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
    @click="$emit('click')"
  >
    <v-icon v-if="icon" size="45" color="white" :icon="icon" />
  </v-btn>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    required: false,
    default: undefined,
  },
});

defineEmits(["click"]);
</script>
