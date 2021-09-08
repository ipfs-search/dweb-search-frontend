<template>
  <v-card
    @click="goToDetailPage()"
  >
    <v-img
      :src="thumbURL(item.hash, 187, 187, 'audio')"
      @error="thumbError()"
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
        v-html="item.title"
      />
      <!-- This is way to much information lets show this in detailed view -->
      <!-- <v-card-text
        class="white--text text-caption text-truncate"
        v-html="item.description"
      /> -->
    </v-img>

    <v-card-text class="text-caption text-truncate">
      <div
        class="my-n2 d-block-inline text-truncate"
      >
        <span
          :class="`${$options.filters.durationToColor(item['last-seen'])}`"
        >
          &#9679;
        </span>
        <span v-if="item['last-seen']">
          Last seen <timeago :datetime="item['last-seen']" />
        </span>
        <br>
        <span v-if="item.size">Size {{ item.size | prettyBytes }}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import ListItemMixin from '@/mixins/ListItemMixin';

export default {
  mixins: [ListItemMixin],
};
</script>
