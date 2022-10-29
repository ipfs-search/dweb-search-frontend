<template>
  <v-row class="fill-height ma-0" align="center" justify="center">
    <v-img class="spinner" src="/assets/logo-hexagon-black.png" />
  </v-row>
</template>

<style scoped>
.spinner {
  width: 50%;
  height: 50%;
  max-width: 120px;
  animation: spin 4s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
