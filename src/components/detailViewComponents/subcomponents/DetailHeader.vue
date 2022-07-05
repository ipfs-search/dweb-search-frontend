<script setup>
import DownloadButton from '@/components/detailViewComponents/subcomponents/DownloadButton.vue';
import CopyHashButton from '@/components/detailViewComponents/subcomponents/CopyHashButton.vue';
import prettyBytes from 'pretty-bytes';
import mime from 'mime';
import { detailProps } from '@/composables/useDetail';

const props = defineProps(detailProps)
</script>

<template>
  <!-- Subheader -->
  <v-row test-class="subheader">
    <v-col>
      <div class="text-caption text-truncate d-flex flex-row align-center">
        <span v-if="file['last-seen']">
          Last seen <timeago :datetime="file['last-seen']" />
        </span>
        <span v-if="file.size">&nbsp;| Size {{ prettyBytes(file.size) }}</span>
        <span v-if="file['mimetype']">&nbsp;| {{ mime.getExtension(file['mimetype']) }}</span>
        <DownloadButton
          v-if="file.size"
          :file="file"
        />
        <CopyHashButton
          v-if="file.size"
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
