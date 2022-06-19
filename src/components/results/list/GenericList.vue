<script setup>
import { fileListComposable, fileListProps, imports } from './fileListComposable';

const props = defineProps(fileListProps)

const {
  shownHits,
  goToDetailPage
} = fileListComposable(props)
const { mime, ListBase, prettyBytes, durationToColor } = imports

</script>

<template>
  <ListBase
    :file-type="fileType"
  >
    <v-col
      v-for="(hit, index) in shownHits"
      :key="index"
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          v-if="hit"
          :elevation="isHovering ? 12 : 2"
          @click="goToDetailPage(index)"
          v-bind="props"
        >
          <v-card-header>
            <v-card-header-text>
              <v-card-subtitle class="text-caption text-truncate">
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
              <v-card-title class="text-subtitle-1">
                <span v-html="hit.title || hit.hash "/>
              </v-card-title>
              <v-card-text class="text-body-2 text-grey">
                <span v-html="hit.description"/>
                <span data-test-id="banana">
                  {{ hit.description }}
                </span>
              </v-card-text>
            </v-card-header-text>
          </v-card-header>
        </v-card>
      </v-hover>
    </v-col>
  </ListBase>
</template>

<style scoped>
.text-subtitle-1 {
  display: inline-block;
}
</style>
