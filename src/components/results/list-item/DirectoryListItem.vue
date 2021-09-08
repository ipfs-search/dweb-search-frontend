<template>
  <v-card
    @click="goToDetailPage()"
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
  </v-card>
</template>

<script>
import ListItemMixin from '@/mixins/ListItemMixin';

export default {
  mixins: [ListItemMixin],
};
</script>
