<script setup>
import DownloadButton from '@/components/results/detail/helpers/DownloadButton.vue';
import CopyHashButton from '@/components/results/detail/helpers/CopyHashButton.vue';
import prettyBytes from 'pretty-bytes';

</script>

<template>
  <!-- Subheader -->
  <v-row test-class="subheader">
    <v-col>
      <div class="text-caption mb-n4 text-truncate">
          <span v-if="$props.file['last-seen']">
            Last seen <timeago :datetime="$props.file['last-seen']" />
          </span>
        <span v-if="$props.file.size"> | Size {{ prettyBytes($props.file.size) }}</span>
        <span v-if="$props.file['mimetype']"> | {{ showFileType($props.file['mimetype']) }}</span>
        <DownloadButton
          v-if="$props.file.size"
          class="ml-1"
          :file="$props.file"
        />
        <CopyHashButton
          v-if="$props.file.size"
          class="ml-1"
          :hash="$props.file.hash"
        />
      </div>
    </v-col>
  </v-row>

  <!-- Title -->
  <v-row>
    <v-col>
      <div
        v-if="$props.file.title"
        class="text-h6 font-weight-regular"
        style="word-break: break-word"
        v-html="$props.file.title"
      />
    </v-col>
  </v-row>
</template>

<script>
import mime from 'mime';
import DetailMixin from '@/components/results/detail/mixins/DetailMixin';

export default {
  mixins: [
    DetailMixin,
  ],
  methods: {
    showFileType(mimeType) {
      return mime.getExtension(mimeType);
    },
  },
};
</script>
