<template>
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
        <v-img
          :alt="item.title"
          :src="thumbURL(item.hash, 161, 90,'video')"
          @error="thumbError()"
          class="ma-3 mr-sm-0"
          cover
          aspect-ratio="1.778"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-icon
            size="64"
            color="white"
            style="opacity: 0.9;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);"
          >
            mdi-play
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
            :class="`${$options.filters.durationToColor(item['last-seen'])}`"
          >
            &#9679;
          </span>
          <span v-if="item['last-seen']">
            Last seen <timeago :datetime="item['last-seen']" />
          </span><br>
          <span v-if="item.size">Size {{ item.size | prettyBytes }}</span>
        </v-card-subtitle>
        <v-card-title
          class="text-subtitle-1"
          v-html="item.title"
        />
        <v-card-subtitle
          class="text-body-2"
          v-html="item.description"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ListItemMixin from '@/mixins/ListItemMixin';

export default {
  mixins: [ListItemMixin],
};
</script>
