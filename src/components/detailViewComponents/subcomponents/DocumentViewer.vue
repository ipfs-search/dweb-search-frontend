<script setup>
import VIframe from "@/components/shared/VIframe.vue";
import mime from "mime";
import getResourceURL from "@/helpers/resourceURL";
import Retriever from "@/helpers/FetchDoggy";
import { reactive, ref, computed } from "vue";

const props = defineProps({
  file: {
    type: Object,
    required: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
});

let error = ref(undefined);
const retriever = reactive(new Retriever());
const extension = mime.getExtension(props.file.mimetype);

const progress = computed(() => (retriever.progress / retriever.total) * 100);

const srcURL = computed(() => {
  switch (extension) {
    case "epub":
      return `https://readium.web.app/?epub=${getResourceURL(props.file.hash)}`;
    case "rtf": // rtf does not work for some reason
      return "";
    case "doc":
    case "xls":
    case "ppt":
    case "docx":
    case "xlsx":
    case "pptx":
    case "odf":
    case "odt":
    case "ods":
    case "odp":
      return `https://view.officeapps.live.com/op/embed.aspx?src=${getResourceURL(
        props.file.hash
      )}`;
    case "html":
    case "txt":
    case "json":
      return getResourceURL(props.file.hash);
    case "pdf":
      return retriever.objectURL;
    default:
      return undefined;
  }
});

const fetch = function fetch() {
  if (srcURL.value) return Promise.resolve();
  if (retriever.objectURL) {
    return Promise.resolve(retriever.objectURL);
  }
  return retriever.fetch(getResourceURL(props.file.hash)).catch((fetchError) => {
    console.error(fetchError);
    error.value = fetchError;
  });
};
fetch();

// This watch intends to cancel the download of files you cycle out of view.
// It sort of works, but has a lot of side-effects which are hard to test and to fix.
// Side effects may even be serverside at the ipfs-gateway, it seems that an aborted call can
// not even always be restarted, but in stead throws a 504 gateway-timeout.
// Leaving it in for now, to show that it has been tried/what has been tried.
//
// Can be fixed another time, or simply removed.
/*
watch(() => props.active, (active) => {
  if (active) {
    console.log('resetting', props.file.hash)
    // when you cycle forward and backward, reset any errors.
    error.value = undefined;
    if (progress.value !== 100) fetch();
  } else if (progress.value !== 100) {
    console.log('aborting', props.file.hash)
    // if you slide the document out of view, cancel unfinished download.
    retriever.cancel();
  }
})
*/
</script>

<template>
  <div>
    <v-alert v-if="error" border color="red-lighten-2">
      <i>Error loading preview: {{ error }}</i>
    </v-alert>
    <v-alert v-else-if="extension === 'pdf' && !srcURL" border color="blue-lighten-4">
      <i>Loading preview</i>
      <v-progress-linear :indeterminate="!progress" :model-value="progress" />
    </v-alert>
    <v-iframe v-else-if="srcURL" :src="srcURL" />
  </div>
</template>
