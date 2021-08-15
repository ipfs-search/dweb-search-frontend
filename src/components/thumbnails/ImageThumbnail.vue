<template>
  <v-img
    :alt="hit.title"
    :src="thumbFail ? altThumbURL(hit.hash) : thumbURL(hit.hash)"
    @error="thumbFail = true"
    aspect-ratio="1"
    class="grey lighten-2"
  >
    <template v-slot:placeholder>
      <v-row
        class="fill-height ma-0"
        align="center"
        justify="center"
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        />
      </v-row>
    </template>
  </v-img>
</template>

<script>
const thumbWidth = 234;
const thumbHeight = 234;

export default {
  props: ['hit'],
  data: () => ({
    thumbFail: false,
  }),
  methods: {
    thumbURL: (hash) => `http://localhost:8080/ipns/QmbpDuyXvYqsf1LCB5RraCqpZn1v1STGdX7Sf5YdxZaEc7/${hash}-${thumbWidth}-${thumbHeight}.jpg`,
    altThumbURL: (hash) => `http://localhost:9614/thumbnail/ipfs/${hash}/${thumbWidth}/${thumbHeight}/`,
  },
};
</script>
