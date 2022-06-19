<script setup>
import DownloadButton from '@/components/results/detail/SubComponents/DownloadButton.vue';
import CopyHashButton from '@/components/results/detail/SubComponents/CopyHashButton.vue';
import prettyBytes from 'pretty-bytes';
import { detailProps, useDetail } from '@/components/results/detail/useDetail';

const props = defineProps(detailProps)
const { resourceUrl, file, active } = useDetail(props)
</script>

<template>
  <!-- Subheader -->
  <v-row test-class="subheader">
    <v-col>
      <div class="text-caption mb-n4 text-truncate">
          <span v-if="file['last-seen']">
            Last seen <timeago :datetime="file['last-seen']" />
          </span>
        <span v-if="file.size"> | Size {{ prettyBytes(file.size) }}</span>
        <span v-if="file['mimetype']"> | {{ showFileType(file['mimetype']) }}</span>
        <DownloadButton
          v-if="file.size"
          class="ml-1"
          :file="file"
        />
        <CopyHashButton
          v-if="file.size"
          class="ml-1"
          :hash="file.hash"
        />
      </div>
    </v-col>
  </v-row>

  <!-- Title -->
  <v-row>
    <v-col>
      <div
        v-if="file.title"
        class="text-h6 font-weight-regular"
        style="word-break: break-word"
        v-html="file.title"
      />
    </v-col>
  </v-row>
</template>

<script>
import mime from 'mime';

export default {
  methods: {
    showFileType(mimeType) {
      return mime.getExtension(mimeType);
    },
  },
};
</script>
