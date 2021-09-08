<template>
  <ListBase>
    <template v-slot:type>
      Directories ({{ results.results.total }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
      v-for="hit in limit ? results.results.hits.slice(0, limit) : results.results.hits"
      :key="hit.hash"
    >
      <ListItem :item="hit" />
    </v-col>
  </ListBase>
</template>

<script>
import ListBase from './ListBase.vue';
import ListItem from '../list-item/DirectoryListItem.vue';

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
