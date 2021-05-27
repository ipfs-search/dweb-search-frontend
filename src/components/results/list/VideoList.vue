<template>
  <ListBase>
    <template v-slot:type>
      Video ({{ results.hits.length }})
    </template>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
      class="my-2 mb-4"
    >
      <v-card
        @click="videoDialog()"
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
              class="ma-3 mr-sm-0"
              cover
              aspect-ratio="1.778"
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
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
              <span class="green--text">Last seen 1 day ago</span><span> | Size 478mb</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums artists and albums whenever and
              wherever, online and online and offline.
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
      class="my-2 mb-4"
    >
      <v-card
        @click="videoDialog()"
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
              class="ma-3 mr-sm-0"
              cover
              aspect-ratio="1.778"
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
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
              <span class="orange--text">Last seen 1 week ago</span><span> | Size 478mb</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums artists and albums whenever and
              wherever, online and online and offline.
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      xl="8"
      offset-xl="2"
      class="my-2"
    >
      <v-card
        @click="videoDialog()"
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
              class="ma-3 mr-sm-0"
              cover
              aspect-ratio="1.778"
              src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
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
              <span class="red--text">Last seen 2 months ago</span><span> | Size 478mb</span>
            </v-card-subtitle>
            <v-card-title class="text-subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle class="text-body-2">
              Listen to your favorite artists and albums artists and albums whenever and
              wherever, online and online and offline.
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </ListBase>
</template>

<script>
import DialogDetailVideo from '@/components/DialogDetailVideo.vue';
import { showDialog } from '@/helpers/dialogHelper';
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
    videoDialog() {
      showDialog(DialogDetailVideo, {});
    },
  },
};
</script>
