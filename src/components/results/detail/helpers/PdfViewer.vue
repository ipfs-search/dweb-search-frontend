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
      v-else-if="loading"
    >
      <i>Loading preview</i>
      <v-progress-linear
        :indeterminate="progress===0"
        :value="$data.progress"
      />
    </v-alert>
    <iframe
      v-else
      :src="srcUrl"
      width="100%"
      height="700"
      type="application/pdf"
      @load="loading = false"
    />
  </div>
</template>

<script>

import ProgressFetcher from '@/helpers/ProgressFetcher';

export default {
  created() {
    const fetcher = new ProgressFetcher(({ loaded, total }) => {
      this.$data.progress = (loaded / total) * 100;
    });
    fetcher.fetch(this.$props.src)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => new Blob([arrayBuffer], { type: 'application/pdf' }))
      .then((blob) => window.URL.createObjectURL(blob))
      .then((url) => {
        this.$data.srcUrl = url;
        this.loading = false;
      })
      .catch(this.$data.error.set);
  },
  data() {
    return {
      loading: true,
      error: false,
      progress: 0,
      srcUrl: '',
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};

</script>
