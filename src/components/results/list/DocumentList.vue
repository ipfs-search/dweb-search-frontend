<template>
  <ListBase>
    <template v-slot:type>
      Documents ({{ resultsTotal }})
    </template>

    <v-col
      v-for="(hit, index) in shownHits"
      :key="index"
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-card
        @click="goToDetailPage(index)"
      >
        <v-card-subtitle class="text-caption mb-n7 text-truncate">
          <span
            :class="`${$options.filters.durationToColor(hit['last-seen'])}`"
          >
            &#9679;
          </span>
          <span v-if="hit['last-seen']">
            Last seen <timeago :datetime="hit['last-seen']" />
          </span><br>
          <span v-if="hit.size">Size {{ hit.size | prettyBytes }}</span>
        </v-card-subtitle>
        <v-card-title
          class="text-subtitle-1"
          v-html="hit.title"
        />
        <v-card-subtitle
          class="text-body-2"
          v-html="hit.description"
        />
      </v-card>
    </v-col>
  </ListBase>
</template>

<script>
import durationToColor from '@/filters/durationToColor';
import FileListMixin from './mixins/FileListMixin';

export default {
  mixins: [
    FileListMixin,
  ],
  filters: {
    durationToColor,
  },
  data() {
    return {
      fileType: 'text',
      shortList: 3,
    };
  },
};
</script>
