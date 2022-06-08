<template>
  <ListBase>
    <template #type>
      Audio ({{ resultsTotal }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-row
        dense
      >
        <v-col
          v-for="(hit, index) in shownHits"
          :key="index"
          cols="6"
          xs="4"
          sm="4"
          md="3"
          lg="2"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              @click="goToDetailPage(index)"
            >
              <v-img
                :src="hit.src"
                class="white--text align-end"
                :aspect-ratio="1"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-icon
                  size="64"
                  color="white"
                  style="opacity: 0.3;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);"
                >
                  mdi-music
                </v-icon>

                <v-card-text
                  class="text-subtitle-2"
                  v-html="hit.title"
                />
              </v-img>

              <v-card-text class="text-caption text-truncate">
                <div
                  class="my-n2 d-block-inline text-truncate"
                >
                  <span
                    :class="`${$options.filters.durationToColor(hit['last-seen'])}`"
                  >
                    &#9679;
                  </span>
                  <span v-if="hit['last-seen']">
                    Last seen <timeago :datetime="hit['last-seen']" />
                  </span>
                  <br>
                  <span v-if="hit.size">Size {{ prettyBytes(hit.size) }}</span>
                  <span v-if="hit.mimetype"> | {{ showFileType(hit.mimetype) }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script setup>
import mime from 'mime';
import durationToColor from '@/filters/durationToColor';
import { Types } from '@/helpers/typeHelper';
import FileListMixin from './mixins/FileListMixin';
import prettyBytes from 'pretty-bytes';

export default {
  filters: {
    durationToColor,
  },
  mixins: [FileListMixin],
  data() {
    return {
      fileType: Types.audio,
      shortList: 6,
    };
  },
  methods: {
    showFileType(mimeType) {
      return mime.getExtension(mimeType);
    },
  },
};
</script>
