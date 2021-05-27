<template>
  <v-container>
    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
          <div><slot name="type" /></div>
          <div>
            <a class="text-subtitle-1 text-decoration-none text--secondary">
              View all
            </a>
          </div>
        </v-subheader>
      </v-col>
    </v-row>

    <v-row dense>
      <slot />
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
};
</script>
