<template>
  <div class="result">

    <!-- App bar with nested container, row and col component
      for layout logo and search bar using flex-->
    <v-app-bar
      app
      color="primary"
      height="56"
      light
    >
      <v-container
        fluid
        class="px-0 align-start"
      >
        <v-row>
          <v-col
            cols="12"
            class="px-0 d-flex justify-space-between align-center"
          >
            <div
              class="ml-2 d-none d-lg-block"
              style="min-width: 200px"
            >
              <div
                class="d-flex align-center"
                @click="goHome"
                style="cursor: pointer;"
              >
                <v-img
                  alt="DWEB Search Logo"
                  class="pl-1 mr-2"
                  contain
                  src="../assets/logo_white.svg"
                  width="32"
                  height="32"
                />
                <h2 dark class="white--text">DWEB <span>SEARCH</span></h2>
              </div>
            </div>
            <div class="flex-grow-1">
              <searchbar class="pt-1" />
            </div>
            <div
              class="d-none d-lg-block"
              style="min-width: 200px"
            >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>


    <!-- container with nested row and col components to layout filters
      Filters are made with menu components that is triggered
      via a click 'on'. The menu it self consists of list components
      containing list-items which contains a list-item-title
    -->
    <v-container
    >
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2" align="end" class="text--secondary body-2">
          <span class="hidden-sm-and-down">Filter: </span>

          <span>
            <v-menu>
              <template v-slot:activator="{ on }">
                <span class="pt-2" v-on="on">
                  Size {{ sizeFilter }}<v-icon>mdi-menu-down</v-icon>
                </span>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in sizeItems"
                  :key="index"
                  @click="setSizeFilter(index)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>

          <span>
            <v-menu>
              <template v-slot:activator="{ on }">
                <span class="pt-2" v-on="on">
                  Last seen {{ lastSeenFilter }}
                  <v-icon>
                    mdi-menu-down
                  </v-icon>
                </span>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in lastSeenItems"
                  :key="index"
                  @click="setLastSeenFilter(index)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </span>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row dense>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-subheader class="mt-n2 mb-n4">
            Texts (230) - view all
          </v-subheader>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-card
            @click="genericDialog()"
          >
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="green--text">Last seen 1 day ago</span><span> | Size 478mb</span><span> | Mimetype text/html</span>
            </v-card-subtitle>
            <v-card-title class="subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline albums whenever and wherever, online and offline.</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-card>
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="orange--text">Last seen 1 week ago</span><span> | Size 478mb</span><span> | Mimetype audio/mpeg</span>
            </v-card-subtitle>
            <v-card-title class="subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle>
              Listen to your favorite artists and albums whenever and wherever, online and offline.
            </v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-card>
            <v-card-subtitle class="text-caption mb-n7 text-truncate">
              <span class="red--text">Last seen 2 months ago</span><span> | Size 478mb</span> <span> | Mimetype application/msword</span>
            </v-card-subtitle>
            <v-card-title class="subtitle-1">
              Unlimited music now
            </v-card-title>
            <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" xl="8" offset-xl="2">
          <v-subheader class="mt-n2 mb-n4" />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <template>
        <div class="mt-4">
          <v-pagination
            v-model="page"
          />
        </div>
      </template>
    </v-container>

  </div>
</template>


<script>
const IpfsSearchApi = require('ipfs-search-client');
// import IpfsSearchApi from 'ipfs-search-client';
import Searchbar from '@/components/Searchbar.vue'
import DialogDetailText from '@/components/DialogDetailText.vue'
import { showDialog } from '@/helpers/dialogHelper.js';

export default {
  components: {
    Searchbar,
  },

  data: () => ({
    page: 1,
    sizeFilter: '0-10mb',
    lastSeenFilter: '<3hr',

    sizeItems: [
      { title: '0-10mb' },
      { title: '10-100mb' },
      { title: '100mb-1gb' },
      { title: '1gb+' }
    ],

    lastSeenItems: [
      { title: '<3hr' },
      { title: '<24hr' },
      { title: '<7d' }
    ]
  }),

  methods: {
    setSizeFilter (index) {
      this.sizeFilter = this.sizeItems[index].title
    },

    setLastSeenFilter (index) {
      this.lastSeenFilter = this.lastSeenItems[index].title
    },

    goHome() {
      this.$router.push({ path: '/' });
    },

    genericDialog() {
      showDialog(DialogDetailText, {});
    },

    getDataFromApi() {
      const api = new IpfsSearchApi.DefaultApi();
      const q = this.$route.query.query;

      const opts = {
        type: 'any', // {{Type}} Resource type. Omit to return all types.
        page: 0, // {{Integer}} Page number.
      };
      // eslint-disable-next-line no-unused-vars
      api.searchGet(q, opts).then((data) => {
        if (data) {
          console.log('Yeeeh!', data);
        }
      });
    }

  },

  mounted() {
    console.log('TEST QUERY', this.$route.query.query);
    if (this.$route.query.query) {
      this.getDataFromApi();
    }
  }
}
</script>

<style lang="scss" scoped>

  h2 {
    font-size: 120%;
    letter-spacing: 0.09em;
    font-weight: 500;
    span {
      font-weight: 500;
    }
  }

  .searchbar {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
  }

</style>