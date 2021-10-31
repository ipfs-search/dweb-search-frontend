<template>
  <v-btn
    large
    fab
    color="black"
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
