<template>
  <ListBase>
    <template v-slot:type>
      Video ({{ results.total }})
    </template>

    <v-col
      v-for="(hit, index) in shownHits"
      :key="index"
      cols="12"
      xl="8"
      offset-xl="2"
      class="my-2 mb-4"
    >
      <v-card
        @click="goToDetailPage(hit.hash)"
      >
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="3"
            lg="2"
            class="mb-sm-n2 mb-n10 mt-n2"
          >
            <v-img
              class="ma-3 mr-sm-0"
              cover
              aspect-ratio="1.778"
              :src="hit.src"
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
                mdi-video
              </v-icon>
            </v-img>
          </v-col>
          <v-col
            cols="12"
            sm="8"
            md="9"
            lg="10"
            class="py-sm-0 ml-sm-n6"
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
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </ListBase>
</template>

<script>
import durationToColor from '@/filters/durationToColor';
import FileListMixin from '@/mixins/FileListMixin';

export default {
  mixins: [
    FileListMixin,
  ],
  data() {
    return {
      fileType: 'video',
      shortList: 3,
    };
  },
  filters: {
    durationToColor,
  },
};
</script>
