<template>
  <v-btn
    size="x-large"
    icon
    dark
    color="black"
    :loading="true"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
    @click="$emit('click')"
  >
    <v-progress-circular
      style="transform: translate(-1px, 0)"
      indeterminate
      v-if="loading"
    />
    <v-icon
      style="transform: translate(-1px, -1px)"
      v-else
      size="45"
      color="white"
      :icon="icon"
    />
  </v-btn>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      required: false,
    }
  },
};
</script>
