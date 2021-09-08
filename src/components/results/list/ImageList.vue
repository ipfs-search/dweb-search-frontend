<template>
  <ListBase>
    <template v-slot:type>
      Images ({{ results.results.total }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-row dense>
        <v-col
          v-for="hit in limit ? results.results.hits.slice(0, limit) : results.results.hits"
          :key="hit.hash"
          class="d-flex child-flex"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <ListItem :item="hit" />
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script>
import ListItem from '../list-item/ImageListItem.vue';
import ListBase from './ListBase.vue';

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
  methods: {
  },
};
</script>
