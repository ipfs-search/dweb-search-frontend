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
        :indeterminate="!progress"
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
        case 'rtf': // rtf does not work for some reason
          return '';
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
          return this.retriever.objectURL;
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
        // if you slide the document out of view, cancel unfinished download.
        this.retriever.cancel();
      }
    },
  },
  methods: {
    fetch() {
      if (this.srcUrl) return Promise.resolve();
      if (this.retriever.objectURL) {
        return Promise.resolve(this.retriever.objectURL);
      }

      return this.retriever.fetch(getResourceURL(this.$props.file.hash))
        .catch((error) => {
          console.error(error);
          this.$data.error = error;
        });
    },
  },
};

</script>
