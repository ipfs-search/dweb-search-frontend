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
      v-else-if="!srcUrl"
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
      :type="file.mimetype"
    />
  </div>
</template>

<script>

import mime from 'mime';
import GoldenRetriever from '@/helpers/GoldenRetriever';
// import { getFileExtension } from '@/helpers/fileHelper';
import getResourceURL from '@/helpers/resourceURL';

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
    file: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    srcUrl() {
      // console.log(this.$props.file.mimetype, mime.getExtension(this.$props.file.mimetype));
      switch (mime.getExtension(this.$props.file.mimetype)) {
        case 'epub':
          return `https://readium.web.app/?epub=${getResourceURL(this.file.hash)}`;
        // case 'rtf': // rtf does not work for some reason
        case 'docx':
        case 'xlsx':
        case 'odf':
        case 'odt':
          // return `https://docs.google.com/gview?embedded=true&url=${
          return `https://view.officeapps.live.com/op/embed.aspx?src=${
            getResourceURL(this.file.hash)}`;
        default:
          return this.$data.srcUrlFromBlob;
      }
    },
  },
  watch: {
    active(active) {
      if (active) {
        this.error = undefined;
        this.fetch();
      } else if (this.retriever && this.$data.progress < 100) {
        this.$data.srcUrlFromBlob = '';
        this.retriever.cancel()
          .then(() => {
            this.$data.progress = 0;
            this.retriever.off();
            delete this.retriever;
            this.$data.progress = 0;
          });
      }
    },
  },
  methods: {
    fetch() {
      if (this.$data.srcUrlFromBlob) {
        return Promise.resolve(this.$data.srcUrlFromBlob);
      }
      if (!this.file.mimetype === 'application/pdf') return Promise.resolve();
      this.retriever = new GoldenRetriever();

      this.retriever.onProgress(({
        loaded,
        total,
      }) => {
        this.$data.progress = (loaded / total) * 100;
      });

      return this.retriever.fetch(getResourceURL(this.$props.file.hash))
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
    },
  },
};

</script>
