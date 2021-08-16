<template>
  <ListBase>
    <template v-slot:type>
      Documents ({{ results.results.total }})
    </template>

    <v-col
      v-for="hit in limit ? results.results.hits.slice(0, limit) : results.results.hits"
      :key="hit.hash"
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-card
        @click="goToDetailPage()"
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
import ListBase from './ListBase.vue';

export default {
  components: {
    ListBase,
  },
  filters: {
    durationToColor,
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
  methods: {
    goToDetailPage() {
      this.$router.push({ path: '/search/detail' });
    },
  },
};
</script>
