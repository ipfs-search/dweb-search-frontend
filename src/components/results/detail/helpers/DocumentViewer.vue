<template>
  <div>
    <v-alert
      v-if="error"
      border="left"
      color="red lighten-2"
    >
      <i>Error loading preview</i>
    </v-alert>
    <v-alert
      v-else-if="extension === 'pdf' && !srcURL"
      border="left"
      color="blue lighten-4"
    >
      <i>Loading preview</i>
      <v-progress-linear
        :indeterminate="!progress"
        :value="progress"
      />
    </v-alert>
    <iframe
      v-else-if="srcURL"
      :src="srcURL"
      width="100%"
      style="
        width: 100%;
        height: calc(100vh - 300px);
        border: 1px solid #BDBDBD;
      "
    />
  </div>
</template>

<script>

import mime from 'mime';
import getResourceURL from '@/helpers/resourceURL';
import Retriever from '@/helpers/FetchDoggy';

export default {
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
  data() {
    return {
      error: false,
      retriever: new Retriever(),
    };
  },
  computed: {
    extension() {
      return mime.getExtension(this.$props.file.mimetype);
    },
    srcURL() {
      switch (this.extension) {
        case 'epub':
          return `https://readium.web.app/?epub=${getResourceURL(this.file.hash)}`;
        case 'rtf': // rtf does not work for some reason
          return '';
        case 'doc':
        case 'xls':
        case 'ppt':
        case 'docx':
        case 'xlsx':
        case 'pptx':
        case 'odf':
        case 'odt':
        case 'ods':
        case 'odp':
          return `https://view.officeapps.live.com/op/embed.aspx?src=${
            getResourceURL(this.file.hash)}`;
        case 'html':
        case 'txt':
        case 'json':
          return getResourceURL(this.file.hash);
        case 'pdf':
          return this.retriever.objectURL;
        default:
          return undefined;
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
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      if (this.srcURL) return Promise.resolve();
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
