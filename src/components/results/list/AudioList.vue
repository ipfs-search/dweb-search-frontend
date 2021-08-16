<template>
  <ListBase>
    <template v-slot:type>
      Audio ({{ results.results.total }})
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
          v-for="hit in limit ? results.results.hits.slice(0, limit) : results.results.hits"
          :key="hit.hash"
          cols="6"
          xs="4"
          sm="4"
          md="3"
          lg="2"
        >
          <v-card
            @click="goToDetailPage()"
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
              <!-- This is way to much information lets show this in detailed view -->
              <!-- <v-card-text
                class="white--text text-caption text-truncate"
                v-html="hit.description"
              /> -->
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
                <span v-if="hit.size">Size {{ hit.size | prettyBytes }}</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
