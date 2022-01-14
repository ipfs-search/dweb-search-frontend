<template>
  <div>
    <v-alert
      border="left"
      color="red lighten-2"
      v-if="error"
    >
      <i>Error loading preview</i>
    </v-alert>
    <v-alert
      border="left"
      color="blue lighten-4"
      v-else-if="progress < 100"
    >
      <i>Loading preview</i>
      <v-progress-linear
        :indeterminate="progress===0"
        :value="$data.progress"
      />
    </v-alert>
    <iframe
      v-else
      :src="srcUrlFromBlob"
      width="100%"
      height="700"
      type="application/pdf"
    />
  </div>
</template>

<script>

import ProgressFetcher from '@/helpers/ProgressFetcher';

export default {
  created() {
    this.fetch();
  },
  data() {
    return {
      error: false,
      progress: 0,
      srcUrlFromBlob: '',
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    active(active) {
      if (active) {
        this.error = undefined;
        this.fetch();
      } else if (this.fetcher && this.$data.progress < 100) {
        this.$data.srcUrlFromBlob = '';
        this.fetcher.cancel()
          .then(() => {
            this.$data.progress = 0;
            this.fetcher.off();
            delete this.fetcher;
            this.$data.progress = 0;
          });
      }
    },
  },
  methods: {
    fetch() {
      // if it hasn't been fetched yet, go fetch!
      console.log('fetching', this.$props.src, this.$data.srcUrlFromBlob);
      if (!this.$data.srcUrlFromBlob) {
        this.fetcher = new ProgressFetcher();

        this.fetcher.onProgress(({
          loaded,
          total,
        }) => {
          this.$data.progress = (loaded / total) * 100;
        });

        this.fetcher.fetch(this.$props.src)
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => new Blob([arrayBuffer], { type: 'application/pdf' }))
          .then((blob) => {
            if (this.$data.progress === 100) {
              this.$data.srcUrlFromBlob = window.URL.createObjectURL(blob);
            }
          })
          .catch((error) => {
            console.error(error);
            this.$data.error = error;
          });
      }
    },
  },
};

</script>
