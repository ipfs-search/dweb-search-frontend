<template>
  <ListBase>
    <template v-slot:type>
      Video ({{ results.results.total }})
    </template>

    <v-col
      v-for="hit in limit ? results.results.hits.slice(0, limit) : results.results.hits"
      :key="hit.hash"
      cols="12"
      xl="8"
      offset-xl="2"
      class="my-2 mb-4"
    >
      <v-card
        @click="goToDetailPage()"
      >
        <v-row>
          <v-col
            cols="12"
            sm="4"
            md="3"
            lg="2"
            class="mb-sm-n2 mb-n10 mt-n2"
          >
            <Thumbnail :hit="hit" />
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
import Thumbnail from '@/components/thumbnails/VideoThumbnail.vue';
import durationToColor from '@/filters/durationToColor';
import ListBase from './ListBase.vue';

export default {
  components: {
    ListBase,
    Thumbnail,
  },
  props: {
    results: {
      type: Object,
      required: true,
    },
    limit: {
      type: Number,
      required: false,
      default: null,
    },
  },
  filters: {
    durationToColor,
  },
  methods: {
    goToDetailPage() {
      this.$router.push({ path: '/search/detail' });
    },
  },
};
</script>
