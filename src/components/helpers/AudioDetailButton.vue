<template>
  <v-btn
    @click="$emit('click')"
    large
    fab
    dark
    color="black"
    :loading="$props.loading"
    style="
      opacity: 0.5;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <v-icon
      size="42"
      color="white"
    >
      <slot />
    </v-icon>
  </v-btn>
</template>

<script>

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
