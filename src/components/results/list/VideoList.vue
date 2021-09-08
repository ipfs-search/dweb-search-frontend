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
      <ListItem :item="hit" />
    </v-col>
  </ListBase>
</template>

<script>
import ListBase from './ListBase.vue';
import ListItem from '../list-item/VideoListItem.vue';

export default {
  components: {
    ListBase,
    ListItem,
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
};
</script>
