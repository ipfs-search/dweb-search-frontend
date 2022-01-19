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
        :value="progress"
      />
    </v-alert>
    <iframe
      v-else
      :src="srcUrl"
      width="100%"
      height="700"
    />
  </div>
</template>

<script>

import mime from 'mime';
import getResourceURL from '@/helpers/resourceURL';
import Retriever from '@/helpers/Doggy';

export default {
  created() {
    this.fetch();
  },
  data() {
    return {
      error: false,
      // progress: 0,
      srcUrlFromBlob: '',
      retriever: new Retriever(),
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
      switch (mime.getExtension(this.$props.file.mimetype)) {
        case 'epub':
          return `https://readium.web.app/?epub=${getResourceURL(this.file.hash)}`;
        // case 'rtf': // rtf does not work for some reason
        case 'docx':
        case 'xlsx':
        case 'pptx':
        case 'odf':
        case 'odt':
        case 'ods':
        case 'odp':
          return `https://view.officeapps.live.com/op/embed.aspx?src=${
            getResourceURL(this.file.hash)}`;
        default:
          return this.$data.srcUrlFromBlob;
      }
    },
    progress() {
      return (this.$data.retriever.progress / this.$data.retriever.total) * 100;
    },
  },
  watch: {
    active(active) {
      if (active) {
        this.error = undefined;
        this.fetch();
      } else if (this.retriever && this.progress < 100) {
        this.$data.srcUrlFromBlob = '';
        this.retriever.cancel()
          .then(() => {
            this.retriever.off();
            delete this.retriever;
          });
      }
    },
  },
  methods: {
    fetch() {
      if (!(this.file.mimetype === 'application/pdf')) {
        return Promise.resolve();
      }
      if (this.$data.srcUrlFromBlob) {
        return Promise.resolve(this.$data.srcUrlFromBlob);
      }
      return this.retriever.fetch(getResourceURL(this.$props.file.hash))
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => new Blob([arrayBuffer], { type: 'application/pdf' }))
        .then((blob) => {
          if (this.progress === 100) {
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
