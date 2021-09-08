export default {
  data: () => ({
    thumbNotFound: false,
  }),
  methods: {
    thumbError() {
      this.thumbNotFound = true;
    },
    thumbURL(hash, width, height, type) {
      if (this.thumbNotFound) {
        return `http://localhost:9614/thumbnail/ipfs/${hash}/${width}/${height}/?type=${type}`;
      }

      return `http://localhost:8080/ipns/QmbpDuyXvYqsf1LCB5RraCqpZn1v1STGdX7Sf5YdxZaEc7/${hash}-${width}-${height}.jpg`;
    },
  },
};
