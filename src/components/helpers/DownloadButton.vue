<template>
  <v-btn
    icon
    color="white"
    @click.stop="download"
  >
    <v-icon>mdi-download-circle-outline</v-icon>
  </v-btn>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    hash: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: 'download',
    },
  },
  methods: {
    download() {
      axios({
        method: 'get',
        url: `https://gateway.ipfs.io/ipfs/${this.hash}`,
        responseType: 'arraybuffer',
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', this.title);
          document.body.appendChild(link);
          link.click();
        })
        .catch(() => console.log('error occured'));
    },
  },
};
</script>
