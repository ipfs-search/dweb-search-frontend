<script setup>
import prettyBytes from 'pretty-bytes';
import durationToColor from '@/filters/durationToColor';

</script>

<template>
  <ListBase>
    <template #type>
      Documents ({{ resultsTotal }})
    </template>

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
                <span v-if="hit.mimetype"> | {{ showFileType(hit.mimetype) }}</span>
              </v-card-subtitle>
              <v-card-title class="text-subtitle-1">
                <span v-html="hit.title"/>
              </v-card-title>
              <v-card-text class="text-body-2 text-grey">
                <span v-html="hit.description"/>
              </v-card-text>
            </v-card-header-text>
          </v-card-header>
        </v-card>
      </v-hover>
    </v-col>
  </ListBase>
</template>

<script>
import mime from 'mime';
import { Types } from '@/helpers/typeHelper';
import FileListMixin from './mixins/FileListMixin';

export default {
  mixins: [FileListMixin],
  data() {
    return {
      fileType: Types.text,
      shortList: 3,
    };
  },
  methods: {
    showFileType(mimeType) {
      return mime.getExtension(mimeType);
    },
  },
};
</script>
<style scoped>
.text-subtitle-1 {
  display: inline-block;
}
</style>
