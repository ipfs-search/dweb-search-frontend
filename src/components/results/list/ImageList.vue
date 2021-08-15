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
          v-for="hit in results.results.hits.slice(0, 6)"
          :key="hit.hash"
          class="d-flex child-flex"
          cols="6"
          sm="4"
          md="3"
          lg="2"
        >
          <v-card @click="goToDetailPage()">
            <Thumbnail :hit="hit" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script>
import Thumbnail from '@/components/thumbnails/ImageThumbnail.vue';
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
  },
  methods: {
    goToDetailPage() {
      this.$router.push({ path: '/search/detail' });
    },
  },
};
</script>
