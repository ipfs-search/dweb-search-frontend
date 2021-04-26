<template>
  <ListBase>
    <template v-slot:type>
      Documents ({{ results.results.hits.length }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-card
        @click="goToDetailPage()"
      >
        <v-card-subtitle class="text-caption mb-n7 text-truncate">
          <span class="green--text">Last seen 1 day ago</span>
          <span> | Size 478mb</span><span> | Mimetype text/html</span>
        </v-card-subtitle>
        <v-card-title class="text-subtitle-1">
          Unlimited music now
        </v-card-title>
        <v-card-subtitle class="text-body-2">
          Listen to your favorite artists and albums whenever and wherever, online and offline
          albums whenever and wherever, online and offline.
        </v-card-subtitle>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-card
        @click="goToDetailPage()"
      >
        <v-card-subtitle class="text-caption mb-n7 text-truncate">
          <span class="orange--text">Last seen 1 week ago</span>
          <span> | Size 478mb</span><span> | Mimetype audio/mpeg</span>
        </v-card-subtitle>
        <v-card-title class="text-subtitle-1">
          Unlimited music now
        </v-card-title>
        <v-card-subtitle class="text-body-2">
          Listen to your favorite artists and albums whenever and wherever, online and offline.
        </v-card-subtitle>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
    >
      <v-card
        @click="goToDetailPage()"
      >
        <v-card-subtitle class="text-caption mb-n7 text-truncate">
          <span class="red--text">Last seen 2 months ago</span>
          <span> | Size 478mb</span> <span> | Mimetype application/msword</span>
        </v-card-subtitle>
        <v-card-title class="text-subtitle-1">
          Unlimited music now
        </v-card-title>
        <v-card-subtitle class="text-body-2">
          Listen to your favorite artists and albums whenever and wherever, online and offline.
        </v-card-subtitle>
      </v-card>
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
  methods: {
    goToDetailPage() {
      this.$router.push({ path: '/search/detail' });
    },
  },
};
</script>
