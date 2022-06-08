<template>
  <div>
    <!-- Subheader -->
    <v-row test-class="subheader">
      <v-col>
        <div class="text-caption mb-n8 text-truncate">
          <span v-if="$props.file['last-seen']">
            Last seen <timeago :datetime="$props.file['last-seen']" />
          </span>
          <span v-if="$props.file.size"> | Size {{ $props.file.size | prettyBytes }}</span>
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
  </div>
</template>

<script>
import mime from 'mime';
import DetailMixin from '@/components/results/detail/mixins/DetailMixin';
import DownloadButton from '@/components/helpers/DownloadButton.vue';
import CopyHashButton from '@/components/helpers/CopyHashButton.vue';

export default {
  components: { DownloadButton, CopyHashButton },
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
