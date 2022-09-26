<script setup>
import VIframe from "@/components/shared/VIframe.vue";
import getResourceURL from "@/helpers/resourceURL";
import Retriever from "@/helpers/FetchDoggy";
import { reactive, ref, computed } from "vue";
import { getFileExtension } from "@/helpers/fileHelper";

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

const error = ref(undefined);
const retriever = reactive(new Retriever());
const extension = getFileExtension(props.file);

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
      if (props.file.references?.length)
        return `${getResourceURL(props.file.references[0].parent_hash)}/${
          props.file.references[0].name
        }`;
      return getResourceURL(props.file.hash);
    case "txt":
    case "json":
      return getResourceURL(props.file.hash);
    case "pdf":
      return retriever.objectURL;
    default:
      return undefined;
  }
});

if (!(srcURL.value || retriever.objectURL)) {
  retriever.fetch(getResourceURL(props.file.hash)).catch((fetchError) => {
    console.error(fetchError);
    error.value = fetchError;
  });
}
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
