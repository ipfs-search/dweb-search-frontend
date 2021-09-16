<template>
  <div>
    <!-- Subheader -->
    <v-row test-class="subheader">
      <v-col>
        <div class="text-caption mb-n8 text-truncate">
          <span v-if="file['last-seen']">
            Last seen <timeago :datetime="file['last-seen']" />
          </span>
          <span v-if="file.size"> | Size {{ file.size | prettyBytes }}</span>
          <span> | Mimetype {{ file['mimetype'] }}</span>
          <DownloadButton
            :hash="file.hash"
            :title="file.title"
          />
        </div>
      </v-col>
    </v-row>

    <!-- Title -->
    <v-row>
      <v-col>
        <div
          class="text-h6 font-weight-regular"
          v-html="`${file.title || '(no title)'}`"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DownloadButton from '@/components/helpers/DownloadButton.vue';

export default {
  components: { DownloadButton },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~video.js/dist/video-js.css';
</style>
