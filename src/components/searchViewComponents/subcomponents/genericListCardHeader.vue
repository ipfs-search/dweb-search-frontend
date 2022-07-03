<script setup>
import { imports } from '@/composables/fileListComposable';
const { durationToColor, mime, prettyBytes } = imports;
const props= defineProps({
  hit: {
    type: Object,
    required: true,
  }
})
</script>
<template>
  <v-card-header>
    <v-card-header-text>
      <v-card-subtitle class="text-caption text-truncate pt-4">
        <span :class="`${durationToColor(hit['last-seen'])}`">
          &#9679;&nbsp;
        </span>
        <span v-if="hit['last-seen']">
          Last seen <timeago :datetime="hit['last-seen']" />
        </span>
      </v-card-subtitle>
      <v-card-subtitle class="text-caption text-truncate">
        <span v-if="hit.size">Size {{ prettyBytes(hit.size) }}</span>
        <span v-if="hit.mimetype">&nbsp;| {{ mime.getExtension(hit.mimetype) }}</span>
      </v-card-subtitle>
      <v-card-title class="text-subtitle-1 py-0" width="100%">
        <span v-html="hit.title || hit.hash "/>
      </v-card-title>
      <v-card-text
        v-if="hit.description"
        class="text-body-2 text-grey"
      >
        <span v-html="hit.description"/>
      </v-card-text>
    </v-card-header-text>
  </v-card-header>
</template>

<style lang="scss" scoped>
.text-subtitle-1 {
  display: inline-block;
  word-break: break-all;
}
</style>
