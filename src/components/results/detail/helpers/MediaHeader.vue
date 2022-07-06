<!--
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@visualspace.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->

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
            class="ml-1"
            v-if="$props.file.size"
            :file="$props.file"
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
          style="word-break: break-word"
          v-html="$props.file.title"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import mime from 'mime';
import DownloadButton from '@/components/helpers/DownloadButton';
import DetailMixin from '@/components/results/detail/mixins/DetailMixin';
import CopyHashButton from '@/components/helpers/CopyHashButton';

export default {
  mixins: [
    DetailMixin,
  ],
  components: { DownloadButton, CopyHashButton },
  methods: {
    showFileType(mimeType) {
      return mime.getExtension(mimeType);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~video.js/dist/video-js.css';
</style>
