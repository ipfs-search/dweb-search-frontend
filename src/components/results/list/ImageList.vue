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
          <v-card
            @click.prevent="showDetail(hit.hash)"
            :id="hit.hash"
          >
            <v-img
              :src="`https://gateway.ipfs.io/ipfs/${hit.hash}`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  />
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </ListBase>
</template>

<script>
import ListBase from './ListBase.vue';

export default {
  components: {
    ListBase,
  },
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    showDetail(hash) {
      this.$router.push({
        name: 'Detail',
        query: {
          ...this.$route.query,
          type: 'images',
        },
        hash: `#${hash}`,
      });
    },
  },
};
</script>
