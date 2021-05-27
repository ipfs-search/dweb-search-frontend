<template>
  <v-container>
    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-subheader class="text-subtitle-1 mt-n2 mb-n3 d-flex justify-space-between">
          <div>
            Directories (230)
          </div>
          <div>
            <a
              href=""
              class="text-subtitle-1 text-decoration-none text--secondary"
            >
              View all
            </a>
          </div>
        </v-subheader>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col
        cols="12"
        xl="8"
        offset-xl="2"
      >
        <v-card
          @click="genericDialog()"
        >
          <v-card-subtitle class="text-caption mb-n7 text-truncate">
            <span class="green--text">Last seen 1 day ago</span>
            <span> | Size 478mb</span><span> | 128 files</span>
          </v-card-subtitle>
          <v-card-title class="text-subtitle-1">
            Beatles samples and works
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
          @click="genericDialog()"
        >
          <v-card-subtitle class="text-caption mb-n7 text-truncate">
            <span class="orange--text">Last seen 1 week ago</span>
            <span> | Size 478mb</span><span> | 528 files</span>
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
          @click="genericDialog()"
        >
          <v-card-subtitle class="text-caption mb-n7 text-truncate">
            <span class="red--text">Last seen 2 months ago</span>
            <span> | Size 478mb</span> <span> | 64 files</span>
          </v-card-subtitle>
          <v-card-title class="text-subtitle-1">
            Beatles All - Files
          </v-card-title>
          <v-card-subtitle class="text-body-2">
            Listen to your favorite artists and albums whenever and wherever, online and offline.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
};
</script>
