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
          <span v-if="$props.file['mimetype']"> | Mimetype {{ $props.file['mimetype'] }}</span>
          <DownloadButton
            class="ml-1"
            v-if="$props.file.size"
            :hash="$props.file.hash"
            :title="$props.file.title"
          />
          <CopyHashButton
            class="ml-1"
            v-if="$props.file.size"
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
          v-html="$props.file.title"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DownloadButton from '@/components/helpers/DownloadButton';
import CopyHashButton from '@/components/helpers/CopyHashButton';
import DetailMixin from '@/mixins/DetailMixin';

export default {
  mixins: [
    DetailMixin,
  ],
  components: { DownloadButton, CopyHashButton },
};
</script>

<style lang="scss" scoped>
@import '~video.js/dist/video-js.css';
</style>
