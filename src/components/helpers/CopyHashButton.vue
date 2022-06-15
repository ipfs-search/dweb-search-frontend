<template>
  <v-btn
    icon
    variant="contained-flat"
    class="text-grey"
    size="x-small"
    @click.stop="copyHash"
  >
    <v-icon>mdi-content-copy</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    hash: {
      type: String,
      required: true,
    },
  },
  methods: {
    copyHash() {
      navigator.clipboard.writeText(this.hash);
    },
  },
};
</script>
