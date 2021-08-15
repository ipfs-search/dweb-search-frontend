<template>
  <v-img
    :alt="hit.title"
    :src="thumbFail ? altThumbURL(hit.hash) : thumbURL(hit.hash)"
    @error="thumbFail = true"
    class="ma-3 mr-sm-0"
    cover
    aspect-ratio="1.778"
    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
  >
    <v-icon
      size="64"
      color="white"
      style="opacity: 0.9;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);"
    >
      mdi-play
    </v-icon>
  </v-img>
</template>

<script>
const thumbWidth = 161;
const thumbHeight = 90;

export default {
  props: ['hit'],
  data: () => ({
    thumbFail: false,
  }),
  methods: {
    thumbURL: (hash) => `http://localhost:8080/ipns/QmbpDuyXvYqsf1LCB5RraCqpZn1v1STGdX7Sf5YdxZaEc7/${hash}-${thumbWidth}-${thumbHeight}.jpg`,
    altThumbURL: (hash) => `http://localhost:9614/thumbnail/ipfs/${hash}/${thumbWidth}/${thumbHeight}/?type=video`,
  },
};
</script>
